<script setup lang="ts">
defineProps<{
  name: string,
  options: Array<string>
}>()
</script>

<template>
    <div class="selector"> 
        <select :name="name"> 
            <option v-for="option in options" :value="option" v-text="option"></option>
        </select>
        <!-- <p>imagine a searchbar here w selector for game & search field</p> -->
    </div>
</template>

<style scoped>
/* .selector {
    

} */
</style>