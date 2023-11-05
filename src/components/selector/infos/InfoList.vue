<script setup lang="ts">
import Info from './Info.vue'

let currentOffset = 0;
const offsetStep = 140;

function moveValid(elem: HTMLElement, up: boolean) {
    //40=margins, 140=calculating 1 step late so assuming we're on the step after
    const elemMaxScroll = elem.scrollHeight - 40 - 140; 

    if (currentOffset == 0 && up)
        return false;
    
    if (elemMaxScroll <= currentOffset && !up)
        return false;
    
    return true;
}

function scrollInfos(up: boolean) {
    const elem = document.getElementById("infos") as HTMLElement;
    
    if (!moveValid(elem, up))
        return;

    const offset = up ? -offsetStep : offsetStep;
    
    currentOffset = currentOffset + offset;

    elem?.scrollTo({
        top: currentOffset,
        behavior: "smooth"
    })
}

</script>

<template>
    <div id="infoswrap">
        <div id="infos" class="fade">
            <Info title="DMCA1">aaa</Info>
            <Info title="DMCA2">aaa</Info>
            <Info title="DMCA3">aaa</Info>
            <Info title="DMCA4">aaa</Info>
            <Info title="DMCA5">aaa</Info>
            <Info title="DMCA6">aaa</Info>
            <Info title="DMCA7">aaa</Info>
            <Info title="DMCA8">aaa</Info>
            <Info title="DMCA9">aaa</Info>
            <Info title="DMCA10">aaa</Info>
        </div>
        <div id="infoscroller">
            <div id="scrollUp" @click="scrollInfos(true)">^</div>
            <div id="scrollDown" @click="scrollInfos(false)" style="align-self: right;">^</div>
        </div>
    </div>
</template>

<style scoped>
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
        cursor: pointer;
        user-select: none;
    }
    #scrollDown {
        transform: rotate(180deg);
        margin-top: 5px;
    }
</style>