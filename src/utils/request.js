import axios from 'axios'
import config from '../config'
import { ElMessage } from 'element-plus'
import router from '../router'
const TOKEN_ERROR = 'Token认证失败,请重新登录'
const NETWORK_ERROR = '网路请求异常,请稍后重试'
// 创建axios实例对象 添加全局配置
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000
})

// 请求的拦截
service.interceptors.request.use((req) => {
  // 下面是jwt的token的验证的header 暂且写在这里
  const headers = req.headers
  if (!headers.Authorization) headers.Authorization = 'Jason'

  return req
})

service.interceptors.response.use((res) => {
  // 后台返回数据的格式
  const { code, data, msg } = res.data
  if (code === 200) {
    return data
  } else if (code === 40001) {
    ElMessage.error(TOKEN_ERROR)
    setTimeout(() => {
      router.push('/login')
    }, 1500)
    return Promise.reject(TOKEN_ERROR)
  } else {
    ElMessage.error(msg || NETWORK_ERROR)
    return Promise.reject(msg || NETWORK_ERROR)
  }
})
/**
 * 请求的核心函数
 * @param {*} options  请求配置
 * @returns 
 */

function request (options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    // 后面组件中在调用接口的时候 传过来的都在对象的data属性中 
    options.params = options.data
  }
  // 这一点很重要 如果是线上环境这里的baseApi 一定不能出错 不然一上线就是 p0级bug
  if (config.env === 'prod') {
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
  }
  return service(options)
}

['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
  request[item] = (url, data, options) => {
    return request({
      url,
      data,
      method: item,
      ...options
    })
  }
})

export default request