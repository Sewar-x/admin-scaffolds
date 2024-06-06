import type { App } from "vue";
import initPermission from "xw-ui/permission"
import { setKeys, setStorage } from "xw-ui/permission"
import asyncRoutes from "@/router/asyncRoutes";
import basicRoutes from "@/router/basicRoutes";
import whiteList from "@/router/basicRoutes/whiteList";
import { checkOaLogin, getAuthList } from "@/api/login"
import requestSetting from "@/settings/requestSetting"


const publicPath = import.meta.env.VITE_OUT_DIR // 系统 publicPath 目录
export async function setupXWPermission(app: App, router: any) {
    // 必须设置 token key
    setKeys({
        token_key: requestSetting.tokenKey,
        oa_token_keys: ['SIAMTGT', 'SIAMJWT'],
        locale_key: '_LOCALE__',
        user_info_key: '_USER__INFO__',
        user_authority_key: '_USER__AUTHORITY__',
        user_async_route_key: '_USER_ASYNC_ROUTE_'
    })
    setStorage({
        type: requestSetting.storageType
    })
    //定义一个符合 permissionOptions 接口的对象 
    const options = {
        router,
        publicPath, // 系统 publicPath 目录
        whiteList, // 路由白名单
        asyncRoutes, // 异步路由
        basicRoutes, // 基础路由
        getAuthList, // 获取用户权限列表
        checkOaLogin, // 检查oa登录状态
    }
    await initPermission(app, options, (params: any) => {
        console.log('权限初始化完成===', params)
        getCallback(params)
    })
}

async function getCallback(params: any) {
    if (!params) return null

    console.log("🚀 ~ getCallback:", params)

}
