import { createRouter, createWebHistory } from 'vue-router'

import { routers } from '@/router/router.config'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routers
})

export default router
