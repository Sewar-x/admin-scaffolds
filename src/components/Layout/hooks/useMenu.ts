import { ref, type Ref} from 'vue'
import type { useSideMenuType } from '../types.d.ts'
import type { RouteItem } from 'vue-router';
import { deepClone } from "@/utils/index"
import { isEmpty } from "@/utils/is"
import {
    Document,
    Expand,
    Fold,
  } from "@element-plus/icons-vue";
  
class Menus {
  public topRoutes =  {}
  public sideRoutes = {}

  // 一级菜单展示路由
  getTopRouters(): RouteItem | Object {
    return this.topRoutes
  }
  // 二级菜单展示路由
  getSideRouters(): RouteItem | Object {
    return this.sideRoutes
  }
  /**
   * 设置一级菜单显示的路由
   * @param {} param0
   * @param {*} routes 当前路由对象，包含路由名称 name 或则路由路径
   * @returns
   */
  SetTopRouters(routes: RouteItem) {
    this.topRoutes = routes
  }
  /**
 * 设置二级菜单显示的路由
 * @param {} param0
 * @param {*} routes 当前路由对象，包含路由名称 name 或则路由路径
 * @returns
 */
  SetSideRouters(routes: RouteItem) {
    this.sideRoutes = routes
  }
}

const routeStore = new Menus()


// from 表单配置项
const menuConfig = {
    attr: {
      class: "layout-menu",
      "active-text-color": "#ffd04b",
      collapse: false,
    }, // el-menu的属性对象
  
    collapse: {
      type: "Icon",
      showIcon: Fold,
      colseIcon: Expand,
      size: 20,
      opendWidth: 200,
      closeWidth: 60,
    }, // 折叠按钮
    event: {}, // el-menu的事件对象
    ref: ref(), // el-menu组件的实例对象
  };



const useMenu = ({
  type,
  routeInst,
  routes,
  asyncRoutes,
  asyncSideRoutes,
  layoutMode,
  defaultActive,
 
}:useSideMenuType) => {
  let topMenuOptions: Ref = ref({})
  let sideMenuOptions: Ref = ref({})
  const hanleMap = {
    'top': handleTopOrSideMenuConfig,
    'aside': handleTopOrSideMenuConfig,
    'topAside': handleAsideTopMenuConfig
  }
  const handler =  hanleMap[layoutMode as string]
  if(handler) {
    handler({
      type,
      routeInst,
      routes,
      asyncRoutes,
      asyncSideRoutes,
      layoutMode,
      defaultActive,
      topMenuOptions,
      sideMenuOptions
    })
  }
  return {
    topMenuOptions,
    sideMenuOptions
  }
}

/**
 * 设置顶部或侧边菜单栏配置
 */
function handleTopOrSideMenuConfig({
  routeInst,
  routes,
  layoutMode,
  defaultActive,
  topMenuOptions,
  sideMenuOptions
}:useSideMenuType){
  const options = deepClone(menuConfig)
  const hanleMap = {
    'top': handleTopMenu,
    'aside': handleAsideMenu,
  }
  const handler =  hanleMap[layoutMode as string]
  options['menu'] = (handler && handler(routes,options)) || []
  options.event['select'] =  (name: string) => {
    routeInst.push({name})
  }
  setDefaultActive(routeInst,defaultActive as string,options)
  topMenuOptions.value = options
  sideMenuOptions.value = options
  return options
}


/**
 * 设置默认激活菜单栏
 * @param routeInst 
 * @param route 
 */
function setDefaultActive(routeInst: any,route: string, options: object){
  /* eslint-disable no-unused-vars */  
  options.attr["default-active"] = route
  routeInst.push({name:route})
}

/**
 * 生成仅侧边栏菜单
 */
function handleAsideMenu(routes: Array<any>, options: object){
  const showMenus=  routes.filter(route => !route.hidden ).sort((route1,route2)=> route1.order - route2.order)
  return showMenus.map(route => {
    return {
      attr: {
        index: route.name,
      }, // el-menu-item的属性对象
      icon: {
        name: Document, // 图标名
      },
      title: route.meta.title, // 菜单项文本内容
      subMenu: route.children? handleAsideMenu(route.children,options): []
    }
  })
}

