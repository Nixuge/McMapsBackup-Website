<script setup lang="ts">
import router from '@/router';

const props = defineProps<{
    text: string,
    href?: string,
    action?: Function
}>()

function onButtonClick() {
    if (props.href) {
        router.push(props.href)
    } else if (props.action) {
        props.action();
    }
}
</script>

<template>
    <div class="button">
        <button v-on:click="onButtonClick" v-text="text" />
    </div>
</template>
<style scoped>
.button {
    white-space: nowrap;
}

button {
    cursor: pointer;
    background: #ffffff30;
    border-radius: 5px;
    border: 0px;
    color: #fff;
    font-size: large;
}
</style>