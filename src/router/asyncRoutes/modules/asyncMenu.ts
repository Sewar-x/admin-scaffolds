export default {
    path: "/async-menus",
    name: 'asyncMenus',
    component: () => import("@/components/Layout/src/entry.vue"),
    order: 2,
    hidden: false,
    redirect: "/async-menus/asyncMenu1",
    meta: {
        title: '异步菜单',
        hideBreadcrumb: false,

    },
    children: [
        {
          path: '/asyncMenu1',
          component: () => import("@/views/asyncMenu/menu1.vue"),
          name: 'asyncMenu1',
          hidden: false,
          meta: {
            title: '异步菜单1',
          }
        },
        {
          path: '/asyncMenu2',
          component: () => import("@/views/asyncMenu/menu2.vue"),
          name: 'asyncMenu2',
          hidden: false,
          meta: {
            title: '异步菜单2',
          }
        },
        {
          path: '/asyncMenu3',
          component: () => import("@/views/asyncMenu/menu3.vue"),
          name: 'asyncMenu3',
          hidden: false,
          meta: {
            title: '异步菜单3',
          }
        }
    ]
}