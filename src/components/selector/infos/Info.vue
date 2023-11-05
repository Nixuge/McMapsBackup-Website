<script setup lang="ts">
defineProps<{
    title: string
}>()
</script>

<template>
    <div class="info">
        <h1>{{ title }}</h1>
        <slot />
    </div>
</template>

<style>
.info {
    padding: 10px;
    margin-left: 1%;
    margin-right: 1%;
    background: rgba(0, 0, 0, 0.195);
    width: 27%;
    border-radius: 15px;
    cursor: pointer;
    margin-bottom: 20px;
    height: 100px;
}
.info > * {
    text-align: center;
}
</style>