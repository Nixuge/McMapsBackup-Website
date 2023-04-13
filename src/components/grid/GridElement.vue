<script setup lang="ts">
import { McMap } from '@/ts/data/McMap';
import { setCurrentMap } from '@/ts/manager/ElementViewerManager';

defineProps<{
  map: McMap
}>()
</script>

<template>
    <div class="grid_element" @click="setCurrentMap(map);">
        <img :src="map.getPreviewUrl()">
    </div>
</template>

<style scoped>
.grid_element {
    padding-bottom: 0px;
    transition: cubic-bezier(0.075, 0.82, 0.165, 1) .2s;
    border-radius: 10px;
    text-align: center;
    width: 100%;
}
.grid_element:hover {
    cursor: pointer;
    transform: scale(1.02);
}

img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
}
</style>