import type { App } from 'vue'

/**
 * 按需导入 element-plus 组件
 * @param app {App}
 */
import { ElIcon, ElButton, ElInput, ElCheckbox } from 'element-plus'

/**
 * 按需导入 element-plus 图标
 * @param app {App}
 */
import { Edit, Tools, Location, Setting } from '@element-plus/icons-vue'

export default function loadOnDemandEl(app: App) {
  // 为了开发环境启动更快，一次性引入所有样式
  if (import.meta.env.VITE_USE_ALL_ELEMENT_PLUS_STYLE === 'true') {
    import('@/styles/element-plus/index.less')
  }
  ;[ElButton, ElIcon, ElInput, ElCheckbox].forEach((v) => {
    app.use(v)
  })
  ;[Edit, Tools, Location, Setting].forEach((v) => {
    app.component(v.name, v)
  })
  return { ElIcon, ElButton, ElInput, ElCheckbox }
}
