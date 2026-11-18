import { ref } from "vue";
import { removeInfoComponent } from "../info/InfoPopup";


export const isSettingsOpen = ref(false);

export function openSettings() {
    removeInfoComponent();
    isSettingsOpen.value = true;
}
export function closeSettings() {
    isSettingsOpen.value = false;
}
export function toggleSettings() {
    if (isSettingsOpen.value) {
        closeSettings();
    } else {
        openSettings();
    }
}


export const bgAnimationEnabled = ref(localStorage.getItem("bgAnimation") !== "false");
export function applyBgAnimation() {
    document.body?.classList.toggle("no-bg-animation", !bgAnimationEnabled.value);
}
export function setBgAnimation(val: boolean) {
    bgAnimationEnabled.value = val;
    localStorage.setItem("bgAnimation", String(val));
    applyBgAnimation();
}


export const modelPreviewDefault = ref(localStorage.getItem("modelPreviewDefault") !== "false");
export function setModelPreviewDefault(val: boolean) {
    modelPreviewDefault.value = val;
    localStorage.setItem("modelPreviewDefault", String(val));
}

export const modelFallbackToImage = ref(localStorage.getItem("modelFallbackToImage") !== "false");
export function setModelFallbackToImage(val: boolean) {
    modelFallbackToImage.value = val;
    localStorage.setItem("modelFallbackToImage", String(val));
}


export const showModelOnGrid = ref(localStorage.getItem("showModelOnGrid") === "true");
export function setShowModelOnGrid(val: boolean) {
    showModelOnGrid.value = val;
    localStorage.setItem("showModelOnGrid", String(val));
}


export type KeyboardLayout = 'qwerty' | 'azerty' | 'qwertz';
export const modelControlsLayout = ref<KeyboardLayout>(
    (localStorage.getItem("modelControlsLayout") as KeyboardLayout) || "qwerty"
);
export function setModelControlsLayout(val: KeyboardLayout) {
    modelControlsLayout.value = val;
    localStorage.setItem("modelControlsLayout", val);
}


if (typeof document !== "undefined") {
    if (document.body) {
        applyBgAnimation();
    } else {
        window.addEventListener("DOMContentLoaded", applyBgAnimation, { once: true });
    }
}
