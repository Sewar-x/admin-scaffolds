// 引入windi css
import '@/plugins/unocss'
// 引入全局样式
import '@/styles/index.less'

import {
    initVue,
    initStore,
    initRoute,
    initElementPlus,
    initDefineComponent
} from "@/init"


async function bootstrap() {

    const app = await initVue();
    await initStore(app);
    // await initI18n(app);
    await initRoute(app);
    await initElementPlus(app);
    // 加载自定义组件
    await initDefineComponent(app);
    app.mount("#app");
}

bootstrap();