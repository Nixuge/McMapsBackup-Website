<script setup lang="ts">
import { PageButtonData, ButtonEffect } from '@/ts/data/PageButtonType';

defineProps<{
  pageButton: PageButtonData
}>()
</script>

<template>
    <div class="page_selector_button" 
    :class="{ 
        disabled: pageButton.effect == ButtonEffect.DISABLED,
        current: pageButton.effect == ButtonEffect.CURRENT
    }"
    @click="pageButton.call()"> <!-- Click event to do  -->
        <p v-text="pageButton.text" />
    </div>
</template>

<style scoped>
.current {
    background-color: var(--color-border-hover) !important;
}

.disabled {
    background: transparent !important;
    color: var(--color-border-hover);
}

.page_selector_button {
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
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
