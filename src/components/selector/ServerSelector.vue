<script setup lang="ts">
import ServerEntry from './ServerEntry.vue'
</script>

<template>
    <div>
        <h1>Welcome to Nixuge's Minecraft Archives</h1>
        <div id="buttongrid">
            <ServerEntry serverName="Mineplex" serverUrl="mineplex" />
            <ServerEntry serverName="Funcraft" serverUrl="funcraft" />
            <ServerEntry serverName="OneCube" serverUrl="onecube" />
            <ServerEntry serverName="HiveMC" serverUrl="hive" />
            <ServerEntry serverName="lunar.gg" serverUrl="lunar" />
        </div>
    </div>
</template>

<style scoped>
h1 {
    text-align: center;
    font-size: 300%;
}
#buttongrid {
    padding-top: 2%;
    margin: auto;
    width: 70%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    /* align-items: center; */
    /* align-content: space-between */
}
/* #buttongrid:after {
  display: block;
  content: " placeholder ";
  margin: 10px;
  flex: 999 999 auto;
} */
.item {
  flex: 0 0 auto;
  margin: 10px;
}
</style>