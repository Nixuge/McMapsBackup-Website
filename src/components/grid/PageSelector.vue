<script setup lang="ts">
import PageSelectorButton from './PageSelectorButton.vue'
</script>

<template>
    <div class="owo">
        <PageSelectorButton/>
        <PageSelectorButton/>
        <PageSelectorButton/>
    </div>
</template>

<style scoped>
.owo {
    position: absolute;
    display: flex;
    justify-content: center;
    bottom: 10px;
    width: 100%;
    background-color: #fff;
}
</style>
