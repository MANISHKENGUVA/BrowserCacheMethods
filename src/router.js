import { createRouter, createWebHistory } from 'vue-router'
import UserPage from './components/UserPage.vue'

const routes = [
  {
    path: '/user/:username',
    name: 'UserPage',
    component: UserPage
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/user/manish'  // default redirect
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router