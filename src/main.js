import { createApp } from 'vue';
import { createHead } from '@unhead/vue'; 
import App from './App.vue';
import router from './router';
import VueYandexMetrika from 'vue-yandex-metrika';

const app = createApp(App);

const head = createHead();

app.use(head);

app.use(router);

app.use(VueYandexMetrika, {
    id: 96694010,
    clickmap:true,
    trackLinks:true,
    accurateTrackBounce:true,
    webvisor:true,
    env: process.env.NODE_ENV
    
}); 

app.mount('#app');


