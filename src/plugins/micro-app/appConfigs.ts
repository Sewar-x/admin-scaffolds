/**
 * 所有子应用配置项,导出对象为：
 *   {
 *    子应用名称： 子应用选项
 *   }
 */
import ProjectSetting from '@/settings/projectSetting'
export const subAppConfigs: {
  [key: string]: any
} = {
  'vue-admin-app': {
    name: 'vue-app',
    url: 'http://localhost:4000/'
  }
}

// 主应用配置项
export const mainAppConfigs: {
  [key: string]: any
} = {
  name: ProjectSetting.projectName, //应用名称
  'disable-sandbox': false,
  iframe: true,
  lifeCycles: {
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
}
