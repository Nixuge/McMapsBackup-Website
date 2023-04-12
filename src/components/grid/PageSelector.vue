<script setup lang="ts">
import PageSelectorButton from './PageSelectorButton.vue'
import { SearchEngine as se } from '@/ts/manager/SearchEngine';
</script>

<template>
    <div class="page_selector_wrapper">
        <div class="page_selector">
            <PageSelectorButton v-for="pageNum in se.currentPageIndexes" :page_number="pageNum" />
        </div>
    </div>
</template>

<style scoped>
.page_selector_wrapper {
    position: absolute;
    display: flex;
    justify-content: center;
    bottom: 0px;
    width: 100%;
    overflow: auto;
}

.page_selector {
    display: flex;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 10px;
    background-color: var(--dark-transparent-darker);
    text-align: center;
    overflow: auto;
}
</style>
