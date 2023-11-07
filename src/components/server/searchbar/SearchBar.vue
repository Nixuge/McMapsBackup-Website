<script setup lang="ts">
import SearchInput from './SearchInput.vue'
import SearchButton from './SearchButton.vue'
import SearchThemeSwitcher from './SearchThemeSwitcher.vue'
import { AutoCompleter as ac } from '@/ts/manager/SearchEngine';
</script>

<template>
    <div class="fade" id="searchbar">
        <SearchButton text=" < " href="/" />    
        <SearchButton text=" ! " :action="() => {ac.showTaglistAutocompletePopup()}"/>
        <SearchInput />
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