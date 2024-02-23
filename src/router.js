import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
const routes = [
  
    { path: '/', component: MainPage },  // Уникальный путь для HomePage

  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;