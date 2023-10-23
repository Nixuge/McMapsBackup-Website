import { createApp } from 'vue';
import App from '@/App.vue';

import router from './router';

import './assets/base.css';
import './assets/icons.css';
// import './ts/utils/ThemeSetter';

import { SearchEngine } from './ts/manager/SearchEngine';


const app = createApp(App);
app.use(router);
app.mount('#app');

/* 
TODO LEFT:
- use animations (see base.css#bottom)
- scrollbar theme (chrome)
*/