// 引入全局样式
import '@/styles/index.less'

import {
  initVue,
  initStore,
  initRoute,
  initElementPlus,
  initXWElementPlus,
  initDefineComponent,
  initI18n,
  initMicroApp,
  initXWPermission,
  initUnocss
} from '@/plugins/init'

const {
  VITE_MULTIPLE_LANGUAGES,
  VITE_USE_MICRO_APP,
  VITE_USE_XW_UI_ELEMENT_PLUS,
  VITE_USE_XW_UI_PERMISSION,
  VITE_USE_UNOCSS
} = import.meta.env

let router = null
let store = null
let microApp = null
async function bootstrap() {
  const app = await initVue()
  // 初始化 elementPlus
  await initElementPlus(app)
  // 初始化 store
  store = await initStore(app)
  // 使用 unocss
  if (VITE_USE_UNOCSS === 'true') {
    await initUnocss(app)
  }
  // 使用国际化 i18n
  if (VITE_MULTIPLE_LANGUAGES === 'true') {
    await initI18n(app)
  }
  // 使用 Route
  router = await initRoute(app)
  // 使用 微前端框架 micro-app
  if (VITE_USE_MICRO_APP === 'true') {
    microApp = await initMicroApp(app, router)
  }
  // 使用 路由权限控制
  if (VITE_USE_XW_UI_PERMISSION === 'true') {
    await initXWPermission(app)
  }
  // 加载自定义组件
  await initDefineComponent(app)
  // 引入 XW-UI Element Plus
  if (VITE_USE_XW_UI_ELEMENT_PLUS === 'true') {
    await initXWElementPlus(app)
  }
  // 挂载组件
  app.mount('#app')
}

bootstrap()
