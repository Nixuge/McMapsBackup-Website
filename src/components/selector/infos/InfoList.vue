<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Info from './Info.vue'
import { currentlyLoadedInfoComponent as CLIF } from '@/ts/manager/info/InfoPopup'
import InfoPopup from './InfoPopup.vue';


let currentOffset = ref(0);
const offsetStep = 140;
let elem: HTMLElement;
let maxOffset: number;

onMounted(() => {
    elem = document.getElementById("infos") as HTMLElement;
    //40=margins, 140=calculating 1 step late so assuming we're on the step after
    maxOffset = elem.scrollHeight - 40 - 140; 
})

function canScrollUp() {
    return currentOffset.value != 0;
}
function canScrollDown() {
    // NOTE:
    // Seems like on Chrome on my laptop, maxOffset may have the wrong value.
    return !(maxOffset <= currentOffset.value);
}

function scrollInfos(up: boolean) {
    if ((up && !canScrollUp()) || (!up && !canScrollDown()))
        return;

    const offset = up ? -offsetStep : offsetStep;
    currentOffset.value = currentOffset.value + offset;

    elem?.scrollTo({
        top: currentOffset.value,
        behavior: "smooth"
    })
}
</script>

<template>
    <h1 id="infostitle"><span>Info board</span></h1>
    <div id="infoswrap">
        <div id="infos" class="fade">
            <Info title="Aide pour la recherche" :component="() => import('./popups/AideRecherchePopup.vue')" :empty="true" />
            <Info title="Search Help" :component="() => import('./popups/SearchHelpPopup.vue')" :empty="true" />
            <Info title="DMCA" :component="() => import('./popups/DMCAPopup.vue')" :empty="true" />
            <Info title="API Help" :component="() => import('./popups/APIHelpPopup.vue')" :empty="true" />
            <Info title="Mineplex" :component="() => import('./popups/MineplexPopup.vue')">Some info about Mineplex's parsing, stats & contributors</Info>

            <Info title="Funcraft" :component="() => import('./popups/FuncraftPopup.vue')">Le site et ses db (joueurs, rangs, forum), stats de la sauvegarde</Info>
        </div>
        <div id="infoscroller">
            <div id="scrollUp" @click="scrollInfos(true)">^</div>
            <div id="scrollDown" @click="scrollInfos(false)">^</div>
        </div>
    </div>
    <InfoPopup v-if="CLIF != undefined" key="infopopup" ><CLIF /></InfoPopup>
</template>

<style scoped>
    #infostitle {
        text-align: center;
        margin-bottom: 0;
    }
    #infostitle > span {
        width: fit-content;
        background: rgba(0, 0, 0, 0.195);
        border-radius: 10px 10px 0 0;
        padding: 5px 30px 0 30px;
    }
    #infoswrap {
        width: 80%;
        margin: auto;
        background: rgba(0, 0, 0, 0.195);
        display: flex;
        border-radius: 15px;
    }   
    #infos {
        width: 95%;
        padding-top: 20px;
        padding-bottom: 20px;
        display: flex;
        flex-wrap: wrap;
        overflow-x: auto;
        max-height: 120px;
        justify-content: center;
        overflow: hidden;
    }
    #infoscroller {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        vertical-align: center;
    }
    #infoscroller > * {
        background: rgba(0, 0, 0, 0.195);
        padding-left: 5px;
        padding-right: 5px;
        border-radius: 3px;
        font-size: 120%;
        user-select: none;
    }
    /* Not sure if I should keep those here or migrate them to a var in the js for cleaner css */
    #scrollDown {
        transform: rotate(180deg);
        margin-top: 5px;
        color: v-bind("canScrollDown() ? '#fff' : '#888'");
        cursor: v-bind("canScrollDown() ? 'pointer' : 'not-allowed'");
    }
    #scrollUp {
        color: v-bind("canScrollUp() ? '#fff' : '#888'");
        cursor: v-bind("canScrollUp() ? 'pointer' : 'not-allowed'");
    }
</style>