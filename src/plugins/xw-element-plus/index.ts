import { XElementPlusInstall } from 'xw-ui/element-plus'
import 'xw-ui/element-plus/dist/style.css'
import type { App } from 'vue'

export async function setuploadXWElementPlus(app: App) {
  return XElementPlusInstall(app)
}
