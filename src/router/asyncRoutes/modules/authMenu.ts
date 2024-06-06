export default {
    path: "/auth-menu",
    name: 'authMenu',
    component: () => import("@/views/authMenu/index.vue"),
    order: 2,
    hidden: false,
    meta: {
        title: '权限菜单',
        hideBreadcrumb: true,

    }
}