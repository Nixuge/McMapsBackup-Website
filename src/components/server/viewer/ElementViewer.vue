<script setup lang="ts">
import TST from '@/components/server/transitions/TextSlideTransitionElementViewer.vue'
import McModel from '@/components/server/viewer/McModel.vue'
import { currentMap } from '@/ts/manager/CurrentMap';
import { ElementViewerComponent } from '@/ts/server/CurrentServer';
import { modelPreviewDefault, modelFallbackToImage } from '@/ts/manager/settings/SettingsManager';
import { isModelFailed, markModelFailed } from '@/ts/manager/models/ModelCache';
import { computed, ref, watch } from 'vue';

const modelLoadError = ref(false);
const isModelModalOpen = ref(false);

watch(() => currentMap.value.id, () => {
    modelLoadError.value = false;
    isModelModalOpen.value = false;
});

watch(modelPreviewDefault, () => {
    modelLoadError.value = false;
});

// Almost same as in GridElement
const is3DActive = computed(() => {
    if (!modelPreviewDefault.value || currentMap.value.minigame === "") {
        return false;
    }
    const modelUrl = currentMap.value.getModelUrl();
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
    const url = currentMap.value.getModelUrl();
    if (url) {
        markModelFailed(url);
    }
}
</script>


<template>
    <div class="viewer fade" id="element-viewer">
        <TST>
            <div
                v-if="is3DActive"
                :key="'model-' + currentMap.id"
                class="model-wrapper"
                :class="{ 'is-modal-active': isModelModalOpen }"
            >
                <McModel
                    :src="currentMap.getModelUrl()"
                    :imageUrl="currentMap.getPreviewUrl()"
                    @error="onModelError"
                    @modal-change="(open: boolean) => isModelModalOpen = open"
                />
            </div>
            <img
                v-else
                :key="'img-' + currentMap.id"
                :src="currentMap.getPreviewUrl()"
            />
        </TST>
        <ElementViewerComponent />
    </div>
</template>

<style scoped>
.viewer {
    background-color: var(--dark-transparent);
    border-radius: 10px;
    overflow: auto;
    overflow-x: hidden;
}

img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    display: block;
    border-radius: 8px 8px 0px 0px;
    /* 2px smaller than viewer's border radius to avoid background color artifacts */
}

.model-wrapper {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 8px 8px 0px 0px;
    position: relative;
}

.model-wrapper.is-modal-active {
    aspect-ratio: auto;
    overflow: visible;
}

@media screen and (max-width: 700px) {
    img, .model-wrapper {
        display: none;
    }
}
</style>