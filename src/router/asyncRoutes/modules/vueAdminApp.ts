import { Layout } from '@/router/layout'
import { $t } from '@/plugins/locales/setupLocale'
import { Document } from '@element-plus/icons-vue'
import { subAppConfigs } from '@/plugins/micro-app/appConfigs'

export default {
  path: '/vue-admin-app',
  name: 'vueAdminApp',
  component: Layout,
  order: 3,
  hidden: false,
  meta: {
    title: $t('Vue Admin应用'),
    hideBreadcrumb: false,
    icon: Document,
    microAppOptions: subAppConfigs['vue-admin-app']
  },
  children: []
}
