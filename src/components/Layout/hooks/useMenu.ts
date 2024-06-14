import { ref, watch } from 'vue'
import type { useSideMenuType } from '../types.d.ts'
import { deepClone } from "@/utils/index"

import {
    Document,
    Expand,
    Fold,
  } from "@element-plus/icons-vue";
  
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
  routeInst,
  routes,
  asyncRoutes,
  asyncSideRoutes,
  layoutMode,
  defaultActive,
  topMenuOptions,
  sideMenuOptions
}:useSideMenuType) => {
  const hanleMap = {
    'top': handleTopOrSideMenuConfig,
    'aside': handleTopOrSideMenuConfig,
    'topAside': handleAsideTopMenuConfig
  }
  const handler =  hanleMap[layoutMode as string]
  if(handler) {
    handler({
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
  routeInst,
  routes,
  layoutMode,
  defaultActive,
  topMenuOptions,
  sideMenuOptions
}:useSideMenuType) {
 generateTopMenuConfig({
    routeInst,
    routes,
    layoutMode,
    defaultActive,
    topMenuOptions,
    sideMenuOptions
  })

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
  const options = deepClone(menuConfig)
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
  options.event['select'] =  (name: string) => {
    generateAsideMenuConfig({
      routeInst,
      routes,
      activeMenu: name,
      topMenuOptions,
      sideMenuOptions
    })
  }
  setDefaultActive(routeInst,defaultActive as string,options)
  topMenuOptions.value = options
  console.log("🚀 ~ 生成顶部菜单配置====", topMenuOptions.value)
}

/**
 * topAside 生成侧边菜单栏配置
 * @param param0 
 * @returns 
 */
function generateAsideMenuConfig({
  routeInst,
  routes,
  activeMenu,
  topMenuOptions,
  sideMenuOptions
}:useSideMenuType){
  const options = deepClone(menuConfig)
  console.log('===activeMenu====',activeMenu)
  if(!activeMenu) {
    sideMenuOptions.value = options
    return 
  }

    // 过滤获取展示路由
  const showMenus = routes.filter(route => !route.hidden && route.name === activeMenu)
  const asideMenus = handleAsideMenu(showMenus[0].children,options)
  options['menu'] = asideMenus
  options.event['select'] =  (name: string) => {
    routeInst.push({name})
  }
  sideMenuOptions.value = options
  console.log("🚀 ~ 生成侧边菜单配置====", sideMenuOptions.value)
}


export { useMenu }