<script setup lang="ts">
import SearchButton from '@/components/server/searchbar/SearchButton.vue'

// TODO: REMOVE & MOVE TO THE POPUP VERSION
</script>

<template>
    <SearchButton text="Back home" href="/" />
    <h1>Search help</h1>
    <br>
    <h1>Tags:</h1>
    <h2>game:[minigame name here] -> lets you select maps from a specific minigame</h2>
    <h2>builder:[builder name here] -> lets you select maps built by a specific builder</h2>
    <h2>nano:[true or false] -> lets you either choose only nano games or only non-nano games</h2>
    <br>
    <h2>You can chain tags</h2>
</template>


<style scoped>
h1,
h2 {
    margin: 0;
}
</style>
