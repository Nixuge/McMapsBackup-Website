<script setup lang="ts">
import { PageButtonData, TYPE } from '@/ts/data/PageButtonType';

defineProps<{
  pageButton: PageButtonData
}>()
</script>

<template>
    <div class="page_selector_button" @click="pageButton.call()"> <!-- Click event to do  -->
        <p v-text="pageButton.text" />
    </div>
</template>

<style scoped>
.page_selector_button {
    border-radius: 10px;
    height: 50px;
    width: 50px;
    min-width: 50px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: var(--color-border);
}
.page_selector_button:hover {
    cursor: pointer;
    background-color: var(--color-border-hover);
}
</style>
