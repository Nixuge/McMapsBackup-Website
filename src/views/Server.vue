<script setup lang="ts">
import ElementViewer from '@/components/server/ElementViewer.vue'
import SearchBar from '@/components/server/searchbar/SearchBar.vue'
import SearchGrid from '@/components/server/grid/Grid.vue'
import { parseUrlArgs } from '@/ts/manager/UrlArgsHandler';

parseUrlArgs()

</script>

<template>
    <SearchBar />
    <div id="grid_container">
        <ElementViewer />
        <SearchGrid />
    </div>
</template>


<style scoped>
#grid_container {
    display: grid;
    /* grid-template-columns: 1fr 3fr; */
    grid-gap: 10px;
    margin-bottom: 0;

    /* full height (100%) - margin heights (20px) - html padding (5px) - hotbar height (2rem) */
    /* Aproximate but works quite well */
    /* + fuck css (why is height: 100% overflowing) */
    height: calc(100% - 25px - 2rem)
}

@media screen and (max-width: 849px) {
    #grid_container {
        grid-template-columns: 1fr 1fr;
    }
}

@media screen and (min-width: 850px) {
    #grid_container {
        grid-template-columns: 1fr 2fr;
    }
}

@media screen and (min-width: 1250px) {
    #grid_container {
        grid-template-columns: 1fr 3fr;
    }
}
.info {
    padding: 0;
    margin: 0;
}
</style>
