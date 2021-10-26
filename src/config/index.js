/**
 * 环境配置封装
 */

const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
  dev: {
    baseApi: '/',
    mockApi: 'https://www.fastmock.site/mock/9496d91c0cdc682b59c51ac1399cd655/api'
  },
  test: {
    baseApi: '//test.future.com/api',
    mockApi: 'https://www.fastmock.site/mock/9496d91c0cdc682b59c51ac1399cd655/api'
  },
  prod: {
    baseApi: '//future.com/api',
    mockApi: 'https://www.fastmock.site/mock/9496d91c0cdc682b59c51ac1399cd655/api'
  },
}


export default {
  env,
  mock: true,
  ...EnvConfig[env],
  namespace: 'manage'
}