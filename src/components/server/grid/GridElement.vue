<script setup lang="ts">
import { ServerMap } from '@/ts/server/ServerMap';
import { setCurrentMap } from '@/ts/manager/CurrentMap';
import McModel from '@/components/server/viewer/McModel.vue';
import { modelPreviewDefault, modelFallbackToImage, showModelOnGrid } from '@/ts/manager/settings/SettingsManager';
import { isModelFailed, markModelFailed, preloadModel } from '@/ts/manager/models/ModelCache';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
  map: ServerMap;
}>();

const modelLoadError = ref(false);

watch(() => props.map.id, () => {
    modelLoadError.value = false;
});

watch([modelPreviewDefault, showModelOnGrid], () => {
    modelLoadError.value = false;
});

const isModelActive = computed(() => {
    if (!modelPreviewDefault.value || !showModelOnGrid.value || props.map.minigame === "") {
        return false;
    }
    const modelUrl = props.map.getModelUrl();
    if (!modelUrl) {
        return false;
    }
    if (modelFallbackToImage.value && (modelLoadError.value || isModelFailed(modelUrl))) {
        return false;
    }
    return true;
});

function onModelError() {
    modelLoadError.value = true;
    const url = props.map.getModelUrl();
    if (url) {
        markModelFailed(url);
    }
}

function onHover() {
    const url = props.map.getModelUrl();
    if (url && modelPreviewDefault.value) {
        preloadModel(url);
    }
}
</script>

<template>
    <div
        class="grid_element fade"
        @click="setCurrentMap(map)"
        @mouseenter="onHover"
        @pointerenter="onHover"
    >
        <div v-if="isModelActive" class="grid-model-wrapper">
            <McModel
                :src="map.getModelUrl()"
                :interactiveControls="false"
                @error="onModelError"
            />
        </div>
        <img v-else :src="map.getPreviewUrl()">
        <p>{{ map.mapName }}</p> 
    </div>
</template>

<style scoped>
/* Kinda dirty fix, but for some reason can't remove a margin on top */
p {
    margin: 0;
    transform: translateY(-2px);
}
.grid_element {
    padding-bottom: 0px;
    transition: cubic-bezier(0.075, 0.82, 0.165, 1) .2s;
    border-radius: 10px;
    text-align: center;
    width: 95%;
    background-color: rgba(0, 0, 0, 0.174);
    padding: 5px 5px 0 5px;
}
.grid_element:hover {
    cursor: pointer;
    transform: scale(1.02);
}

img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
}

.grid-model-wrapper {
    border-radius: 10px;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    position: relative;
}
</style>