/**
 * 生成仅包含顶部菜单
 */
function handleTopMenu(routes: Array<any>, options: object){
  /* eslint-disable no-unused-vars */  
  options.attr['mode'] = 'horizontal'
  options.attr['popper-offset'] = 20
  delete options.collapse 
  const menus =  handleAsideMenu(routes,options)
  return menus
}


/**
 * 设置顶部和侧边菜单栏配置
 */
function handleAsideTopMenuConfig({
  type,
  routeInst,
  routes,
  layoutMode,
  defaultActive,
  topMenuOptions,
  sideMenuOptions
}:useSideMenuType) {
  if(type === 'top') {
    generateTopMenuConfig({
      routeInst,
      routes,
      layoutMode,
      defaultActive,
      topMenuOptions,
      sideMenuOptions
    })
  }
  if(type === 'side') {
    generateAsideMenuConfig({
      type,
      routeInst,
      routes,
      layoutMode,
      defaultActive,
      topMenuOptions,
      sideMenuOptions
    })
  }
}

/**
 * topAside 生成顶部菜单栏配置
 * @param param0 
 * @returns 
 */
function generateTopMenuConfig({
  routeInst,
  routes,
  defaultActive,
  topMenuOptions,
  sideMenuOptions
}:useSideMenuType){
  const topMenus = routeStore.getTopRouters()
  if(!isEmpty(topMenus)){
    console.log("🚀 生成顶部栏函数，顶部菜单栏不是空，直接返回:")
    topMenuOptions.value  = topMenus
    return 
  }
  const options = deepClone(menuConfig)
  console.log("🚀 生成顶部栏函数 routes==:",routes)
    // 过滤获取展示路由
  const showMenus = routes.filter(route => !route.hidden ).sort((route1,route2)=> route1.order - route2.order)
  options['menu'] = showMenus.map(route => {
    return {
      attr: {
        index: route.name,
      }, // el-menu-item的属性对象
      icon: {
        name: Document, // 图标名
      },
      title: route.meta.title, // 菜单项文本内容
    }
  })
  options.attr['mode'] = 'horizontal'
  options.attr['popper-offset'] = 20
  delete options.collapse 
  options.event['select'] =  (name: string) => {
    generateAsideMenuConfig({
      routeInst,
      routes,
      defaultActive,
      topMenuOptions,
      sideMenuOptions
    })
  }
  setDefaultActive(routeInst,defaultActive as string,options)
  topMenuOptions.value = options
  routeStore.SetTopRouters(topMenuOptions.value)
  console.log("🚀 ~ 生成顶部菜单配置====",JSON.parse(JSON.stringify(topMenuOptions.value)))
}

/**
 * topAside 生成侧边菜单栏配置
 * @param param0 
 * @returns 
 */
function generateAsideMenuConfig({
  routeInst,
  routes,
  topMenuOptions,
  sideMenuOptions,
  layoutMode,
  defaultActive,
}:useSideMenuType){
  const topMenus = routeStore.getTopRouters()
  if(isEmpty(topMenus)){
    console.log("🚀 生成侧边栏函数，顶部菜单栏为空，生成顶部菜单:")

    generateTopMenuConfig({
      routeInst,
      routes,
      layoutMode,
      defaultActive,
      topMenuOptions,
      sideMenuOptions
    })
  }
  const options = deepClone(menuConfig)

  if(!defaultActive) {
    console.log('===生成侧边栏菜单 defaultActive 为空====',  defaultActive)
    sideMenuOptions.value = options
    return 
  }
    // 过滤获取展示路由
  const showMenus = routes.filter(route => !route.hidden && route.name === defaultActive)
  console.log('===生成侧边栏菜单 showMenus ====',showMenus)
  if(!showMenus || !showMenus[0]) return false
  const asideMenus = handleAsideMenu(showMenus[0].children,options)
  options['menu'] = asideMenus
  options.event['select'] =  (name: string) => {
    routeInst.push({name})
  }
  sideMenuOptions.value = deepClone(options)
  routeStore.SetSideRouters(sideMenuOptions.value)
  console.log("🚀 ~ 生成侧边菜单配置====", JSON.parse(JSON.stringify(sideMenuOptions.value)))
}


export { useMenu }