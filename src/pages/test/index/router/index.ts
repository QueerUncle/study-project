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
    path: '/Study',
    name: 'Study',
    component: () => import('../views/Study.vue'),
  },
  {
    path: '/VUE3Test',
    name: 'VUE3Test',
    component: () => import('../views/VUE3Test.vue'),
  },
  {
    path: '/ObjectDefineProperty',
    name: 'ObjectDefineProperty',
    component: () => import('../views/ObjectDefineProperty.vue'),
  },
  {
    path: '/CustomForm',
    name: 'CustomForm',
    component: () => import('../views/CustomForm.vue'),
  },
  {
    path: '/vuedrannable',
    name: 'vuedrannable',
    component: () => import('../views/vuedrannable.vue'),
  },
  {
    path: '/formTable',
    name: 'FormTable',
    component: () => import('../views/FormTable/FormTable.vue'),
  },
  {
    path: '/Es6',
    name: 'Es6',
    component: () => import('../views/Es6.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
