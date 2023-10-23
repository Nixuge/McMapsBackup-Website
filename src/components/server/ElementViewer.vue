<script setup lang="ts">
import TST from '@/components/server/transitions/TextSlideTransitionElementViewer.vue'
import { currentMapRawType } from '@/ts/manager/CurrentMap';
import { ElementViewerComponent } from '@/ts/server/CurrentServer';
</script>


<template>
    <div class="viewer fade" id="element-viewer">
        <TST><img :key="+currentMapRawType.id" :src="currentMapRawType.getPreviewUrl()"></TST>
        <ElementViewerComponent />
    </div>
</template>

<style scoped>

.viewer {
    background-color: var(--dark-transparent);
    border-radius: 10px;
    overflow: auto;
}

img {
    width: 100%;
    border-radius: 8px 8px 0px 0px;
    /* 2px smaller than viewer's border radius to avoid background color artifacts */
}
</style>