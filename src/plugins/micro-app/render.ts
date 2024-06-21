import microApp from '@micro-zoe/micro-app'
import { isEmpty } from '@/utils/is'
import { subAppConfigs } from './appConfigs'
/**
 * 渲染所有子应用
 */
export function renderAllSubApp() {
  if (isEmpty(subAppConfigs)) {
    return Error('未配置子应用')
  }
  for (let appName in subAppConfigs) {
    microApp.renderApp(subAppConfigs[appName]).then((result) => {
      if (result) {
        console.log(`${appName} 渲染成功`)
      } else {
        console.log(`${appName} 渲染失败`)
      }
    })
  }
}
