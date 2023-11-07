<script setup lang="ts">
import { removeInfoComponent as closePopup } from '@/ts/manager/info/InfoPopup';
import { onMounted, onUnmounted } from 'vue';
import { currentlyLoadedInfoComponent as CLIF } from '@/ts/manager/info/InfoPopup'


onMounted(() => {
    window.addEventListener('keydown', checkKeyDownClose)
    document.body.style.overflow = "hidden"
})
onUnmounted(() => {
    window.removeEventListener('keydown', checkKeyDownClose)
    document.body.style.overflow = "auto"
})

function checkKeyDownClose(key: KeyboardEvent) {
    if (key.key == "Escape")
        closePopup();
}

// TODO:
// Manage slot loading time w a spinner or smth (may not be needed w the preload on hover)

</script>

<template>
    <div id="infoPopupBackground" @click="closePopup">

        <Transition name="popup" mode="out-in" appear>
            <div id="infoPopup" @click.stop="">
                <span id="infoPopupCloseButton" @click="closePopup">&#215;</span>
                <CLIF />
            </div>
        </Transition>

    </div>
</template>

<style scoped>
.popup-enter-active {
    animation: popup-in .3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.popup-leave-active {
    animation: popup-out .3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

@keyframes popup-in {
    0% {
        scale: 0;
        opacity: 0;
    }
    100% {
        scale: 1;
        opacity: 1;
    }
}

@keyframes popup-out {
    0% {
        scale: 1;
        opacity: 1;
    }
    100% {
        scale: 0;
        opacity: 0;
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
    overflow: auto;
    padding: 0 10px 10px 10px; /* All except top as h1s already do that */
}
#infoPopupBackground {
    z-index: 5; /* On top of everything (1 should be enough but meh) */
    position: fixed;
    bottom: 0;
    left: 0;
    -webkit-backdrop-filter: blur(15px); /* 8y of support, still needs a prefix */
    backdrop-filter: blur(15px);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>