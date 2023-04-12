<script setup lang="ts">
import PageSelectorButton from './PageSelectorButton.vue'
</script>

<template>
    <div class="owo">
        <PageSelectorButton :page_number="1"/>
        <PageSelectorButton :page_number="3"/>
        <PageSelectorButton :page_number="22"/>
    </div>
</template>

<style scoped>
.owo {
    position: absolute;
    display: flex;
    justify-content: center;
    text-align: center;
    bottom: 20px;
    width: 100%;
}
</style>
