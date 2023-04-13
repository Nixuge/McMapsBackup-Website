import { createApp } from 'vue'
import App from '@/App.vue'
import { SearchEngine } from './ts/manager/SearchEngine';

import router from './router'

import './assets/base.css'

SearchEngine.init()

const app = createApp(App);
app.use(router);
app.mount('#app');

/* 
TODO LEFT:
- prod
- handle the "minigame" button
- mobile support (media queries prolly)
- actually add the maps
*/