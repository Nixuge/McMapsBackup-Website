<script setup lang="ts">
import TST from '@/components/server/transitions/TextSlideTransitionElementViewer.vue'
import { currentMap as CM } from '@/ts/manager/CurrentMap';
import { WildyaMap } from './WildyaMap';
import { computed } from 'vue';

const currentMap = computed(() => {
  return CM.value as WildyaMap;
})
</script>


<template>
    <div class="text" v-if="currentMap.minigame != ''">
        <TST><h1 :key="currentMap.minigame">{{ currentMap.minigame }}</h1></TST>
        <hr>
        <TST><h1 :key="currentMap.mapName">{{ currentMap.mapName }}</h1></TST>
        <hr>
        <TST><div :key="currentMap.downloads.toString()" v-if="currentMap.downloads.length != 0">
            <h1>Téléchargements:</h1>
            <ul>
                <a v-for="download in currentMap.downloads" :href="currentMap.getDownloadUrl(download.url)">
                    <li>{{ download.name }}</li>
                </a>
            </ul>
        </div></TST>
        
        
        <TST><div :key="currentMap.commentaries" v-if="currentMap.commentaries != undefined">
            <hr>
            <h1>Infos additionelles</h1>
            <h2>{{ currentMap.commentaries }}</h2>
        </div></TST>
    </div>
    <div class="text" v-else>
        <TST><h1>Aucune map sélectionnée !</h1></TST>
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
    font-size: 150%
}

a {
    color: rgb(255, 168, 212);
}

a:visited {
    color: hotpink;
}
</style>