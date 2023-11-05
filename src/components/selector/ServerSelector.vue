<script setup lang="ts">
import ServerEntry from './ServerEntry.vue'
</script>

<template>
    <h1 id="serverstitle"><span>Backed up servers</span></h1>
    <div id="buttongrid" class="fade">
        <ServerEntry serverName="Mineplex" serverUrl="mineplex" thumbnailName="mineplex.webp" death="16/05/2023" country="us" :iconLinks="[['https://discord.gg/RecgHVxKuk', 'discord.png', 'MineplexBackup\'s Discord']]" />
        <ServerEntry serverName="Funcraft" serverUrl="funcraft" thumbnailName="funcraft.jpg" death="26/08/2023" country="fr" :iconLinks="[['https://funcraft.nixuge.me', 'funcraft.png', 'Site recrée de Funcraft']]" />
        <ServerEntry serverName="Onecube" serverUrl="onecube" thumbnailName="onecube.jpg" death="28/04/2023" country="fr" />
        <ServerEntry serverName="HiveMC" serverUrl="hive" thumbnailName="hive.png" death="15/04/2023" country="gb" :iconLinks="[['https://discord.gg/PEtgk4TSEF', 'discord.png', 'HiveBackup\'s Discord'], ['https://hivebackup.github.io/', 'hivebackup.png', 'HiveBackup\'s Website']]" />
        <ServerEntry serverName="lunar.gg" serverUrl="lunar" thumbnailName="lunar.png" death="01/06/2023" country="us" />
        <ServerEntry serverName="Erisium" serverUrl="erisium" thumbnailName="erisium.png" death="02/11/2023(?)" country="fr" />
    </div>
</template>

<style scoped>
    #serverstitle {
        text-align: center;
        margin-bottom: 0;
    }
    #serverstitle > span {
        width: fit-content;
        background: rgba(0, 0, 0, 0.195);
        border-radius: 10px 10px 0 0;
        padding: 5px 30px 0 30px;
    }

#buttongrid {
    margin: auto;
    padding-top: 2%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: rgba(0, 0, 0, 0.195);
    padding-top: 10px;
    border-radius: 15px;
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