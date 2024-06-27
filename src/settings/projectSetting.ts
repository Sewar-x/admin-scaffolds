import type { ProjectConfig } from '#/config'
import microAppUtils from '@/plugins/micro-app/utils'

const { VITE_USE_ALL_ELEMENT_PLUS_STYLE, VITE_APP_TITLE } = import.meta.env
const setting: ProjectConfig = {
  // 项目名
  projectName: VITE_APP_TITLE,
  loadOnDemandEl: VITE_USE_ALL_ELEMENT_PLUS_STYLE != 'true',
  // element ui size
  elementSize: 'mini',
  layoutMode: microAppUtils.isBaseApp && microAppUtils.isMicroApp ? 'none' : 'topAside', //'top' | 'aside' | 'topAside' | 'none'
  defaultActive: 'authMenus', // 默认首页路由名称
  homePageName: 'authMenu1' // 首页路由名称
}

export default setting
