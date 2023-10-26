<script setup lang="ts">
import SearchInput from './SearchInput.vue'
import SearchButton from './SearchButton.vue'
import SearchThemeSwitcher from './SearchThemeSwitcher.vue'
</script>

<template>
    <div class="fade" id="searchbar">
        <SearchButton text=" < " href="/" />
        <SearchInput />
        <SearchButton text="Search help" href="/help" />
        <SearchButton text="Api" href="/api" />
        <SearchThemeSwitcher />
    </div>
</template>

<style scoped>
#searchbar {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    /* top right bottom left  */
    border-radius: 10px;
    padding: 10px;
    width: 100%;
    box-sizing: border-box; /* width + padding = 100% */

    background-color: var(--dark-transparent);

}
#searchbar:hover {
    background-color: var(--dark-transparent-darker);
}
#searchbar > * {
    padding-right: 5px;
}
</style>