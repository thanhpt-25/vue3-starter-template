import type { App } from 'vue'
import DateFormatPlugin from '@/plugins/DateFormatPlugin'
export default {
  install(app: App) {
    app.use(DateFormatPlugin)
  },
}