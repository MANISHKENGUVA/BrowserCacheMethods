import { createRouter, createWebHistory } from 'vue-router'
import UserPage from './components/UserPage.vue'
import UserPage2 from './components/UserPage2.vue'
const routes = [
  {
    path: '/user',
    name: 'UserPage',
    component: UserPage
  },
  {
    path: '/user2',
    name: 'UserPage2',
    component: UserPage2
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
