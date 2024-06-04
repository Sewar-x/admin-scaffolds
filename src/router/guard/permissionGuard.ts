
export function createPermissionGuard(router: Router) {
    /**
     * 问题： 直接使用 router.beforeEach 会导致在刷新页面时无法进入 router.beforeEach 的回调函数
     * 原因：可能是因为在刷新页面时，Vue Router 的初始化过程尚未完成，导致路由守卫无法正常触发。
     * 解决方案：将 router.beforeEach 回调函数的逻辑放在一个异步函数中，并在 Vue Router 初始化完成后再调用这个异步函数。你可以使用 router.isReady() 方法来判断 Vue Router 是否已经初始化完成。
     * isReady: isReady(): Promise<void> 返回一个 Promise，它会在路由器完成初始导航之后被解析，也就是说这时所有和初始路由有关联的异步入口钩子和异步组件都已经被解析。如果初始导航已经发生，则该 Promise 会被立刻解析。
     */
    router.isReady().then(() => {


    });

}


/**
 * 路由权限判断函数,根据路由权限进入不同路由
 */
export async function routerPermission(to: RouteItem, from: RouteItem, next: Function) {


}





/**
* 获取异步权限
* @param to 
* @returns 
*/
export async function canUserAccess(to: RouteItem) {


}

