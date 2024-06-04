export { };

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    orderNo?: number;
    // title
    title: string;
    // dynamic router level.
    dynamicLevel?: number;
    // dynamic router real route path (For performance).
    realPath?: string;
    // Whether to ignore permissions
    ignoreAuth?: boolean;
    // role info
    roles?: Array;
    // Whether not to cache
    ignoreKeepAlive?: boolean;
    // Is it fixed on tab
    affix?: boolean;
    // icon on tab
    icon?: string;
    frameSrc?: string;
    // current page transition
    transitionName?: string;
    // Whether the route has been dynamically added
    hideBreadcrumb?: boolean;
    // Hide submenu
    hideChildrenInMenu?: boolean;
    // Carrying parameters
    carryParam?: boolean;
    // Used internally to mark single-level menus
    single?: boolean;
    // Currently active menu
    currentActiveMenu?: string;
    // Never show in tab
    hideTab?: boolean;
    // Never show in menu
    hideMenu?: boolean;
    isLink?: boolean;
    // only build for Menu
    ignoreRoute?: boolean;
    // Hide path for children
    hidePathForChildren?: boolean;
  }

  interface RouteItem extends RouteRecordRaw {
    path: string;
    component: any;
    meta: RouteMeta;
    name?: string;
    alias?: string | string[];
    redirect?: string;
    caseSensitive?: boolean;
    children?: RouteItem[];
    order?: number;//路由排序
    asyncRoute?: Boolean; // 表示异步加载路由, 由后端控制权限
  }
}
