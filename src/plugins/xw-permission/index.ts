import type { App } from "vue";
import initPermission from "xw-ui/permission"
import asyncRoutes from "@/router/asyncRoutes";
import basicRoutes from "@/router/basicRoutes";
import whiteList from "@/router/basicRoutes/whiteList";
import { checkSSOLogin, getAuthList } from "@/api/login"
import requestSetting from "@/settings/requestSetting"
import { routesStoreWithOut } from "@/stores/modules/common/routes";

const publicPath = import.meta.env.VITE_BASE_PATH // 系统 publicPath 目录
export async function setupXWPermission(app: App, router: any) {
    //定义一个符合 permissionOptions 接口的对象 
    const options = {
        router,
        publicPath, // 系统 publicPath 目录
        whiteList, // 路由白名单
        asyncRoutes, // 异步路由
        basicRoutes, // 基础路由
        getAuthList, // 获取用户权限列表
        checkSSOLogin, // 检查oa登录状态
        storageType: requestSetting.storageType,// 本地数据存储类型
        TOKEN_KEY: requestSetting.tokenKey, // token 存储 key 值
        SSO_TOKEN_KEYS: ['SIAMTGT', 'SIAMJWT'], //单点登录相关 token

    }
    await initPermission(app, options, (params: any) => {
        if (!params) return null
        console.log("🚀 ~permission params:",params)
        const routeStore = routesStoreWithOut()
        routeStore.initPermissionInst(params)
    })
}

