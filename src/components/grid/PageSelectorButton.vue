<script setup lang="ts">
defineProps<{
  page_number: number
}>()
</script>

<template>
    <div class="page_selector_button" @click=""> <!-- Click event to do  -->
        <p v-text="page_number" />
    </div>
</template>

<style scoped>
.page_selector_button {
    border-radius: 10px;
    /* border: 2px solid #000000; */
    height: 50px;
    width: 50px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: var(--color-border);
}
.page_selector_button:hover {
    cursor: pointer;
    background-color: var(--color-border-hover);
}
</style>
