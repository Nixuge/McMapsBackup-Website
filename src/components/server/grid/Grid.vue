<script setup lang="ts">
import GridElement from './GridElement.vue'
import PageSelector from './PageSelector.vue'
import { SearchEngine as se } from '@/ts/manager/SearchEngine';
import { PageManager as pm } from '@/ts/manager/PageManager';

</script>

<!-- 
    Todo?
    Figure out how to use a TransitionGroup here.
    Problem is that I can't use absolute positioning here, so elements
    often overlap unless I use precise annoying animations.

    Edit: actually really really really annoying due to the fact that you
    can't use the "display" properties on animations.
    So if I just want to disable the leaving one's display at 49% and enable
    the appearing one at 51% I can't.
    Setting height/margin/padding to 0 "works" but still leaves a small gap.
    
    For now going along with just the "fade" css class in GridElement
-->

<template>
    <div class="grid_wrapper fade">
        <!-- <h1 class="info"><a href="https://discord.gg/RecgHVxKuk">Discord</a>  <router-link to="/contribute">Help contribute to missing screenshots</router-link>  <router-link to="/dmca" style="float:right">DMCA</router-link></h1> -->
        <div class="grid">
            <!-- <TransitionGroup name="cc" appear> -->
            <GridElement v-for="current_map in se.currentMapsPages[pm.page.value]" :map="current_map"
                :key="current_map.id" />
                <!-- </TransitionGroup> -->
        </div>
        <PageSelector />
    </div>
</template>


<style scoped>
.grid_wrapper {
    /* Needed to anchor at bottom of the page, see PageSelector.vue */
    display: flex;
    flex-direction: column;
    /* Padding so that the PageSelector has some padding */
    padding-bottom: 5px;

    background-color: var(--dark-transparent);
    border-radius: 10px;
    width: 100%;
    overflow: auto;
}

.grid {
    display: grid;
    /* grid-template-columns: 1fr 1fr 1fr; */
    grid-template-rows: 1fr 1fr 1fr;
    margin: 15px;
    grid-gap: 20px;
    justify-items: center;
    align-items: center;
}

@media screen and (max-width: 849px) {
    .grid {
        grid-template-columns: 1fr;
    }
}

@media screen and (min-width: 850px) {
    .grid {
        grid-template-columns: 1fr 1fr;
    }
}

@media screen and (min-width: 1250px) {
    .grid {
        grid-template-columns: 1fr 1fr 1fr;
    }
}

a,
a:visited {
    color: #fff
}

.info {
    padding: 0;
    margin: 0;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 5px;
}

/* .cc-enter-active {
    animation: cc-in .5s;
}

.cc-leave-active {
    animation: cc-out .5s;
}

@keyframes cc-in {
    0% {
        height: 0;
        width: 0;
        padding: 0;
        margin: 0;
        opacity: 0;
    }
    60% {
        height: 0;
        width: 0;
        padding: 0;
        margin: 0;
        opacity: 0;
    }

    100% {
        opacity: 1;
        display: block;
    }
}

@keyframes cc-out {
    0% {
        opacity: 1;
    }

    40% {
        opacity: 0;
        height: 0;
        width: 0;
        padding: 0;
        margin: 0;
        display: none;
    }
    41% {
        width: 0;
        padding: 0;
        margin: 0;
    }

    100% {
        opacity: 0;
        height: 0;
        width: 0;
        padding: 0;
        margin: 0;
        display: none;
    }
} */
</style>