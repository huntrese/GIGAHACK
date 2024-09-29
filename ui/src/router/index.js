import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../components/dashboard/Dashboard.vue'; // Main component for authenticated users
import AuthPage from '../components/auth/AuthPage.vue'; // Authentication component

const routes = [
  {
    path: '/',
    redirect: '/auth', // Redirect root path to /auth
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthPage,
  },
  {
    path: '/home',
    name: 'Home',
    component: Dashboard,
  },
  // Add other routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
