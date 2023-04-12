<script setup lang="ts">
import { SearchEngine as se } from '@/ts/manager/SearchEngine';
</script>

<template>
    <div class="input">
        <input name="aa" placeholder="Search for a map here" @input="event => se.handleInputChange(event)">
    </div>
</template>

<style scoped>
/* 
* Because inputs have shitty cross-browser styling support
* I'm just going to style the div around instead
*/
input {
    width: 100%;
    box-sizing: border-box;
}
.input {
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
}
</style>