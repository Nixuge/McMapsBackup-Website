<script setup lang="ts">
import { currentMap } from '@/ts/manager/ElementViewerManager';
</script>

<template>
    <div class="viewer">
        <img :src="currentMap.getPreviewUrl()">
        <div class="text" v-if="currentMap.minigame != ''">
            <h1 v-text="currentMap.minigame"></h1>
            <hr>
            <h1 v-text="currentMap.map_name"></h1>
            <h2 v-text="'Built by ' + currentMap.builders"></h2>
            <hr>
            <div v-if="currentMap.downloads.length != 0">
                <h1>Downloads</h1>
                <ul>
                    <a v-for="download in currentMap.downloads" :href="currentMap.getDownloadUrl(download.url)">
                        <li v-text="download.name" />
                    </a>
                </ul>
            </div>
            <div v-if="currentMap.commentaries != undefined">
                <hr>
                <h1>Additional info</h1>
                <h2 v-text="currentMap.commentaries"></h2>
            </div>
        </div>
        <div class="text" v-else>
            <h1>No map selected</h1>
        </div>
    </div>
</template>

<style scoped>
.text {
    padding: 10px;
}

.viewer {
    background-color: var(--dark-transparent);
    border-radius: 10px;
}

img {
    width: 100%;
    border-radius: 8px 8px 0px 0px;
    /* 2px smaller than viewer's border radius to avoid background color artifacts */
}

h1 {
    margin: 0;
}

li {
    font-size: large;
}

a {
    color: rgb(255, 168, 212);
}

a:visited {
    color: hotpink;
}
</style>