import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import i18n from '@/modules/i18n'
import GlobalPlugins from '@/plugins/GlobalPlugins'
import { handler } from "@/modules/handlers";

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsExample from "@/components/DocsExample.vue";

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

app.use(CoreuiVue)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsExample', DocsExample)

app.use(i18n)
app.use(GlobalPlugins)

app.config.errorHandler= handler

app.mount('#app')
