import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import' // element plus 按需引入
export function configElementPlugin() {
  return createStyleImportPlugin({
    resolves: [ElementPlusResolve()],
    libs: [
      {
        libraryName: 'element-plus',
        esModule: true,
        resolveStyle: (name) => {
          if (name === 'click-outside') {
            return ''
          }
          return `element-plus/es/components/${name.replace(/^el-/, '')}/style/css`
        }
      }
    ]
  })
}
