import { Layout } from '@/router/layout'
import { $t } from '@/plugins/locales/setupLocale'
import { Document } from '@element-plus/icons-vue'
import { subAppConfigs } from '@/plugins/micro-app/appConfigs'
console.log("🚀 ~ subAppConfigs:", subAppConfigs)

export default {
  path: '/micro-app',
  name: 'microApp',
  component: Layout,
  order: 3,
  hidden: false,
  meta: {
    title: $t('MicroApp应用'),
    hideBreadcrumb: false,
    icon: Document
  },
  children: [
    {
      path: '/oldApp',
      name: 'oldApp',
      hidden: false,
      meta: {
        title:  $t('旧应用'),
        icon: Document,
        microAppOptions: subAppConfigs['oldApp']
      }
    },
    {
      path: '/newApp',
      name: 'newApp',
      hidden: false,
      meta: {
        title:  $t('新应用'),
        icon: Document,
        microAppOptions: subAppConfigs['newApp']
      }
    }
  ]
}
