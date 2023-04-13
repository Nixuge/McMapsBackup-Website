<script setup lang="ts">
import { SearchEngine as se } from '@/ts/manager/SearchEngine';
</script>

<template>
    <input name="Search Input" placeholder="Search for a map here" @input="event => se.handleInputChange(event)">
</template>

<style scoped>

input {
    font-size: 20px;
    width: 100%;
    box-sizing: border-box;
    background: transparent;
    border: none;
    box-shadow: none;
    color: var(--text-color);
}

textarea:focus, input:focus{
    outline: none;
}
</style>