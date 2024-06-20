/**
 * 微前端相关函数
 */

/**
 * 判断应用是否在微前端环境中
 * @returns
 */
export function isMicroApp(): boolean {
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
export function isBaseApp(): boolean {
  if (!isMicroApp()) {
    return true
  }
  if (import.meta?.env) {
    const { VITE_MICRO_IS_BASE_APP } = import.meta.env
    return VITE_MICRO_IS_BASE_APP === 'true'
  } else {
    return window.__MICRO_APP_BASE_APPLICATION__ || true
  }
}

/**
 * 应用名称
 * @returns
 */
export function microAppName(): string {
  if (isMicroApp()) {
    return window.__MICRO_APP_NAME__
  }
  return import.meta?.env ? import.meta.env.VITE_APP_TITLE : 'MainApp'
}

/**
 * 子应用的基础路由
 * @returns
 */
export function microAppBaseRoute(): boolean {
  if (isMicroApp()) {
    return window.__MICRO_APP_BASE_ROUTE__
  }
  return import.meta?.env ? import.meta.env.VITE_BASE_PATH : '/'
}

/**
 * 子应用的基础路由
 * @returns
 */
export function microAppPublicPath(): boolean {
  if (isMicroApp()) {
    return window.__MICRO_APP_PUBLIC_PATH__
  }
  return import.meta?.env ? import.meta.env.VITE_BASE_PATH : '/'
}

/**
 * 默认生命周期
 */
export const defalutLifeCycles = {
  created(e, appName) {
    console.log(`子应用${appName}被创建`)
  },
  beforemount(e, appName) {
    console.log(`子应用${appName}即将渲染`)
  },
  mounted(e, appName) {
    console.log(`子应用${appName}已经渲染完成`)
  },
  unmount(e, appName) {
    console.log(`子应用${appName}已经卸载`)
  },
  error(e, appName) {
    console.log(`子应用${appName}加载出错`)
  }
}
