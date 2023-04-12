import { createApp } from 'vue'
import App from '@/App.vue'


const app = createApp(App);

app.mount('#app');

/* 
TODO:
On search change:
-if removing a character, recalculate the whole thing
-if adding one, recalculate basing on the currently shown search results
check if page currently on still exists, otherwise fallback to highest page still available

*/