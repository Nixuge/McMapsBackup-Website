<script setup lang="ts">
defineProps<{
    serverName: string,
    serverUrl: string,
    thumbnailName: string,
    death: string
}>()

const BASE_URL = (process.env.NODE_ENV == "development") ? 
    "https://maps.nixuge.me/static/server_thumbnails/" : 
    "/static/server_thumbnails/";
</script>

<template>
    <div class="serverentry" v-on:click="$router.push('/' + serverUrl + '/')" >
        <img class="servericon" :src="BASE_URL + thumbnailName">
        <div class="serverdeath">
            <img class="deathicon" :src="BASE_URL + 'death.png'">
            <span class="deathtext" v-text="death"></span>
        </div>
        <button v-text="serverName" />

    </div>
</template>

<style scoped>
    .serverentry {
        margin: 20px;
        padding: 10px;
        /* border: 1px solid #000000; */
        background: rgba(0, 0, 0, 0.195);
        width: fit-content;
        border-radius: 15px;
        cursor: pointer;
    }
    .servericon {
        max-width: 200px;
        max-height: 200px;
        border-radius: 20px;
    }
    button {
        font-size: 250%;
        background: rgb(214, 214, 214);
        border-radius: 15px;
        padding: 8px;
        border: transparent;
        margin-top: 10px;
        width: 100%;
    }
    button:hover {
        cursor: pointer;
    }
    .serverdeath {
        background: rgba(0, 0, 0, 0.302);
        border-radius: 5px;
    }
    .deathicon {
        top: 5px;
        transform: translateY(2px); /* Annoying image being 2px offcenter */
        margin-right: 2px;
        margin-left: 2px;
    }
    .deathtext {
        color: #ff5353;
        font-weight: bold;
    }
</style>