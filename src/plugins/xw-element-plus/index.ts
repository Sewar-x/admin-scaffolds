import { XElementPlusInstall } from 'sewen-ui/element-plus'
import 'sewen-ui/element-plus/dist/style.css'
import type { App } from 'vue'

export async function setuploadXWElementPlus(app: App) {
  return XElementPlusInstall(app)
}
