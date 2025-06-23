import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Catalog from '../components/Catalog.vue'
import Checkout from '../components/Checkout.vue'
import AdminLogin from '../components/AdminLogin.vue'
import AdminPanel from '../components/AdminPanel.vue'

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
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/catalog', name: 'Catalog', component: Catalog },
  { path: '/checkout', name: 'Checkout', component: Checkout },
  { path: '/admin', name: 'AdminLogin', component: AdminLogin },
  { path: '/admin-panel', name: 'AdminPanel', component: AdminPanel },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
