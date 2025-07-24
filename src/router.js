import { createRouter, createWebHistory } from 'vue-router'
import UserPage from './components/UserPage.vue'

const routes = [
  {
    path: '/user',
    name: 'UserPage',
    component: UserPage
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/user'  // fallback
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
