import type { RouteRecordRaw } from 'vue-router'

export const routers: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/home',
    component: () => import('@/layouts/LayoutIndex.vue'),
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/HomeView.vue'),
        meta: { title: '首页', keepAlive: false, showTab: true }
      }
    ]
  }
]
