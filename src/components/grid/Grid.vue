<script setup lang="ts">
import GridElement from './GridElement.vue'
import PageSelector from './PageSelector.vue'
import { SearchEngine as se } from '@/ts/manager/SearchEngine';
import { PageManager as pm } from '@/ts/manager/PageManager';

</script>

<template>
    <div class="grid_wrapper fade">
        
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
    /* Needed to anchor at bottom of the page, see PageSelector.vue */
    display: flex;
    flex-direction: column;
    /* Padding so that the PageSelector has some padding */
    padding-bottom: 5px;

    background-color: var(--dark-transparent);
    border-radius: 10px;
    width: 100%;
    overflow: auto;
    
}
.grid {
    display: grid;
    /* grid-template-columns: 1fr 1fr 1fr; */
    grid-template-rows: 1fr 1fr 1fr;
    margin: 15px;
    grid-gap: 20px;
    justify-items: center;
    align-items: center;
}

@media screen and (max-width: 849px){
    .grid {
        grid-template-columns: 1fr;
    }
}
@media screen and (min-width: 850px){
    .grid {
        grid-template-columns: 1fr 1fr;
    }
}
@media screen and (min-width: 1250px){
    .grid {
        grid-template-columns: 1fr 1fr 1fr;
    }
}

</style>