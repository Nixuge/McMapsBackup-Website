<script setup lang="ts">
import SearchSelector from './SearchSelector.vue'
import SearchInput from './SearchInput.vue'
const minigame_options = [
    "minigame 1",
    "minigame 2",
    "all"
]
</script>

<template>
    <div class="searchbar">
        <SearchSelector name="minigame" :options="minigame_options" />
        <SearchInput />
    </div>
</template>

<style scoped>
.searchbar {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px 0px 10px 10px; /* top right bottom left */
    width: 100%;
    box-sizing: border-box; /* width + padding = 100% */

    background-color: #FC4C02;

}
</style>