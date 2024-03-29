import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import TwoPage from '@/pages/TwoPage.vue';
const routes = [
  
    { path: '/', component: MainPage },  
    { path: '/TwoPage', component: TwoPage },  

  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;