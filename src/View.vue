<script setup lang="ts">
import ElementViewer from './components/ElementViewer.vue'
import SearchBar from './components/searchbar/SearchBar.vue'
import SearchGrid from './components/grid/Grid.vue'
import { parseUrlArgs } from './ts/ArgsHandler';

parseUrlArgs()

</script>

<template>
    <SearchBar />
    <div id="grid_container">
        <ElementViewer id="first_child" />
        <SearchGrid />
    </div>
</template>


<style scoped>
#grid_container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 10px;

    /* full height - margin heights - hotbar height */
    /* Aproximate but works quite well */
    /* + fuck css (why is height: 100% overflowing) */
    height: calc(100% - 40px - 2rem)
}
</style>
