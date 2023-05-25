import type { App } from 'vue'
import DateFormatPlugin from '@/plugins/DateFormatPlugin'
import veeValidate from '@/plugins/VeeValidatePlugin'

export default {
  install(app: App) {
    app.use(DateFormatPlugin)
    app.use(veeValidate)
  }
}
