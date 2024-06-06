import type { App } from 'vue'
// 初始化 Vue 实例
export const initVue = async (): Promise<App> => {
    const App = await import("@/App.vue")
    return await import("vue").then(async (Vue: any) => {
        // 配置
        return await Vue.createApp(App.default);
    });
}

// 初始化路由
export const initRoute = async (app: App) => {

    // Configure routing
    return await import("@/router").then(async (router: any) => {
        // 配置路由
        router.setupRouter(app);
        return router
    });
}

// 初始化 i18n
export const initI18n = async (app: App) => {
    return await import("@/locales/setupI18n").then(async (i18n: any) => {
        // 多语言配置
        await i18n.setupI18n(app);
        return i18n
    });
}

// 初始化 store
export const initStore = async (app: App) => {
    return await import("@/stores").then(async (store: any) => {
        // 配置状态仓库
        await store.setupStore(app);
        return store
    });
}

// 初始化 element-plus
export const initElementPlus = async (app: App) => {
    return await import("@/plugins/element-plus/el-import").then(async (ElementPlus: any) => {

        // 按需加载Element-Plus组件及图标
        await ElementPlus.setupElementPlus(app);
        return ElementPlus
    });
}

// 初始化 json scheme 组件库 xw-ui/element-plus 
export const initXWElementPlus = async (app: App) => {
    return await import("@/plugins/xw-element-plus/index").then(async (XWUI: any) => {
        XWUI.setuploadXWElementPlus(app);
        return XWUI
    });
}

// 初始化自定义组件
export const initDefineComponent = async (app: App) => {
    return await import("@/plugins/defineComponents").then(async (Component: any) => {
        // 按需加载自定义组件
        await Component.setupDefineComponent(app);
        return Component
    });
}

// 初始化微前端框架
export const initMicroApp = async (app: App) => {
    console.log('app ==', app)
    return await import("@micro-zoe/micro-app").then(async (microApp: any) => {
        microApp.start({
            lifeCycles: {
                created() {
                    console.log('created 全局监听')
                },
                beforemount() {
                    console.log('beforemount 全局监听')
                },
                mounted() {
                    console.log('mounted 全局监听')
                },
                unmount() {
                    console.log('unmount 全局监听')
                },
                error() {
                    console.log('error 全局监听')
                }
            }

        })
        return microApp
    });
}

// 使用路由权限控制
export const initXWPermission = async (app: App) => {
    return await import("@/plugins/xw-permission/index").then(async (XWUI: any) => {
        XWUI.setupXWPermission(app);
        return XWUI
    });
}



// /**
//  * 解决刷新不触发 router.beforeEach 回调bug
//  * @returns
//  */
// export async function reloadHacker() {
//     // 按需引入路由，避免全量引入，导致 i18n 与 router 循环引入问题
//     let { useUserStoreWithOut } = await import("@/stores/modules/common/user");
//     let { routesStoreWithOut } = await import("@/stores/modules/common/routes");
//     const userStore = useUserStoreWithOut();
//     const routeStore = routesStoreWithOut();
//     if (window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD) {
//         // 用户进行了刷新动作
//         try {
//             let accessRoutes = userStore.getAuthority || {}
//             if (accessRoutes?.menuNames && accessRoutes?.menuNames?.length === 0) {
//                 accessRoutes = await userStore.GetAuthority()
//                 routeStore.GenerateRoutes(accessRoutes?.menuNames || [])
//             }
//         } catch (err) {

//             return userStore.Logout()
//         }
//     }
// }
