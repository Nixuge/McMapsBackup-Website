<script setup lang="ts">
import TST from '@/components/server/transitions/TextSlideTransitionElementViewer.vue'
import { currentMap as CM } from '@/ts/manager/CurrentMap';
import { HiveMap } from './HiveMap';
import { computed } from 'vue';

const currentMap = computed(() => {
  return CM.value as HiveMap;
})
</script>


<template>
    <div class="text">
        <TST><h1>Not yet implemented !</h1></TST>
        <TST><h2>Please visit <a href="https://hivebackup.github.io">hivebackup.github.io</a> for the time being.</h2></TST>
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