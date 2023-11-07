<script setup lang="ts">

const BASE_URL = (process.env.NODE_ENV == "development") ? 
    "https://maps.nixuge.me/static/" : 
    "static/";
</script>

<template>
    <h1>Search Help</h1>
    <div class="centeredContent">
        <h3>Searching for a map should be pretty straight forward</h3>
        <div class="taghelp">
            <p class="taghelptext">Clicking this should bring up a tag autocomplete popup</p>
            <img :src="BASE_URL + 'help/searchtag.png'">
            <p>from there you should be able to just select one and search whathever you need.</p>
            <br>
            <p>You can also just search for a map name, or just type the tags yourself</p>
        </div>
    </div>
    
</template>

<style scoped>
.centeredContent {
    display: inline-block;
    width: fit-content;
}
/* .taghelp {
    display: flex;
    justify-content: center;
    align-items: center;
} */
.taghelptext {
    margin-left: 10px;
}
h1 {
    margin-bottom: 0;
}
h3 {
    margin-bottom: 10px;
}
p {
    margin: 0;
}
</style>