import { createApp } from 'vue';
import { createHead } from '@unhead/vue';
import VueYandexMetrika from 'vue-v3-yandex-metrika';
import App from './App.vue';
import router from './router';


const app = createApp(App);

const head = createHead();

app.use(head)

app.use(router);

app.use(VueYandexMetrika, {
	id: 96694010,
    trackLinks:true,
    accurateTrackBounce:true,
    webvisor:true,
	router: router,
	env: process.env.NODE_ENV
    // other options
})


app.mount('#app');


