<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import PageSelectorButton from './PageSelectorButton.vue';
import { PageManager as pm, isHovering } from '@/ts/manager/PageManager';

const pageSelectWrapper = ref<HTMLElement | null>(null);
let resizeObserver: ResizeObserver | null = null;

function updateOffsets() {
    pm.updateOffsets();
}

onMounted(() => {
    const pageSelect = pageSelectWrapper.value;
    const grid = pageSelect?.parentElement;

    if (grid && pageSelect) {
        pm.setElementsForOffset(grid, pageSelect);

        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(() => {
                updateOffsets();
            });
            resizeObserver.observe(grid);
            resizeObserver.observe(pageSelect);
        } else {
            updateOffsets();
            window.addEventListener("resize", updateOffsets);
        }
    }
});

onUnmounted(() => {
    if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
    }
    window.removeEventListener("resize", updateOffsets);
});
</script>

<template>
    <div class="page_selector_wrapper" ref="pageSelectWrapper">
        <div class="page_selector" @mouseover="isHovering = true" @mouseleave="isHovering = false">
            <PageSelectorButton class="fade" v-for="(pageNum, index) in pm.pageSelector" :key="index" :pageButton="pageNum"/>
        </div>
    </div>
</template>

<style scoped>
.page_selector_wrapper {
    position: absolute;
    bottom: 10px;
    left: v-bind("pm.finalPos.value + 'px'");
    max-width: v-bind("pm.maxWidth.value");
    margin: auto;
    display: flex;
    min-height: 4em;
}

.page_selector {
    padding-top: 7px;
    overflow: auto;
    display: flex;
    border-radius: 10px;
    background-color: var(--dark-transparent-darker);
    text-align: center;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
}
</style>
