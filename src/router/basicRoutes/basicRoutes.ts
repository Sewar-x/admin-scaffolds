/**
 * 无需权限同步加载的公共路由
 */

import type { AppRouteRecordRaw } from "@/router/types";
import { PageEnum } from "@/enums/pageEnum";
// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageEnum.BASE_LOGIN,
  meta: {
    title: "首页",
  },
};

//登录页面
export const LoginRoute: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("@/views/login/index.vue"),
  meta: {
    title: "登录",
  },
};

export default [
  RootRoute,
  LoginRoute
]