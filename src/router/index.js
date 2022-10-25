import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '@/pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/Game'
    },
    // {
    //   path: '/Intro',
    //   name: 'Intro',
    //   component: () => import('@/pages/IntroPage.vue'),
    // },
    {
      path: '/Game',
      name: 'Game',
      component: () => import('@/pages/ScoreLayout.vue'),
    },
    { path: '/:path(.*)', component: NotFound },
  ],
});

export default router;
