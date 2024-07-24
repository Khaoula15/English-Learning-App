import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import LessonsView from '@/views/LessonsView.vue'
import LessonDetailView from '@/views/LessonDetailView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import PortfolioView from '@/views/PortfolioView.vue'
import PaymentView from '@/views/PaymentView.vue'
import ProfileView from '@/views/ProfileView.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomeView
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutView
  },
  {
    path: '/contact',
    name: 'ContactPage',
    component: ContactView
  },
  {
    path: '/lessons',
    name: 'LessonsPage',
    component: LessonsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/lessonDetailView/:id',
    name: 'LessonDetailView',
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
    path: '/payment',
    name: 'PaymentPage',
    component: PaymentView,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: ProfileView,
    meta: { requiresAuth: true }
  },
  {
    path: '/portfolio',
    name: 'PortfolioPage',
    component: PortfolioView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = store.getters.isAuthenticated

  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (isAuthenticated && to.name === 'LoginPage') {
    next('/profile')
  } else {
    next()
  }
})

export default router
