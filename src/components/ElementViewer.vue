<script setup lang="ts">
import { currentMap } from '@/ts/mcmap';
</script>

<template>
    <div class="viewer">
        <img :src="currentMap.preview_url">
        <div class="text">
            <h1 v-text="currentMap.map_name"></h1>
            <h2 v-text="currentMap.builders"></h2>
            <h1 v-if="currentMap.downloads.length != 0">Downloads</h1>
            <ul>
                <a v-for="download in currentMap.downloads" :href="download.url">
                    <li v-text="download.name"/>
                </a>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.text {
    padding-left: 5px;
}

.viewer {
    /* height: 50rem; */
    background-color: antiquewhite;

    /* height: 100%; */

    border-radius: 10px;
}

img {
    width: 100%;
    border-radius: 8px 8px 0px 0px;
    /* 2px smaller than viewer's border radius to avoid background color artifacts */
}</style>