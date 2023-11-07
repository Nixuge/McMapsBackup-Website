<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import Info from './Info.vue'
import { currentlyLoadedInfoComponent as CLIF } from '@/ts/manager/info/InfoPopup'
import InfoPopup from './InfoPopup.vue';


let currentOffset = ref(0);
const offsetStep = 140;
let elem: HTMLElement;
let maxOffset = ref(0);

onMounted(() => {
    elem = document.getElementById("infos") as HTMLElement;
    updateOffsets();

    window.addEventListener("resize", updateOffsets); 

    // @ts-ignore
    if (window.chrome) {
        // Double issue on chrome(ium?):
        // - if you get the scrollHeight from onMounted directly you're gonna get 0.
        // - if you get the srollHeight after a small timeout (10-100ms) it returns the height as if there was only a single column
        //   (like on vertical screens), so here scrollHeight would always get you 880.
        // - if you wait long enough (here 500ms), you DO get the proper scrollHeight.
        //
        // Neither Firefox nor Safari suffer from this issue.
        // The 10-100ms wrong height seem to be because of a delay before loading the proper layout,
        // where for a sec the servers appear vertically (as if the wrapper had width: min-content instead of its current fit-content)
        // and the info board appears smaller with only 1 element on the left.
        // Not much I can do to fix apart from reworking the layout.
        setTimeout(() => {
            updateOffsets();
        }, 500);
    }
})

onUnmounted(() => {
    window.removeEventListener("resize", updateOffsets); 
})

function updateOffsets() {
    //40=margins, 140=calculating 1 step late so assuming we're on the step after
    maxOffset.value = elem.scrollHeight - 40 - 140;
    
    // Handles both reloads & resizes
    if (elem.scrollTop > maxOffset.value) {
        currentOffset.value = maxOffset.value;
        scrollToCurrentOffset();
    } else {
        currentOffset.value = elem.scrollTop;
    }    
}


function canScrollUp() {
    return currentOffset.value != 0;
}
function canScrollDown() {
    return !(maxOffset.value <= currentOffset.value);
}

function scrollInfos(up: boolean) {
    if ((up && !canScrollUp()) || (!up && !canScrollDown()))
        return;

    const offset = up ? -offsetStep : offsetStep;
    currentOffset.value = currentOffset.value + offset;

    scrollToCurrentOffset();
}
function scrollToCurrentOffset() {
    elem.scrollTo({
        top: currentOffset.value,
        behavior: "smooth"
    });
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
    <Transition name="opacity" mode="out-in" appear>
        <InfoPopup v-if="CLIF != undefined" key="infopopup" />
    </Transition>
</template>

<style scoped>
/* Note:
Due to an annoying vue bug? the Transition inside of the InfoPopup doesn't seem to trigger
AT ALL when disappearing.
This one works just fine, and even when I add a delay to it (to let time for the
other transition to play) it just doesn't.
So now leaving it as is, honestly looks pretty nice with a fade for disappearing
*/
.opacity-enter-active {
    animation: opacity-in .4s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.opacity-leave-active {
    animation: opacity-out .2s cubic-bezier(0.075, 0.82, 0.165, 1);
}

@keyframes opacity-in {
    0% {
        opacity: 0;
    }
    25% {
        opacity: 1;
    }
    100% {
        opacity: 1;
    }
}

@keyframes opacity-out {
    0% {
        opacity: 1;
    }
    /* 75% {
        opacity: 1;
    } */
    100% {
        opacity: 0;
    }
}
</style>

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
        max-width: 80%;
        width: fit-content;
        margin: auto;
        background: rgba(0, 0, 0, 0.195);
        display: flex;
        border-radius: 15px;
    }   
    #infos {
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
        margin-right: 10px;
        margin-left: 10px;
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