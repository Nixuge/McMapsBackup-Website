<script setup lang="ts">

let elementViewerStyle: CSSStyleDeclaration | undefined = undefined;

// Technically can't crash, as this is called only when element-viewer is already mounted 
function changeOverflowX(overflow: string) {
    if (elementViewerStyle === undefined)
        elementViewerStyle = document.getElementById("element-viewer")?.style;
    // @ts-ignore
    elementViewerStyle.overflowX = overflow;
}

let runningAnimations = 0;
function enter() {
    runningAnimations--;
    if (runningAnimations === 0)
        changeOverflowX("auto")
    
}
function leave() {
    runningAnimations++
    changeOverflowX("hidden")
}
</script>
<template>
    <Transition name="bounce" mode="out-in" 
    @after-enter="enter" @before-leave="leave"
    appear>
        <slot></slot>
    </Transition>
</template>

<style>
.bounce-enter-active {
    animation: bounce-in .2s;
}

.bounce-leave-active {
    animation: bounce-out .2s;
}

@keyframes bounce-in {
    0% {
        transform: translateX(110%);
    }

    100% {
        transform: translateX(0);
    }
}

@keyframes bounce-out {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-110%);
    }
}
</style>