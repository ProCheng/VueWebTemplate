import '@/assets/main.scss'

import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router/index'
import pinia from '@/stores/index'

import { setupProdMockServer } from '@/mock/index'

const app = createApp(App)

setupProdMockServer()
app.use(pinia)
app.use(router)

app.mount('#app')
