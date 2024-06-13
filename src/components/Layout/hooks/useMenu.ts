import { ref } from 'vue'
import type { useSideMenuType } from '../types.d.ts'


import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
    Expand,
    Fold,
  } from "@element-plus/icons-vue";
  
// from 表单配置项
const options = {
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


const useSideMenu = ({
  routeInst,
  routes,
  asyncRoutes,
  asyncSideRoutes,
  layoutMode,
  defaultActive
}:useSideMenuType) => {
  console.log('===routeInst===',routeInst)
  console.log('===routes===',routes)
  console.log('===asyncRoutes===',asyncRoutes)
  console.log('===asyncSideRoutes===',asyncSideRoutes)
  console.log('===asyncSideRoutes===',layoutMode)
  const hanleMap = {
    'top': handleTopMenu,
    'aside': handleAsideMenu,
    'topAside': handleAsideTopMenu
  }
  const handler =  hanleMap[layoutMode as string]

  options['menu'] = (handler && handler(routes)) || []
  options.event['select'] =  (name: string) => {
    routeInst.push({name})
  }
  setDefaultActive(routeInst,defaultActive as string)
  return options
}

/**
 * 设置默认激活菜单栏
 * @param routeInst 
 * @param route 
 */
function setDefaultActive(routeInst: any,route: string){
  options.attr["default-active"] = route
  routeInst.push({name:route})
}

/**
 * 生成仅侧边栏菜单
 */
function handleAsideMenu(routes: Array<any>){
  const showMenus=  routes.filter(route => !route.hidden )

  return showMenus.map(route => {
    return {
      attr: {
        index: route.name,
      }, // el-menu-item的属性对象
      icon: {
        name: Document, // 图标名
      },
      title: route.meta.title, // 菜单项文本内容
      subMenu: route.children? handleAsideMenu(route.children): []
    }
  })
}

/**
 * 生成仅包含顶部菜单
 */
function handleTopMenu(routes: Array<any>){
  options.attr['mode'] = 'horizontal'
  options.attr['popper-offset'] = 20
  delete options.collapse 
  const menus =  handleAsideMenu(routes)
  return menus
}


/**
 * 生成仅包含顶部菜单的二级侧边栏
 */
function handleAsideTopMenu(routes: Array<any>){
  return routes
}
export { useSideMenu }