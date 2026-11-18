<!-- Mostly gemini'd because boring stuff -->
 
<script setup lang="ts">
import {
    isSettingsOpen,
    closeSettings,
    bgAnimationEnabled,
    setBgAnimation,
    modelPreviewDefault,
    setModelPreviewDefault,
    modelFallbackToImage,
    setModelFallbackToImage,
    showModelOnGrid,
    setShowModelOnGrid,
    modelControlsLayout,
    setModelControlsLayout,
} from '@/ts/manager/settings/SettingsManager';
import { darkTheme, setTheme } from '@/ts/utils/ThemeSetter';
import { onMounted, onUnmounted, watch } from 'vue';

function checkKeyDownClose(key: KeyboardEvent) {
    if (key.key === "Escape" && isSettingsOpen.value) {
        closeSettings();
    }
}

watch(isSettingsOpen, (isOpen) => {
    if (isOpen) {
        window.addEventListener('keydown', checkKeyDownClose);
        document.body.style.overflow = "hidden";
    } else {
        window.removeEventListener('keydown', checkKeyDownClose);
        document.body.style.overflow = "auto";
    }
});

onMounted(() => {
    if (isSettingsOpen.value) {
        window.addEventListener('keydown', checkKeyDownClose);
        document.body.style.overflow = "hidden";
    }
});

onUnmounted(() => {
    window.removeEventListener('keydown', checkKeyDownClose);
    document.body.style.overflow = "auto";
});
</script>

<template>
    <Transition name="settings-fade">
        <div v-if="isSettingsOpen" id="settingsPopupBackground" @click="closeSettings">
            <div id="settingsPopup" @click.stop="">
                <span id="settingsPopupCloseButton" title="Close" @click="closeSettings">&#215;</span>

                <h1>Settings</h1>

                <div class="settings-list">
                    
                    <div class="setting-row">
                        <div class="setting-labels">
                            <span class="setting-title">Theme</span>
                            <span class="setting-desc">Switch between dark and light appearance</span>
                        </div>
                        <div class="setting-actions">
                            <button
                                class="setting-btn"
                                :class="{ active: darkTheme }"
                                @click="setTheme('dark')"
                                title="Set dark theme"
                            >
                            Dark
                            </button>
                            <button
                                class="setting-btn"
                                :class="{ active: !darkTheme }"
                                @click="setTheme('light')"
                                title="Set light theme"
                            >
                            Light
                            </button>
                        </div>
                    </div>

                    <!-- Background animation setting -->
                    <div class="setting-row">
                        <div class="setting-labels">
                            <span class="setting-title">Background Animation</span>
                            <span class="setting-desc">Moving gradient effect on the background</span>
                        </div>
                        <div class="setting-actions">
                            <button
                                class="setting-btn"
                                :class="{ active: bgAnimationEnabled }"
                                @click="setBgAnimation(true)"
                                title="Enable background animation"
                            >
                                On
                            </button>
                            <button
                                class="setting-btn"
                                :class="{ active: !bgAnimationEnabled }"
                                @click="setBgAnimation(false)"
                                title="Disable background animation"
                            >
                                Off
                            </button>
                        </div>
                    </div>

                    <!-- 3D Model Preview setting -->
                    <div class="setting-row">
                        <div class="setting-labels">
                            <span class="setting-title">3D Model Previews</span>
                            <span class="setting-desc">Enable 3D model previews by default instead of thumbnails</span>
                        </div>
                        <div class="setting-actions">
                            <button
                                class="setting-btn"
                                :class="{ active: modelPreviewDefault }"
                                @click="setModelPreviewDefault(true)"
                                title="Enable 3D model previews by default"
                            >
                                On
                            </button>
                            <button
                                class="setting-btn"
                                :class="{ active: !modelPreviewDefault }"
                                @click="setModelPreviewDefault(false)"
                                title="Disable 3D model previews by default"
                            >
                                Off
                            </button>
                        </div>
                    </div>

                    <!-- Show Models on Grid sub-setting (nested under 3D Model Preview) -->
                    <div v-if="modelPreviewDefault" class="setting-row sub-setting">
                        <div class="setting-labels">
                            <span class="setting-title">Show Models on Grid</span>
                            <span class="setting-desc">Render 3D models in grid cards (resource heavy)</span>
                        </div>
                        <div class="setting-actions">
                            <button
                                class="setting-btn"
                                :class="{ active: showModelOnGrid }"
                                @click="setShowModelOnGrid(true)"
                                title="Enable 3D models on grid"
                            >
                                On
                            </button>
                            <button
                                class="setting-btn"
                                :class="{ active: !showModelOnGrid }"
                                @click="setShowModelOnGrid(false)"
                                title="Disable 3D models on grid"
                            >
                                Off
                            </button>
                        </div>
                    </div>

                    <!-- Image Fallback setting (nested under 3D Model Preview) -->
                    <div v-if="modelPreviewDefault" class="setting-row sub-setting">
                        <div class="setting-labels">
                            <span class="setting-title">Image Fallback</span>
                            <span class="setting-desc">Show image thumbnail if 3D model fails to load</span>
                        </div>
                        <div class="setting-actions">
                            <button
                                class="setting-btn"
                                :class="{ active: modelFallbackToImage }"
                                @click="setModelFallbackToImage(true)"
                                title="Enable image fallback"
                            >
                                On
                            </button>
                            <button
                                class="setting-btn"
                                :class="{ active: !modelFallbackToImage }"
                                @click="setModelFallbackToImage(false)"
                                title="Disable image fallback"
                            >
                                Off
                            </button>
                        </div>
                    </div>

                    <!-- 3D Movement Controls Layout (nested under 3D Model Preview) -->
                    <div v-if="modelPreviewDefault" class="setting-row sub-setting">
                        <div class="setting-labels">
                            <span class="setting-title">3D Controls Layout</span>
                            <span class="setting-desc">Keyboard layout for navigating 3D models</span>
                        </div>
                        <div class="setting-actions">
                            <button
                                class="setting-btn"
                                :class="{ active: modelControlsLayout === 'qwerty' }"
                                @click="setModelControlsLayout('qwerty')"
                                title="QWERTY (WASD + Arrows)"
                            >
                                QWERTY
                            </button>
                            <button
                                class="setting-btn"
                                :class="{ active: modelControlsLayout === 'azerty' }"
                                @click="setModelControlsLayout('azerty')"
                                title="AZERTY (ZQSD + Arrows)"
                            >
                                AZERTY
                            </button>
                            <button
                                class="setting-btn"
                                :class="{ active: modelControlsLayout === 'qwertz' }"
                                @click="setModelControlsLayout('qwertz')"
                                title="QWERTZ (WASD + Arrows)"
                            >
                                QWERTZ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.settings-fade-enter-active,
