import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './../components/Home.vue'
import storage from './../utils/storage'
import API from './../api'
import util from './../utils/utils'
const routes = [
    {
        name: 'home',
        path: '/',
        meta: {
            title: '首页'
        },
        component: Home,
        redirect: '/welcome',
        children: [
            {
                name: 'welcome',
                path: '/welcome',
                meta: {
                    title: '欢迎页'
                },
                component: () => import('./../views/Welcome.vue')
            },
            // {
            //     name: '用户管理',
            //     path: '/system/user',
            //     meta: {
            //         title: '用户管理'
            //     },
            //     component: () => import('./../views/User.vue')
            // },
            // {
            //     name: '菜单管理',
            //     path: '/system/menu',
            //     meta: {
            //         title: '菜单管理'
            //     },
            //     component: () => import('./../views/Menu.vue')
            // },
            // {
            //     name: '角色管理',
            //     path: '/system/role',
            //     meta: {
            //         title: '角色管理'
            //     },
            //     component: () => import('./../views/Role.vue')
            // },
            // {
            //     name: '部门管理',
            //     path: '/system/dept',
            //     meta: {
            //         title: '部门管理'
            //     },
            //     component: () => import('./../views/Dept.vue')
            // },

        ]
    },

    {
        name: 'login',
        path: '/login',
        meta: {
            title: '登录'
        },
        component: () => import('./../views/Login.vue')
    },
    {
        name: '404页面',
        path: '/404',
        meta: {
            title: '404'
        },
        component: () => import('./../views/404.vue')
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

async function loadAsyncRoutes() {
    let userInfo = storage.getItem('userInfo') || {}
    if (userInfo.token) {
        try {
            const { menuList } = await API.permissionList()

            let routes = util.generateRoute(menuList)
            console.log(routes);
            routes.map(route => {
                let url = `./../views/${route.component}.vue`
                console.log(url);
                route.component = () => import(url)
                router.addRoute('home', route)
            })
        } catch (error) {

        }
    }

}
await loadAsyncRoutes()

function generateRoute(menuList) {
    let routes = []
    const deepList = (list) => {
        while (list.length) {
            let item = list.pop()
            if (item.action) {
                routes.push({
                    name: item.component,
                    path: item.path,
                    meta: {
                        title: item.menuName
                    },
                    component: item.component
                })
            }
            if (item.children && !item.action) {
                deepList(item.children)
            }
        }
    }
    deepList(menuList)
    return routes
}
function checkPermission(path) {
    let hasPermission = router.getRoutes().filter(route => route.path == path).length
    if (hasPermission) {
        return true
    } else {
        return false
    }
}

router.beforeEach((to, from, next) => {
    if (checkPermission(to.path)) {
        document.title = to.meta.title
        next()
    } else {
        next('/404')
    }
})
export default router