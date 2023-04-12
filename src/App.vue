<script setup lang="ts">
import ElementViewer from './components/ElementViewer.vue'
import SearchBar from './components/searchbar/SearchBar.vue'
import SearchGrid from './components/grid/Grid.vue'

</script>
100% width:
  20vw sidebar
  3 columns 



<template>
  <SearchBar />
  <div id="grid_container">
    <ElementViewer id="first_child"/>
    <SearchGrid />
  </div>
</template>


<style>
#grid_container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 10px;
  padding-right: 10px;

  /* full height - margin heights - hotbar height */
  /* Aproximate but works quite well */
  /* + fuck css (why is height: 100% overflowing) */
  height: calc(100% - 40px - 2rem)
}
#first_child {
  /* flex: 25 0 25%; */
  /* flex-grow: 1; */
  /* margin-right: 10px; */
  /* height: 100%; */
  /* margin-bottom: 0px; */
  /* min-height: 100%; */
}

body, #app, html {
  background-color: #222;
  height: 100%;
  overflow: hidden;
}
</style>
