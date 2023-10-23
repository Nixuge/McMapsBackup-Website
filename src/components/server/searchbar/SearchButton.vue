<script setup lang="ts">
defineProps<{
    text: string,
    href: string
}>()
</script>

<template>
    <div class="button">
        <button v-on:click="$router.push(href)" v-text="text" />
    </div>
</template>
<style scoped>
.button {
    white-space: nowrap;
}

button {
    cursor: pointer;
    background: #ffffff30;
    border-radius: 5px;
    border: 0px;
    color: #fff;
    font-size: large;
}
</style>