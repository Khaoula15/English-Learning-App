import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
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
    path: '/lessons',
    name: 'LessonsPage',
    component: LessonsView
  },
  {
    path: '/lessons/:id', // Route for lesson details
    name: 'LessonDetailPage',
    component: LessonDetailView
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
    component: PaymentView
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
   },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated
  if (isAuthenticated && to.name === 'Login') {
    next({ name: 'Profile' })
  } else {
    next()
  }
})

export default router
