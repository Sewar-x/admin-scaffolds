import Http from '@/plugins/xw-xhttp'

interface AccountInfoModel {
    username: string,
    password: string,
}

export function login(params: AccountInfoModel) {
    return new Promise((resolve) => {
        // 假设这是从服务器获取到的数据  
        const data = {
            "token": "U8g4QGC49FdR8btWuJnY3umBcKxj9D3wcI3ByRzevm5m8NwMErft/YpsVthtO0oQxEQWKacLw/O9Ke8D.eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMC4xMTguMS44OTo4MDg2IiwiYXVkIjoiIiwiaWF0IjoxNzE0MTMxMDU2LCJuYmYiOjE3MTQxMzEwNTYsImV4cCI6MTcxNDEzNDY1NiwiZGF0YSI6MTQ3fQ.jV1QMEIjF0nvXLzlKpPzJ6sDMj5rceB-qmD2b7wDxm0",
            "expire": 1714134656,
        };
        // 使用resolve方法将结果返回给调用者  
        resolve(data);
    })
}

export function logout() {
    return Http.post(
        {
            url: '/logout',
        },
        {
            errorMessageMode: 'message',
        },
    );
}


export const checkOaLogin = () => {
    console.log('=====检查oa登录状态======')
    return new Promise((resolve) => {
        // 假设这是从服务器获取到的数据  
        const data = {
            "token": "U8g4QGC49FdR8btWuJnY3umBcKxj9D3wcI3ByRzevm5m8NwMErft/YpsVthtO0oQxEQWKacLw/O9Ke8D.eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMC4xMTguMS44OTo4MDg2IiwiYXVkIjoiIiwiaWF0IjoxNzE0MTMxMDU2LCJuYmYiOjE3MTQxMzEwNTYsImV4cCI6MTcxNDEzNDY1NiwiZGF0YSI6MTQ3fQ.jV1QMEIjF0nvXLzlKpPzJ6sDMj5rceB-qmD2b7wDxm0",
            "expire": 1714134656,
            "oa": []
        };
        // 使用resolve方法将结果返回给调用者  
        resolve(data);
    })
}

export const getAuthList = (params: any) => {
    console.log('=====获取用户权限列表参数======', params)
    return new Promise((resolve) => {
        // 假设这是从服务器获取到的数据  
        const data = {
            menuNames: ["authMenu"], // 菜单权限名称列表
            rule: [],// 按钮级别权限
        }
        // 使用resolve方法将结果返回给调用者  
        resolve(data);
    })


}
