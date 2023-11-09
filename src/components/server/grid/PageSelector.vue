<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import PageSelectorButton from './PageSelectorButton.vue'
import { PageManager as pm, isHovering } from '@/ts/manager/PageManager';

let grid: HTMLElement;
let pageselect: HTMLElement;

let finalPos = ref(0);
let maxWidth = ref("95vw")

onMounted(() => {
    grid = document.getElementsByClassName("grid_wrapper")[0] as HTMLElement;
    pageselect = document.getElementsByClassName("page_selector_wrapper")[0] as HTMLElement;
    setTimeout(() => {
        updateOffsets();
    }, 100);
    window.addEventListener("resize", updateOffsets); 
})
onUnmounted(() => {
    window.removeEventListener("resize", updateOffsets); 
})

function updateOffsets() {
    const gridMid = grid.clientWidth / 2;
    const posLeft = gridMid - (pageselect.clientWidth / 2);
    finalPos.value = grid.offsetLeft + posLeft;
    
    const posDiff = (pageselect.clientLeft + pageselect.clientWidth) - (grid.clientLeft + grid.clientWidth);
    // If goes to the right too much when centered
    if (posDiff > 0) {        
        finalPos.value = grid.offsetLeft;
    }
    // If is goes to the right too much when centered AND is wider
    if (pageselect.clientWidth > grid.clientWidth) {
        maxWidth.value = grid.clientWidth + "px"
    }
    // Reset default value to keep full width otherwise
    else {
        maxWidth.value = "95vw"
    }
}
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
    position: absolute;
    bottom: 10px;
    left: v-bind("finalPos + 'px'");
    max-width: v-bind("maxWidth");
    margin: auto;
    /* Needed to anchor at bottom of the page, see Grid.vue */
    /* margin-top: auto; */

    /* Center & allow overflow in sub element */
    display: flex;
    /* width: 50%; */
    /* justify-content: center; */

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
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
}
</style>
