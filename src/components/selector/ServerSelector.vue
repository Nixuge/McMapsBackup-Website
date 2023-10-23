<script setup lang="ts">
import ServerEntry from './ServerEntry.vue'
</script>

<template>
    <div>
        <h1>Welcome to Nixuge's Minecraft Map Archives</h1>
        <div id="buttongrid">
            <ServerEntry serverName="Mineplex" serverUrl="mineplex" thumbnailName="mineplex.webp" death="16/05/2023" />
            <ServerEntry serverName="Funcraft" serverUrl="funcraft" thumbnailName="funcraft.jpg" death="26/08/2023"/>
            <ServerEntry serverName="OneCube" serverUrl="onecube" thumbnailName="onecube.jpg" death="28/04/2023"/>
            <ServerEntry serverName="HiveMC" serverUrl="hive" thumbnailName="hive.png" death="15/04/2023"/>
            <ServerEntry serverName="lunar.gg" serverUrl="lunar" thumbnailName="lunar.png" death="01/06/2023"/>
        </div>
    </div>
</template>

<style scoped>
h1 {
    text-align: center;
    font-size: 300%;
}
#buttongrid {
    margin: auto;
    padding-top: 2%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
@media screen and (max-width: 849px) {
    #buttongrid {
        width: 100%;
    }
}

@media screen and (min-width: 850px) {
    #buttongrid {
        width: 80%;
    }
}
</style>