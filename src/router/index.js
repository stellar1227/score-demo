import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '@/pages/NotFound.vue';
import Intro from '@/pages/IntroPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/Intro'
    },
    {
      path: '/Intro',
      name: 'Intro',
      component: Intro,
    },
    {
      path: '/Game',
      name: 'Game',
      component: () => import('@/pages/ScoreLayout.vue'),
    },
    { path: '/:path(.*)', component: NotFound },
  ],
});

export default router;
