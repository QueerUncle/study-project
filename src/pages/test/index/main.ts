import { createApp } from 'vue';
import http from '@/assets/http';
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/setting';
import 'element-plus/lib/theme-chalk/index.css';
import '@/assets/css/reset.css';
import '@/assets/css/public.less';

createApp(App)
  .use(store)
  .use(router)
  .use(http)
  .use(ElementPlus)
  .mount('#app');
