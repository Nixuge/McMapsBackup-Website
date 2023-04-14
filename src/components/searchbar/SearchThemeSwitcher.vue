<script setup lang="ts">
import { switchTheme, themeIconClass } from '@/ts/utils/ThemeSetter';
</script>

<template>
    <div>
    <i :class="themeIconClass" @click="switchTheme()"></i>
    </div>
</template>

<style scoped>
    div {
        width: 25px;
    }
</style>