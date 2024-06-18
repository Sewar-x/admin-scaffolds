import { Layout } from '@/router/layout'
import {
  Document,
  Location,
} from "@element-plus/icons-vue";
export default {
    path: "/auth-menus",
    name: 'authMenus',
    component: Layout,
    order: 1,
    hidden: false,
    redirect: "/auth-menus/authMenu1",
    meta: {
        title: '权限菜单',
        hideBreadcrumb: false,
        icon: Document
    },
    children: [
        {
          path: '/authMenu1',
          component: () => import("@/views/authMenu/menu1.vue"),
          name: 'authMenu1',
          hidden: false,
          meta: {
            title: '权限菜单1',
            icon: Location
          }
        },
        {
          path: '/authMenu2',
          component: () => import("@/views/authMenu/menu2.vue"),
          name: 'authMenu2',
          hidden: false,
          meta: {
            title: '权限菜单2',
            icon: Location
          }
        }
    ]
}