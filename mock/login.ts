import { MockMethod } from 'vite-plugin-mock';
const urlPrefix = "/test"
export default [
    {
        url: urlPrefix + '/login',
        method: 'post',
        response: (params) => {
            console.log("🚀登录接口  /api/login :",params)
            const expire = new Date().getTime() + 20 * 60 * 1000
            return {
                'code': 200,
                'message': '获取账号成功',
                'result': {
                    'name': 'xxxxx',
                                'id': 111,
                                'token': '1222222xxxxxxxxxxxxxxxxxxxxxxx',
                                'expire': expire,
                                'userInfo': {
                                    'id': 1,
                                    'name': '张三'
                                }       
                }
            }
        },
    },
    {
        url: urlPrefix +  '/logout',
        method: 'post',
        response: (params) => {
            console.log("🚀退出登录接口  /api/logout :",params)
            return {
                'code': 200,
                'message': '🚀退出登录接口成功',
            }
        },
    },
    {
        url: urlPrefix + '/getAuthList',
        method: 'post',
        response: (params) => {
            console.log("🚀获取用户权限列表  /getAuthList:", params)
            return {
                'code': 200,
                'message': '🚀获取用户权限列表成功',
                'result': {
                    menuNames: [
                        "authMenus",
                        "authMenu1",
                        "authMenu2",
                        'asyncMenus',
                        'asyncMenu1',
                        'asyncMenu2'
                    ], // 菜单权限名称列表
                    rule: [],// 按钮级别权限
                }
            }
        },
    },
    {
        url:  urlPrefix +  '/checkSSOLogin',
        method: 'post',
        response: (params) => {
            console.log("🚀换取单点登录接口", params)
            const expire = new Date().getTime() + 21 * 60 * 1000
            return {
                'code': 200,
                'message': '刷新 token成功',
                'result': {
                    'token': `${params.body.token}+${expire}`,
                    'expire': expire,
                    "sso": []
                }
            }
        },
    },
    {
        url:  urlPrefix + '/refresh-token',
        method: 'post',
        response: (params) => {
            console.log("🚀刷新 token 接口  /refresh-token:", params)
            const expire = new Date().getTime() + 21 * 60 * 1000
            return {
                'code': 200,
                'message': '🚀刷新 token成功',
                'result': {
                    'token': `${params.body.token}+${expire}`,
                    'expires': expire

                }
            }
        },
    }
] as MockMethod[];

