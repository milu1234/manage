/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || 'prod';
const EnvConfig = {
    dev: {
        baseApi: '/api',
        mockApi:'https://fastmock.site/mock/9451cbb1bbb71b0afff4a7ebf82c7e71/api'
    },
    test: {
        baseApi: '//test.futurefe.com/api',
        mockApi:'https://fastmock.site/mock/9451cbb1bbb71b0afff4a7ebf82c7e71/api'
    },
    prod: {
        baseApi: '//futurefe.com/api',
        mockApi:'https://fastmock.site/mock/9451cbb1bbb71b0afff4a7ebf82c7e71/api'
    }
}
export default {
    env,
    // mock: true,
    namespace: 'manager',
    ...EnvConfig[env]
}