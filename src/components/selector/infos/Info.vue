<script setup lang="ts">
import { AsyncComponentLoader, defineAsyncComponent } from 'vue';
import { loadInfoComponent, currentlyLoadedInfoComponent as CLIF } from '@/ts/manager/info/InfoPopup'

const props = defineProps<{
    title: string,
    component: AsyncComponentLoader,
    empty?: boolean
}>()

function loadComponent() {
    loadInfoComponent(props.component)
}
</script>

<template>
    <div class="info" @click="loadComponent">
        <h1>{{ title }}</h1>
        <slot />
        
    </div>
</template>

<style scoped>
.info {
    padding: 10px;
    margin-left: 1%;
    margin-right: 1%;
    background: rgba(0, 0, 0, 0.195);
    width: 27%;
    border-radius: 15px;
    cursor: pointer;
    margin-bottom: 20px;
    height: 100px;
    text-align: center;
    overflow: auto;
}
h1 {
    margin-top: v-bind("empty === true ? '30px' : '0'");
    margin-bottom: 10px;
}
</style>