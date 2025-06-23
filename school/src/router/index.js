import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/About.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/tos', name: 'Tos', component: () => import('../components/Tos.vue') },
  { path: '/privacy', name: 'PrivacyPolicy', component: () => import('../components/PrivacyPolicy.vue') },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../components/Cart.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
