import { createXhttp } from 'xw-ui/xhttp'
import requestSetting from "@/settings/requestSetting"


const { tokenKey, tokenExpires, storageType, urlPrefix } = requestSetting
export default createXhttp({
    tokenKey, // token key值，传入token key值，默认使用内部获取方法
    tokenExpires, // token 过期时间
    storageType, // 存储token 方法
    addAjaxErrorInfo: (error: any) => {
        console.log("🚀 ==========错误日志收集方法===========", error)
    },
    logout: () => {
        console.log('==============logout 退出登录方法============')
    },
    formatResponse: (data: any) => {//参数 formatResponse 方法，对返回的数据格式进行格式化。
        return { // 将服务端返回的数据格式化
            code: data.code,
            message: data.msg,
            result: data.data
        }
    }  // 存储token 方法
},
    {
        requestOptions: {
            urlPrefix
        }
    });

