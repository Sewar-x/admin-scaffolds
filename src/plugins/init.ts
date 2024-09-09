import type { App } from 'vue'

// 初始化 Vue 实例
export const initVue = async (): Promise<App> => {
  const App = await import('@/App.vue')
  return await import('vue').then(async (Vue: any) => {
    // 配置
    return await Vue.createApp(App.default)
  })
}

// 初始化路由
export const initRoute = async (app: App) => {
  // Configure routing
  return await import('@/router').then(async (routerModule: any) => {
    // 配置路由
    return await routerModule.setupRouter(app)
  })
}

// 初始化 i18n
export const initI18n = async (app: App) => {
  return await import('@/plugins/locales/setupI18n').then(async (i18nModule: any) => {
    // 多语言配置
    return await i18nModule.setupI18n(app)
  })
}

// 初始化 store
export const initStore = async (app: App) => {
  return await import('@/stores').then(async (storeModule: any) => {
    // 配置状态仓库
    return await storeModule.setupStore(app)
  })
}

// 初始化 element-plus
export const initElementPlus = async (app: App) => {
  return await import('@/plugins/element-plus/el-import').then(async (ElementPlusModule: any) => {
    // 按需加载Element-Plus组件及图标
    return await ElementPlusModule.setupElementPlus(app)
  })
}

// 初始化 json scheme 组件库 sewen-ui/element-plus
export const initXWElementPlus = async (app: App) => {
  return await import('@/plugins/xw-element-plus/index').then(async (XWUIModule: any) => {
    return await XWUIModule.setuploadXWElementPlus(app)
  })
}

// 初始化自定义组件
export const initDefineComponent = async (app: App) => {
  return await import('@/plugins/defineComponents').then(async (Component: any) => {
    // 按需加载自定义组件
    await Component.setupDefineComponent(app)
    return Component
  })
}

// 初始化微前端框架
export const initMicroApp = async (app: App, router?: any, store?: any) => {
  return await import('@/plugins/micro-app/index').then(async (microAppModule: any) => {
    return await microAppModule.setupMicroApp(app, router, store)
  })
}

// 使用路由权限控制
export const initXWPermission = async (app: App) => {
  return await import('@/plugins/xw-permission/index').then(async (permissionModule: any) => {
    return await permissionModule.setupXWPermission(app)
  })
}

// 使用路由权限控制
export const initUnocss = async (app: App) => {
  return await import('@/plugins/unocss/index')
}
