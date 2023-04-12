<script setup lang="ts">
import GridElement from './GridElement.vue'
import PageSelector from './PageSelector.vue'
import { currentMaps } from '@/ts/search';

</script>

<template>
    <div class="grid_wrapper">
        <div class="grid">
            <GridElement v-for="current_map in currentMaps" :map="current_map" />
        </div>
        
        <PageSelector />
    </div>
</template>

<style scoped>
.grid_wrapper {
    position: relative;
    background-color: var(--dark-transparent);
    border-radius: 10px;
    width: 100%;
}
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto auto;
    margin: 10px;
    grid-gap: 10px;
    justify-items: center;
    align-items: center;
}
.page_selector {
    position: absolute;
    bottom: 10px;
}
</style>