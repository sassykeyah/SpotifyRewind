/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/Home.vue')
    },
    {
      path: '/track/:id',
      name: 'track',
      // route level code-splitting
      // this generates a separate chunk (Track.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/components/Details.vue'),
      props: true
    }
    
  ]
})

export default router
