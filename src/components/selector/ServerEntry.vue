<script setup lang="ts">
defineProps<{
    serverName: string,
    serverUrl: string,
    thumbnailName: string,
    death: string,
    country: string,
    discord?: string
}>()

const BASE_URL = (process.env.NODE_ENV == "development") ? 
    "https://maps.nixuge.me/static/" : 
    "static/";

const THUMB_URL = BASE_URL + "server_thumbnails/";
const FLAG_URL = BASE_URL + "flags/";

function redirect(invite: string | undefined) {
    if (invite === undefined)
        return;
    window.location.href = "https://discord.gg/" + invite;   
}
</script>

<template>
    <div class="serverentry" @click="$router.push('/' + serverUrl + '/')" >
        <img class="discordicon" v-if="discord !== undefined"  @click.stop="redirect(discord)" :src="BASE_URL + 'discord.png'">
        <img class="servericon" :src="THUMB_URL + thumbnailName">
        <div class="serverdeath">
            <img class="deathicon" :src="THUMB_URL + 'death.png'">
            <span class="deathtext" v-text="death"></span>
            <img class="flagicon" :src="FLAG_URL + country + '.png'">
        </div>
        <button v-text="serverName" />
    </div>
</template>

<style scoped>
    .discordicon {
        position: absolute;
        width: 50px;
        margin-top: 140px;
        margin-left: 140px;
        background: #131313;
        border-radius: 10px;
        padding: 11px 5px 11px 5px; /* Wider so adapting to make it a square*/
        cursor: pointer;
    }
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
        background: rgb(214,214,214);
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

    .flagicon {
        float: right;
        margin-right: 5px;
        transform: translateY(3px); /* Annoying image being 2px offcenter */
        border-radius: 50px;
    }
</style>