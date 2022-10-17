import { createRouter, createWebHistory } from 'vue-router';
import Intro from '@/pages/IntroPage.vue';
import NotFound from '@pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Intro',
      redirect: '/Intro',
      component: Intro,
    },
    {
      path: '/Game',
      name: 'GameList',
      component: () => import('@/pages/ScoreLayout.vue'),
    },
    { path: '/:path(.*)', component: NotFound },
  ],
});

export default router;
