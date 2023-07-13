import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    // component: HomeView
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('../views/ChatView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
