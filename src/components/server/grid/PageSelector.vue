<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import PageSelectorButton from './PageSelectorButton.vue'
import { PageManager as pm, isHovering } from '@/ts/manager/PageManager';

let grid: HTMLElement;
let pageSelect: HTMLElement;

onMounted(() => {
    grid = document.getElementsByClassName("grid_wrapper")[0] as HTMLElement;
    pageSelect = document.getElementsByClassName("page_selector_wrapper")[0] as HTMLElement;
    pm.setElementsForOffset(grid, pageSelect)
    
    setTimeout(() => {
        updateOffsets();
    }, 100);
    window.addEventListener("resize", updateOffsets);
})
onUnmounted(() => {
    window.removeEventListener("resize", updateOffsets); 
})

function updateOffsets() {
    pm.updateOffsets()
}

// function updateOffsetsDelay() {
//     console.log("hidsfsdf");
//     updateOffsets()
//     setTimeout(() => {updateOffsets}, 2000)
// }
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
    left: v-bind("pm.finalPos.value + 'px'");
    max-width: v-bind("pm.maxWidth.value");
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
