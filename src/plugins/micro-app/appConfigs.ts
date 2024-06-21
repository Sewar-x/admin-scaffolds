/**
 * 所有子应用配置项,导出对象为：
 *   {
 *    子应用名称： 子应用选项
 *   }
 */
import ProjectSetting from '@/settings/projectSetting'
export const subAppConfigs = {}

export const mainAppConfigs = {
  name: ProjectSetting.projectName,
  'disable-sandbox': false,
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
