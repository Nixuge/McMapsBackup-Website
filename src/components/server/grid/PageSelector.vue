<script setup lang="ts">
import PageSelectorButton from './PageSelectorButton.vue'
import { PageManager as pm, isHovering } from '@/ts/manager/PageManager';
</script>

<template>
    <div class="page_selector_wrapper">
        <div class="page_selector" @mouseover="isHovering = true" @mouseleave="isHovering = false" >
            <PageSelectorButton class="fade" v-for="pageNum in pm.pageSelector" :pageButton="pageNum"/>
        </div>
    </div>
</template>

<style scoped>
.page_selector_wrapper {
    /* Needed to anchor at bottom of the page, see Grid.vue */
    margin-top: auto;

    /* Center & allow overflow in sub element */
    display: flex;
    width: 100%;
    justify-content: center;

    /* Needed, otherwise Safari just hides it (thanks Safari) */
    min-height: 4em;
}

.page_selector {
    /* Padding balanced by min-height in parent element */
    padding-top: 7px;
    overflow: auto;

    /* Normal theming */
    display: flex;
    border-radius: 10px;
    background-color: var(--dark-transparent-darker);
    text-align: center;
}
</style>