.settings-fade-leave-active {
    transition: opacity 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.settings-fade-enter-from,
.settings-fade-leave-to {
    opacity: 0;
}

.settings-fade-enter-active #settingsPopup {
    animation: popup-in 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.settings-fade-leave-active #settingsPopup {
    animation: popup-out 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);
}

@keyframes popup-in {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes popup-out {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    100% {
        transform: scale(0);
        opacity: 0;
    }
}
</style>

<style scoped>
#settingsPopupBackground {
    z-index: 9999;
    position: fixed;
    inset: 0;
    -webkit-backdrop-filter: blur(25px);
    backdrop-filter: blur(25px);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

#settingsPopup {
    width: min(85%, 520px);
    max-height: 80%;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 15px;
    position: relative;
    overflow: auto;
    padding: 10px 20px 25px 20px;
    box-sizing: border-box;
    text-align: center;
    color: var(--color-text);
}

#settingsPopupCloseButton {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 200%;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.195);
    padding: 0 12px;
    border-radius: 0 15px 0 15px;
    user-select: none;
    line-height: 1.2;
    transition: background-color 0.2s;
}

#settingsPopupCloseButton:hover {
    background-color: rgba(0, 0, 0, 0.4);
}

h1 {
    margin-top: 10px;
    margin-bottom: 25px;
}

.settings-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: 0 auto;
    max-width: 440px;
}

.setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.15);
    padding: 12px 16px;
    border-radius: 12px;
    gap: 12px;
}

.sub-setting {
    margin-left: 20px;
    border-left: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 0 12px 12px 0;
    background: rgba(0, 0, 0, 0.1);
}

.setting-labels {
    display: flex;
    flex-direction: column;
    text-align: left;
}

.setting-title {
    font-size: 1.05rem;
    font-weight: 600;
}

.setting-desc {
    font-size: 0.8rem;
    opacity: 0.75;
    margin-top: 3px;
}

.setting-actions {
    display: flex;
    gap: 6px;
    background: rgba(0, 0, 0, 0.2);
    padding: 3px;
    border-radius: 8px;
    flex-shrink: 0;
}

.setting-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 6px 12px;
    border: none;
    background: transparent;
    color: var(--color-text);
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    font-family: inherit;
    opacity: 0.6;
    transition: all 0.2s ease;
    user-select: none;
}

.setting-btn:hover {
    opacity: 0.9;
    background: rgba(255, 255, 255, 0.08);
}

.setting-btn.active {
    opacity: 1;
    background: rgba(255, 255, 255, 0.22);
    font-weight: bold;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.btn-icon {
    font-size: 0.95rem;
}

@media screen and (max-width: 480px) {
    .setting-row {
        flex-direction: column;
        align-items: flex-start;
    }
    .setting-actions {
        align-self: flex-end;
    }
}
</style>
