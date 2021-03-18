import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import TestIndex from '../views/Index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'TestIndex',
    component: TestIndex,
  },
  {
    path: '/treeTem',
    name: 'TreeTem',
    component: () => import('../views/TreeTemplate.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
