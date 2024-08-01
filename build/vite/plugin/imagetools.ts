// docs:https://www.npmjs.com/package/vite-imagetools/v/3.0.0-next.4?activeTab=readme
import { imagetools } from 'vite-imagetools'

export function configImagetoolsPlugin() {
  const plugin = imagetools()
  return plugin
}
