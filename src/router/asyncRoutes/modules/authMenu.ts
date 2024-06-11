export default {
    path: "/auth-menus",
    name: 'authMenus',
    order: 2,
    hidden: false,
    meta: {
        title: '权限菜单',
        hideBreadcrumb: true,

    },
    children: [
        {
          path: '/authMenu1',
          component: () => import("@/views/authMenu/menu1.vue"),
          name: 'authMenu1',
          meta: {
            hidden: false,
          }
        },
        {
          path: '/authMenu2',
          component: () => import("@/views/authMenu/menu2.vue"),
          name: 'authMenu2',
          meta: {
            hidden: false,
          }
        }
    ]
}