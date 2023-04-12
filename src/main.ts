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
TODO:
On search change:
-if removing a character, recalculate the whole thing
-if adding one, recalculate basing on the currently shown search results
check if page currently on still exists, otherwise fallback to highest page still available

*/