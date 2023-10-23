<script setup lang="ts">
import TST from '@/components/server/transitions/TextSlideTransitionElementViewer.vue'
import { currentMap as CM } from '@/ts/manager/CurrentMap';
import { LunarMap } from './LunarMap';
import { computed } from 'vue';

const currentMap = computed(() => {
  return CM.value as LunarMap;
})
</script>


<template>
    <div class="text">
        <h1>Not yet implemented !</h1>
        <h2>The maps unfortunately aren't uploaded yet. Send me a message @ one of the contacts on <a href="https://nixuge.me">nixuge.me</a> if you really need the maps.</h2>
    </div>
</template>

<style scoped>
.text {
    padding: 10px;
}

h1 {
    margin: 0;
}

a {
    color: rgb(255, 168, 212);
}

a:visited {
    color: hotpink;
}
</style>