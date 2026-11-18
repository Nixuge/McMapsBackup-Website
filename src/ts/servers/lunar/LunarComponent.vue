<script setup lang="ts">
import TST from '@/components/server/transitions/TextSlideTransitionElementViewer.vue'
import { currentMap as CM } from '@/ts/manager/CurrentMap';
import { LunarMap } from './LunarMap';
import { computed } from 'vue';

const currentMap = computed(() => {
  return CM.value as LunarMap;
})
</script>

<template>
    <div class="text" v-if="currentMap.minigame != ''">
        <TST><h1 :key="currentMap.minigame">{{ currentMap.minigame }}</h1></TST>
        <hr>
        <TST><h1 :key="currentMap.mapName">{{ currentMap.mapName }}</h1></TST>
        <hr>
        <TST><div :key="currentMap.downloads.toString()" v-if="currentMap.downloads.length != 0">
            <h1>Downloads:</h1>
            <ul>
                <template v-for="download in currentMap.downloads">
                    <a :href="currentMap.getDownloadUrl(download.url)">
                        <li>{{ download.name }}</li>
                    </a>
                </template>
            </ul>
        </div></TST>
        
        <TST><div :key="currentMap.commentaries" v-if="currentMap.commentaries != undefined">
            <hr>
            <h1>Additional info</h1>
            <h2>{{ currentMap.commentaries }}</h2>
        </div></TST>
    </div>
    <div class="text" v-else>
        <TST><h1>No map selected</h1></TST>
    </div>
</template>

<style scoped>
.text {
    padding: 10px;
}

h1 {
    margin: 0;
}

li {
    font-size: 150%;
}

a {
    color: rgb(255, 168, 212);
}

a:visited {
    color: hotpink;
}

.communitydl {
    font-size: large;
    font-weight: bold;
    color: #fff;
    text-decoration: underline #000;
    margin-left: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid #fff;
    border-radius: 100px;

    position: relative;
    display: inline-block;
}
.communitydltooltip {
    visibility: hidden;
    width: 200px;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 3;
    top: -95px;
    right: -20%; 
    margin-left: -150px;
    
    opacity: 0;
    transition: opacity .25s cubic-bezier(0.39, 0.575, 0.565, 1);
}
.communitydl:hover .communitydltooltip {
  visibility: visible;
  opacity: 1;
}
.communitydl .communitydltooltip::after {
    content: " ";
    position: absolute;
    top: 50%;
    left: 89%;
    margin-top: 42px;
    border-width: 5px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.5) transparent transparent transparent;
}
</style>
