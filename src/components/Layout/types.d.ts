import type { Ref } from 'vue'
export interface LayoutType {
    layoutMode: 'top' | 'aside' | 'topAside' | 'none'
}

export interface useSideMenuType {
    type?: 'side' | 'top',
    routeInst: any,
    routes?: Array<any>,
    asyncRoutes?: Array<any>,
    asyncSideRoutes?: Array<any>,
    layoutMode?: String,
    defaultActive?: String,
    topMenuOptions?:Ref, 
    sideMenuOptions?: Ref
  }