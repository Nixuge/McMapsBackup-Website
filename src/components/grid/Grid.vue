<script setup lang="ts">
import GridElement from './GridElement.vue'
import PageSelector from './PageSelector.vue'
import { SearchEngine as se } from '@/ts/manager/SearchEngine';
import { PageManager as pm } from '@/ts/manager/PageManager';

</script>

<template>
    <div class="grid_wrapper">
        
        <div class="grid">
            <!-- <TransitionGroup :css="false" @enter="onEnter" appear> -->
                <GridElement v-for="current_map in se.currentMapsPages[pm.page.value]" :map="current_map" :key="current_map"/>
            <!-- </TransitionGroup> -->
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
    grid-template-rows: 1fr 1fr 1fr;
    margin: 20px;
    grid-gap: 20px;
    justify-items: center;
    align-items: center;
    margin-bottom: 50px;
}
</style>