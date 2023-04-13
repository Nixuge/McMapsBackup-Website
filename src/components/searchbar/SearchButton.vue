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
  padding-left: 10px;
}
</style>