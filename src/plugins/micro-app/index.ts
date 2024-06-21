import type { App } from 'vue'
import microApp from '@micro-zoe/micro-app'
import microAppUtils from './utils'
import { initVueRouter } from '@/plugins/micro-app/router'
import { mainAppConfigs } from './appConfigs'

const { getMicroApp, isBaseApp } = microAppUtils

export async function setupMicroApp(app: App, router: any) {
  // 注册主应用路由,
  // docs:https://micro-zoe.github.io/micro-app/docs.html#/zh-cn/router?id=%e5%ad%90%e5%ba%94%e7%94%a8%e6%8e%a7%e5%88%b6%e4%b8%bb%e5%ba%94%e7%94%a8%e8%b7%b3%e8%bd%ac
  isBaseApp && microApp.router.setBaseAppRouter(router)
  microApp.start(mainAppConfigs)
  initVueRouter(router)
  const microAppInst = getMicroApp()
  console.log('=====microApp初始化完成=======', microAppInst)
  console.log('==当前应用为：', isBaseApp ? '主应用' : '子应用')
  return microAppInst
}
