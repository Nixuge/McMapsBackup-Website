import { createApp } from 'vue';
import App from '@/App.vue';
import { SearchEngine } from './ts/manager/SearchEngine';

import router from './router';

import './assets/base.css';
import './assets/icons.css';
// import './ts/utils/ThemeSetter';

SearchEngine.init();



const app = createApp(App);
app.use(router);
app.mount('#app');

/* 
TODO LEFT:
- use animations (see base.css#bottom)
- scrollbar theme (chrome)
*/