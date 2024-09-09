import initMyMicroApp from 'v-micro-app-plugin'
import microAppSetting from './appConfigs'


export async function setupMicroApp(app: object, router?: any, store?: any) {
  await initMyMicroApp(app, microAppSetting, router, store);
}
