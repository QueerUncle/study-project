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
  {
    path: '/VUE3Test',
    name: 'VUE3Test',
    component: () => import('../views/VUE3Test.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
