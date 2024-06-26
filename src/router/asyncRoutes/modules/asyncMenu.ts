import { Layout } from '@/router/layout'
import { $t } from "@/plugins/locales/setupLocale";
import {
  Document,
  Setting,
} from "@element-plus/icons-vue";
export default {
    path: "/async-menus",
    name: 'asyncMenus',
    component: Layout,
    order: 2,
    hidden: false,
    redirect: "/async-menus/asyncMenu1",
    meta: {
        title: $t('异步菜单'),
        hideBreadcrumb: false,
        icon: Document
    },
    children: [
        {
          path: '/asyncMenu1',
          component: () => import("@/views/asyncMenu/menu1.vue"),
          name: 'asyncMenu1',
          hidden: false,
          meta: {
            title: $t('异步菜单1'),
            icon: Setting
          }
        },
        {
          path: '/asyncMenu2',
          component: () => import("@/views/asyncMenu/menu2.vue"),
          name: 'asyncMenu2',
          hidden: false,
          meta: {
            title: $t('异步菜单2'),
            icon: Setting
          }
        },
        {
          path: '/asyncMenu3',
          component: () => import("@/views/asyncMenu/menu3.vue"),
          name: 'asyncMenu3',
          hidden: false,
          meta: {
            title: $t('异步菜单3'),
            icon: Setting
          }
        }
    ]
}