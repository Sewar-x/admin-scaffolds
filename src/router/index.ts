import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import { basicRoutes, asyncRoutes } from "./routes/index";
import type { App } from "vue";

// 白名单应该包含基本静态路由
export const WHITE_NAME_LIST: string[] = [];
//获取常量路由白名单
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });
getRouteNames(basicRoutes);

// app router
// 创建一个可以被 Vue 应用程序使用的路由实例
export const router = createRouter({
  // 创建一个 hash 历史记录。
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  // 应该添加到路由的初始路由列表。
  routes: [...asyncRoutes, ...basicRoutes] as unknown as RouteRecordRaw[],
  // 是否应该禁止尾部斜杠。默认为假
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

// config router
// 配置路由器
export function setupRouter(app: App<Element>) {
  app.use(router);
}

