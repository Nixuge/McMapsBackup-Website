<script setup lang="ts">

import ServerSelector from '@/components/selector/ServerSelector.vue'
import InfoList from '@/components/selector/infos/InfoList.vue'

</script>

<template>
    <h1>Welcome to Nixuge's Minecraft Map Archives</h1>
    <InfoList />
    <ServerSelector />
</template>

<style scoped>
h1 {
    text-align: center;
    font-size: 300%;
}
</style>