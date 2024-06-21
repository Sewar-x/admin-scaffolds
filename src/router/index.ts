import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import asyncRoutes from '@/router/asyncRoutes'
import basicRoutes from '@/router/basicRoutes'
import whiteList from '@/router/basicRoutes/whiteList'
import type { App } from 'vue'

// app router
// 创建一个可以被 Vue 应用程序使用的路由实例
export const history = createWebHashHistory(import.meta.env.VITE_BASE_PATH)
export const router = createRouter({
  // 创建一个 hash 历史记录。
  history,
  // 应该添加到路由的初始路由列表。
  routes: [...asyncRoutes, ...basicRoutes] as unknown as RouteRecordRaw[],
  // 是否应该禁止尾部斜杠。默认为 false
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// 重置路由
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !whiteList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

// config router
// 配置路由器
export function setupRouter(app: App<Element>) {
  app.use(router)
  return router
}
