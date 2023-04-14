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
- use computed
- use animations (see base.css#bottom)
- "download all shown" button (w limit for how many elements) -> unsure
*/