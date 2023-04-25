<script setup lang="ts">
let elementViewerStyle: CSSStyleDeclaration | undefined = undefined;
function updateElem() {
    if (elementViewerStyle === undefined) {
        const elementViewerElement = document.getElementById("element-viewer")
        if (elementViewerElement != null ) {
            elementViewerStyle = elementViewerElement.style
        }
    }
}

// TS not happy w the way I wanted to do things
function enter() {
    if (elementViewerStyle === undefined) {
        updateElem();
        return;
    }
    elementViewerStyle.overflowX = "auto"
}
function leave() {
    if (elementViewerStyle === undefined) {
        updateElem();
        return;
    }
    elementViewerStyle.overflowX = "hidden"
}
</script>
<template>
    <Transition name="bounce" mode="out-in" appear @after-enter="enter" @before-leave="leave">
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
        transform: translateX(500px);
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
        transform: translateX(-500px);
    }
}
</style>