<script setup lang="ts">
import SearchSelector from './SearchSelector.vue'
import SearchInput from './SearchInput.vue'
import SearchButton from './SearchButton.vue'
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
        <SearchButton text="Api" href="/api" />
    </div>
</template>

<style scoped>
.searchbar {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    /* top right bottom left  */
    border-radius: 10px;
    padding: 10px;
    width: 100%;
    box-sizing: border-box; /* width + padding = 100% */

    background-color: var(--dark-transparent)

}
.searchbar:hover {
    background-color: var(--dark-transparent-darker)
}
</style>