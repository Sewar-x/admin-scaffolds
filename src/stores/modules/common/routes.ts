
import { defineStore } from "pinia";
import { store } from "@/stores";
import type { RouteItem } from 'vue-router';


interface routesState {
  routes: Array<RouteItem>;
  addRoutes: Array<RouteItem>;
  adminRoutes: Array<RouteItem>;
  showRouters: Array<RouteItem> | Object;
}

export const useRoutesStore = defineStore({
  id: "routes-store",

  state: (): routesState => ({
    permissionInst: {}, // 路由权限对象
  }),

  getters: {
    // 所有路由
    getRoutes(): Array<RouteItem> {
      console.log('===permissionInst===',this.permissionInst)
      return  this.permissionInst? this.permissionInst?.getRoutes() : null
    },
    // 异步路由
    getAddRoutes(): Array<RouteItem> {
      return this.permissionInst?.getAddRoutes()|| null
    },
    // 获取后台管理路由
    getAdminRoutes(): Array<RouteItem | null> {
      return this.permissionInst?.getAsyncRoutes()|| null
    },
    // 二级菜单展示路由
    getSideRouters(): RouteItem | Object {
      return this.permissionInst?.getShowRouters() || null
    }
  },

  actions: {
    // 初始化路由权限对象
    initPermissionInst(inst: Object) {
      this.permissionInst = inst
    },
    // 设置侧边栏路由
    SetRoutes(routes: Array<T>) {
      this.permissionInst?.SetRoutes(routes)
    },
    // 设置侧边栏路由
    SetRoute(routes: Array<RouteItem>) {
      this.permissionInst?.SetRoute(routes)
    },
    // 清空路由数据
    ClearRoute() {
      this.permissionInst?.ClearRoute()
    },    // 生成异步路由
    GenerateRoutes(routesMenuNames: Array<RouteItem>) {
      this.permissionInst?.GenerateRoutes(routesMenuNames)
    },
    /**
     * 设置二级菜单显示的路由
     * @param {} param0
     * @param {*} routes 当前路由对象，包含路由名称 name 或则路由路径
     * @returns
     */
    SetShowRouters(routes: RouteItem) {
      this.permissionInst?.SetShowRouters(routes)
    }


  },
});

export function routesStoreWithOut() {
  return useRoutesStore(store);
}
