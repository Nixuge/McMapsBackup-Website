<script setup lang="ts">
import ElementViewer from '@/components/ElementViewer.vue'
import SearchBar from '@/components/searchbar/SearchBar.vue'
import SearchGrid from '@/components/grid/Grid.vue'
import { parseUrlArgs } from '@/ts/utils/ArgsHandler.js';

parseUrlArgs()

</script>

<template>
    <h1 class="info"><router-link to="/contribute">Help contribute to missing screenshots</router-link>  <router-link to="/dmca" style="float:right; padding-right: 50px">DMCA</router-link></h1>
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

a,
a:visited {
    color: #fff
}
</style>
