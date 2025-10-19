import { createRouter, createWebHistory } from 'vue-router'

// Get base URL - handle both dev and production
const baseUrl = import.meta.env.BASE_URL || '/'

const router = createRouter({
  history: createWebHistory(baseUrl),
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
