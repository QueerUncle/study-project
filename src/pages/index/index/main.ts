import { createApp } from 'vue';
import http from '@/assets/http';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/css/reset.css';

createApp(App)
  .use(store)
  .use(router)
  .use(http)
  .mount('#app');
