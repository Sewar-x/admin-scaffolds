import type { App } from "vue";
import initPermission from "xw-ui/permission"
import { basicRoutes, asyncRoutes } from "@/router/routes";
import { WHITE_NAME_LIST } from "@/router";


const getAuthList = () => {
    console.log('=====获取用户权限列表======')
}

const checkOaLogin = () => {
    console.log('=====检查oa登录状态======')
}



const publicPath = import.meta.env.VITE_OUT_DIR // 系统 publicPath 目录
export async function setupXWPermission(app: App) {
    //定义一个符合 permissionOptions 接口的对象 
    const options = {
        publicPath, // 系统 publicPath 目录
        whiteList: WHITE_NAME_LIST, // 路由白名单
        asyncRoutes, // 异步路由
        basicRoutes, // 基础路由
        getAuthList, // 获取用户权限列表
        checkOaLogin, // 检查oa登录状态
    }

    await initPermission(app, options, (params: any) => {
        console.log('权限初始化完成===', params)
    })
}
