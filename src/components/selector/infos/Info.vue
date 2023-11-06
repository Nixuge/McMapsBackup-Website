<script setup lang="ts">
import { AsyncComponentLoader } from 'vue';
import { loadInfoComponent, preloadInfoComponent } from '@/ts/manager/info/InfoPopup'

defineProps<{
    title: string,
    component: AsyncComponentLoader,
    empty?: boolean
}>()
</script>

<template>
    <div class="info" @click="loadInfoComponent(component)" @mouseover="preloadInfoComponent(component)">
        <div class="infocontent">
            <h1>{{ title }}</h1>
            <slot />
        </div>
    </div>
</template>

<style scoped>
@media screen and (max-width: 700px) {
    .info {
        width: 100%;
    }
}

@media screen and (min-width: 701px) {
    .info {
        width: 44%;
    }
}

@media screen and (min-width: 1250px) {
    .info {
        width: 30%;
    }
}

.info {
    max-width: 400px;
    padding: 10px;
    margin-left: 10px;
    background: rgba(0, 0, 0, 0.195);
    border-radius: 15px;
    cursor: pointer;
    margin-bottom: 20px;
    height: 100px;
    text-align: center;
    overflow: auto;

    display: flex;
    align-items: center;
    justify-content: center;
}
h1 {
    margin: 0;
}
</style>