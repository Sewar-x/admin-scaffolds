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
