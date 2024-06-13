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
      class: "el-menu-vertical-demo",
      "default-active": "2-1",
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
    menu: [
      // el-menu-item
      {
        attr: {
          index: "1",
        }, // el-menu-item的属性对象
        event: {
          click: (inst) => {
            console.log("===您点击了===", inst);
          },
        }, // el-menu-item的事件对象
        icon: {
          name: Document, // 图标名
        },
        title: "导航一", // 菜单项文本内容
      },
  
      // el-sub-menu
      {
        attr: {
          index: "2",
        }, // el-menu-item的属性对象
        event: {
          click: (inst) => {
            console.log("===您点击了===", inst);
          },
        }, // el-menu-item的事件对象
        icon: {
          name: IconMenu, // 图标名
        },
        title: "导航二", // 菜单项文本内容
        subMenu: [
          // 2
          // el-menu-item
          {
            attr: {
              index: "2-1",
            },
            icon: {
              name: Location,
            },
            title: "导航 2-1 ",
          },
          // el-sub-menu
          {
            attr: {
              index: "2-2",
            },
            icon: {
              name: Setting,
            },
            title: "导航 2-2 ",
          },
        ], // 2
      }, // *
      // el-sub-menu
      {
        attr: {
          index: "3",
        }, // el-menu-item的属性对象
        event: {
          click: (inst) => {
            console.log("===您点击了===", inst);
          },
        }, // el-menu-item的事件对象
        icon: {
          name: Setting, // 图标名
        },
        title: "导航三", // 菜单项文本内容
        subMenu: [
          // 2
          // el-menu-item
          {
            attr: {
              index: "3-1",
            },
            icon: {
              name: Location,
            },
            title: "导航 3-1 ",
          },
          // el-sub-menu
          {
            attr: {
              index: "3-2",
            },
            icon: {
              name: Setting,
            },
            title: "导航 3-2 ",
            subMenu: [
              // 3
              // el-menu-item
              {
                attr: {
                  index: "3-2-1",
                },
                event: {},
                icon: {
                  name: Setting,
                },
                title: "导航 3-2-1 ",
              },
            ], // 3
          },
        ], // 2
      }, // *
    ],
  };


const useSideMenu = ({
  routeInst,
  routes,
  asyncRoutes,
  asyncSideRoutes,
  layoutMode
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
  const menus = (handler && handler(routes)) || []
  options.menu = menus
  options.event['select'] =  (name: string) => {
    routeInst.push({name})
  }
  console.log("🚀 ~ options:", options)
 
  return options
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