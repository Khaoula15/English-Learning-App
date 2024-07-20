import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LessonsView from '@/views/LessonsView.vue';
import LessonDetailView from '@/views/LessonDetailView.vue'; // Import the new LessonDetailView
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';

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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
