<script setup lang="ts">
defineProps<{
    serverName: string,
    serverUrl: string
}>()
</script>

<template>
    <button v-on:click="$router.push('/' + serverUrl + '/')" v-text="serverName" />
</template>

<style scoped>
    button {
        font-size: 250%;
        background: rgb(214, 214, 214);
        border-radius: 15px;
        padding: 8px;
        border: transparent;
        margin: 10px;
    }
    button:hover {
        cursor: pointer;
    }
</style>