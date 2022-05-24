import {
  createMemoryHistory,
  createRouter,
  createWebHistory
} from 'vue-router'

export function getRouter () {
  return createRouter({
    history: import.meta.env.SSR
      ? createMemoryHistory()
      : createWebHistory(),
    routes: [{
      path: '/',
      component: () => import('../views/index.vue')
    }]
  })
}
