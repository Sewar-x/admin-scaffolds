export default {
  tokenKey: 'test-token', // token key值，传入token key值，默认使用内部获取方法
  tokenExpires: 1, // token 过期时间
  storageType: 'cookie', // 存储token 方法
  urlPrefix: 'api',
  refreshTokenConfig: { // token 自动刷新配置
    url: '/refresh-token', // 刷新 token url
    interval: 20 * 60 * 1000, // token 刷新时间间隔为 20 分钟
    tokenExpiresKey: 'test-tokenExpires', // token 过期时间存储 key
    // refreshIdKey: 'test-refreshIdKey', // 存储 refreshId 刷新 token id 的 key, 选填，不传入则不会向刷新token 接口中传入 refreshId 参数
    // expires: null, // 登录请求接口中，token 过期时间为空
    // refreshId: null, // 登录请求接口中，refreshId 刷新 token id 为空

  },
}

