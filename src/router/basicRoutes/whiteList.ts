import basicRoutes from "@/router/basicRoutes";
// 白名单路由名称
export const WHITE_NAME_LIST: string[] = [];

// 获取路由名称
const getRouteNames = (array: any[]) => {
    array.forEach((item) => {
        WHITE_NAME_LIST.push(item.name);
        getRouteNames(item.children || []);
    });
}

//获取常量路由白名单
getRouteNames(basicRoutes);
export default WHITE_NAME_LIST;