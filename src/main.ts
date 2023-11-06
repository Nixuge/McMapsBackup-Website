import { createApp } from 'vue';
import App from '@/App.vue';

import router from './router';

import './assets/base.css';
import './assets/icons.css';
// import './ts/utils/ThemeSetter';

// This may seem unneccesary, but there's a 99% chance you're going to click on one of the buttons
// if you visit the website, and if the server view isn't preloaded, it'll take ~200ms to load.
function preloadView() { import('./views/Server.vue'); }
preloadView();


const app = createApp(App);
app.use(router);
app.mount('#app');

/* 
TODO:
- scrollbar theme (chrome)
- Move the pageselector out of the grid, possibly for better mobile support (+ cleaner overrall?)
---> Might need the use of a flex instead of a grid
*/