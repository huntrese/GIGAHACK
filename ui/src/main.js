import { createApp } from 'vue'
import App from '../src/App.vue'
import './index.css'
import router from './router';
import '@vue-flow/core/dist/theme-default.css';

createApp(App)
  .use(router)
  .mount('#app');