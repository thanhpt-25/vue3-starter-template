import type { App } from 'vue'
import { formatDate } from '@/modules/utils/dateUtils'
export default {
  install(app: App) {
    app.config.globalProperties.$formatDate = formatDate
    app.provide('formatDate', formatDate)
  }
}
