import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import i18n from '@/modules/i18n'
import GlobalPlugins from '@/plugins/GlobalPlugins'
import { handler } from "@/modules/handlers";

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(i18n)
app.use(GlobalPlugins)

app.config.errorHandler= handler

app.mount('#app')
