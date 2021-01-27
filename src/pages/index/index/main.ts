import { createApp } from 'vue';
import http from '@/assets/http';
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-plus/lib/theme-chalk/index.css';
import '@/assets/css/reset.css';

createApp(App)
  .use(store)
  .use(router)
  .use(http)
  .use(ElementPlus)
  .mount('#app');
