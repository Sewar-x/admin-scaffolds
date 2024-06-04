import type { AppRouteModule } from "@/router/types";
import { RootRoute } from "./common";

// import.meta.globEager() 直接引入所有的模块 Vite 独有的功能
const modules = import.meta.globEager("./modules/**/index.ts") as any;
const routeModuleList: Array<AppRouteModule> = []

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const name = mod.name as string
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList[name as string] = modList[0]
});
//异步路由：通过后端接口遍历生成
export const asyncRoutes = [routeModuleList];

// Basic routing without permission
// 无需权限的基本路由
export const basicRoutes = [RootRoute, routeModuleList];
