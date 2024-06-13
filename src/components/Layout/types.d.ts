export interface LayoutType {
    layoutMode: 'top' | 'aside' | 'topAside' | 'none'
}

export interface useSideMenuType {
    routeInst: any,
    routes?: Array<any>,
    asyncRoutes?: Array<any>,
    asyncSideRoutes?: Array<any>,
    layoutMode: String,
    defaultActive: String,
  }