/**
 * 微前端相关函数
 */
import microApp from '@micro-zoe/micro-app'
import ProjectSetting from '@/settings/projectSetting'
/**
 * 判断应用是否在微前端环境中
 * @returns
 */
export function IsMicroApp(): boolean {
  if (import.meta?.env) {
    const { VITE_USE_MICRO_APP } = import.meta.env
    return VITE_USE_MICRO_APP === 'true'
  } else {
    return window.__MICRO_APP_ENVIRONMENT__ || false
  }
}

/**
 * 判断应用是否是主应用
 * @returns
 */
export function IsBaseApp(): boolean {
  if (!IsMicroApp()) {
    return true
  }
  return (
    import.meta?.env.VITE_BASE_MICRO_APP ||
    (window && window.__MICRO_APP_BASE_APPLICATION__) ||
    true
  )
}

/**
 * 应用名称
 * @returns
 */
export function MicroAppName(name?: string): string {
  const isMicroApp = IsMicroApp()
  if (isMicroApp && window?.__MICRO_APP_NAME__) {
    return window.__MICRO_APP_NAME__
  }
  return name ? `${ProjectSetting.projectName}-${name}` : ProjectSetting.projectName
}

/**
 * 子应用的基础路由
 * @returns
 */
export function MicroAppBaseRoute(): boolean {
  if (IsMicroApp()) {
    return window.__MICRO_APP_BASE_ROUTE__
  }
  return import.meta?.env ? import.meta.env.VITE_BASE_PATH : '/'
}

/**
 * 子应用的基础路由
 * @returns
 */
export function MicroAppPublicPath(): boolean {
  if (IsMicroApp()) {
    return window.__MICRO_APP_PUBLIC_PATH__
  }
  return import.meta?.env ? import.meta.env.VITE_BASE_PATH : '/'
}

/**
 *
 * @returns
 */
export function getMicroApp(): object {
  const isBaseApp = IsBaseApp()
  // 基座应用返回 microApp 实例， 子应用中返回 window.microApp
  return isBaseApp ? microApp : window && window.microApp ? window.microApp : microApp
}

export default {
  isMicroApp: IsMicroApp(),
  isBaseApp: IsBaseApp(),
  microAppBaseRoute: MicroAppBaseRoute(),
  microAppPublicPath: MicroAppPublicPath(),
  getMicroAppName: MicroAppName,
  getMicroApp: getMicroApp
}
