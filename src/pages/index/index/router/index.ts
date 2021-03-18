import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Index from '../views/Strategy/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/strategy-detail',
    name: 'detail',
    component: () => import('../views/Strategy/detail.vue'),
  },
  {
    path: '/resources-list',
    name: 'ResourcesList',
    component: () => import('../views/Resources/list/index.vue'),
  },
  {
    path: '/resources-edit',
    name: 'ResourcesEdit',
    component: () => import('../views/Resources/edit/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
