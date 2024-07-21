// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LessonsView from '@/views/LessonsView.vue'
import LessonDetailView from '@/views/LessonDetailView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import PortfolioView from '@/views/PortfolioView.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomeView
  },
  {
    path: '/lessons',
    name: 'LessonsPage',
    component: LessonsView
  },
  {
    path: '/lessons/:id',
    name: 'LessonDetailPage',
    component: LessonDetailView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginView
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterView
  },
  {
    path: '/portfolio',
    name: 'PortfolioPage',
    component: PortfolioView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
