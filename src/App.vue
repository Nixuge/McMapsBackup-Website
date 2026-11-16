<script setup lang="ts">
import SettingsButton from '@/components/settings/SettingsButton.vue';
import SettingsPopup from '@/components/settings/SettingsPopup.vue';
</script>

<template>
  <SettingsButton />
  <router-view />
  <SettingsPopup />
</template>
