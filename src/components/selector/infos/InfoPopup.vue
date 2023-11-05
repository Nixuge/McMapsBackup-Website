<script setup lang="ts">
import { removeInfoComponent as closePopup } from '@/ts/manager/info/InfoPopup';
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
    window.addEventListener('keydown', checkKeyDownClose)
})
onUnmounted(() => {
    window.removeEventListener('keydown', checkKeyDownClose)
})

function checkKeyDownClose(key: KeyboardEvent) {
    if (key.key == "Escape")
        closePopup();
}

// TODO:
// Rework transition
// Manage slot loading time w a spinner or smth

</script>

<template>
    <div id="infoPopupBackground" @click="closePopup">
        <Transition name="slideup" mode="out-in" appear>
            <div id="infoPopup" @click.stop="">
                <span id="infoPopupCloseButton" @click="closePopup">&#215;</span>
                <slot></slot>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.slideup-enter-active {
    animation: slideup-in .5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.slideup-leave-active {
    animation: slideup-out .5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

@keyframes slideup-in {
    0% {
        transform: translateY(110%);
    }

    100% {
        transform: translateX(0);
    }
}

@keyframes slideup-out {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateY(-110%);
    }
}
</style>

<style scoped>
#infoPopupCloseButton {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 200%;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.195);
    padding: 0 12px 0 12px;
    border-radius: 0 15px 0 15px;
}

#infoPopup {
    width: 80%;
    height: 80%;
    background-color: rgba(0, 0, 0, 0.195);
    text-align: center;
    border-radius: 15px;
    position: relative;
}
#infoPopupBackground {
    z-index: 5; /* On top of everything (1 should be enough but meh) */
    position: absolute;
    bottom: 0;
    left: 0;
    backdrop-filter: blur(15px);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>