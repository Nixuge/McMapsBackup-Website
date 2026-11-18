<!-- Gemini'd piece of shit. Not yet fully understood but working well enough. -->

<template>
  <div
    class="mc-model-root"
    :class="{ 'is-modal': isModalOpen }"
    @click="isModalOpen ? closeModal() : undefined"
  >
    <!-- 3D Flip Card Container: True 3D perspective -->
    <div
      ref="containerRef"
      class="mc-flip-card"
      :class="{ 'modal-card': isModalOpen, 'is-flipped': isFlipped }"
      @click.stop=""
    >
      <!-- ================= FRONT FACE (3D MODEL) ================= -->
      <div class="mc-card-face mc-card-front">
        <div class="mc-face-content">
          <div ref="threeCanvasHostRef" class="mc-canvas-host"></div>

          <div v-if="loading" class="mc-model-overlay">Loading 3D preview...</div>
          <div v-else-if="errorMessage" class="mc-model-overlay mc-model-error">
            {{ errorMessage }}
          </div>

          <!-- Dynamic 3D lighting shadow overlay during flip -->
          <div class="mc-card-shading" :class="{ 'is-shaded': isFlipped }"></div>

          <!-- Front Face Interactive Controls (Hidden if settings popup is open) -->
          <template v-if="interactiveControls && !isSettingsOpen">
            <!-- Top-Left: Flip to 2D Screenshot -->
            <div v-if="imageUrl && !loading && !errorMessage" class="mc-card-corner mc-corner-top-left">
              <button
                class="mc-ctrl-btn mc-flip-btn"
                title="Flip card to 2D Screenshot"
                aria-label="Flip card to 2D Screenshot"
                @click.stop="toggleFlip"
              >
                <!-- Flip circular arrow icon -->
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mc-icon">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                </svg>
                <span class="mc-flip-badge">2D</span>
              </button>
            </div>

            <!-- Top-Right: Expand button (preview) OR Modal Close '×' (modal) -->
            <div v-if="!isModalOpen && !loading && !errorMessage" class="mc-card-corner mc-corner-top-right">
              <button
                class="mc-ctrl-btn"
                title="Expand 3D Popup View"
                aria-label="Expand 3D Popup View"
                @click.stop="openModal"
              >
                <!-- Expand Icon -->
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mc-icon">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                </svg>
              </button>
            </div>
            <span
              v-else-if="isModalOpen"
              class="mc-modal-close-button"
              title="Close (Esc)"
              aria-label="Close"
              @click.stop="closeModal"
            >
              &#215;
            </span>

            <!-- Bottom-Left Navigation D-Pad & Elevation: ONLY visible in popup modal when not flipped -->
            <div
              v-if="isModalOpen && !loading && !errorMessage"
              class="mc-nav-overlay"
            >
              <div class="mc-dpad">
                <button
                  class="mc-dpad-btn mc-dpad-up"
                  :class="{ active: activeMovement.forward }"
                  title="Move Forward"
                  aria-label="Move Forward"
                  @pointerdown.prevent="startMove('forward')"
                  @pointerup.prevent="stopMove('forward')"
                  @pointerleave.prevent="stopMove('forward')"
                  @pointercancel.prevent="stopMove('forward')"
                >
                  ▲
                </button>
                <div class="mc-dpad-middle">
                  <button
                    class="mc-dpad-btn mc-dpad-left"
                    :class="{ active: activeMovement.left }"
                    title="Move Left"
                    aria-label="Move Left"
                    @pointerdown.prevent="startMove('left')"
                    @pointerup.prevent="stopMove('left')"
                    @pointerleave.prevent="stopMove('left')"
                    @pointercancel.prevent="stopMove('left')"
                  >
                    ◀
                  </button>
                  <!-- Center button: Reset camera with SVG circular arrow 'a' -->
                  <button
                    class="mc-dpad-btn mc-dpad-center"
                    title="Reset Camera (Screenshot Angle)"
                    aria-label="Reset Camera"
                    @click.stop="resetCamera"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="mc-center-icon">
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                      <path d="M3 3v5h5" />
                    </svg>
                  </button>
                  <button
                    class="mc-dpad-btn mc-dpad-right"
                    :class="{ active: activeMovement.right }"
                    title="Move Right"
                    aria-label="Move Right"
                    @pointerdown.prevent="startMove('right')"
                    @pointerup.prevent="stopMove('right')"
                    @pointerleave.prevent="stopMove('right')"
                    @pointercancel.prevent="stopMove('right')"
                  >
                    ▶
                  </button>
                </div>
                <button
                  class="mc-dpad-btn mc-dpad-down"
                  :class="{ active: activeMovement.backward }"
                  title="Move Backward"
                  aria-label="Move Backward"
                  @pointerdown.prevent="startMove('backward')"
                  @pointerup.prevent="stopMove('backward')"
                  @pointerleave.prevent="stopMove('backward')"
                  @pointercancel.prevent="stopMove('backward')"
                >
                  ▼
                </button>
              </div>

              <div class="mc-elev-controls">
                <button
                  class="mc-dpad-btn mc-elev-btn"
                  :class="{ active: activeMovement.up }"
                  title="Move Up / Ascend (Space)"
                  aria-label="Move Up"
                  @pointerdown.prevent="startMove('up')"
                  @pointerup.prevent="stopMove('up')"
                  @pointerleave.prevent="stopMove('up')"
                  @pointercancel.prevent="stopMove('up')"
                >
                  +
                </button>
                <button
                  class="mc-dpad-btn mc-elev-btn"
                  :class="{ active: activeMovement.down }"
                  title="Move Down / Descend (Shift)"
                  aria-label="Move Down"
                  @pointerdown.prevent="startMove('down')"
                  @pointerup.prevent="stopMove('down')"
                  @pointerleave.prevent="stopMove('down')"
                  @pointercancel.prevent="stopMove('down')"
                >
                  −
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- ================= BACK FACE (2D SCREENSHOT) ================= -->
      <div
        class="mc-card-face mc-card-back"
        @click="toggleFlip"
      >
        <div class="mc-face-content">
          <div class="mc-image-container">
            <img v-if="imageUrl" :src="imageUrl" class="mc-card-image" alt="Map screenshot" />
          </div>

          <!-- Dynamic 3D lighting shadow overlay during flip -->
          <div class="mc-card-shading" :class="{ 'is-shaded': !isFlipped }"></div>

          <!-- Back Face Interactive Controls (Hidden if settings popup is open) -->
          <template v-if="interactiveControls && !isSettingsOpen">
            <!-- Top-Left: Flip to 3D Model -->
            <div class="mc-card-corner mc-corner-top-left">
              <button
                class="mc-ctrl-btn mc-flip-btn"
                title="Flip card to 3D Model"
                aria-label="Flip card to 3D Model"
                @click.stop="toggleFlip"
              >
                <!-- Flip circular arrow icon -->
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mc-icon">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                </svg>
                <span class="mc-flip-badge">3D</span>
              </button>
            </div>

            <!-- Top-Right: Expand button (preview) OR Modal Close '×' (modal) -->
            <div v-if="!isModalOpen" class="mc-card-corner mc-corner-top-right">
              <button
                class="mc-ctrl-btn"
                title="Expand Popup View"
                aria-label="Expand Popup View"
                @click.stop="openModal"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mc-icon">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                </svg>
              </button>
            </div>
            <span
              v-else
              class="mc-modal-close-button"
              title="Close (Esc)"
              aria-label="Close"
              @click.stop="closeModal"
            >
              &#215;
            </span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  applyScreenshotCameraPose,
  type McBinParsedModel,
} from '@/ts/utils/McBinLoader';
import { loadModelFromCacheOrUrl } from '@/ts/manager/models/ModelCache';
import { modelControlsLayout, isSettingsOpen } from '@/ts/manager/settings/SettingsManager';

export interface McModelProps {
  /** URL to the exported .mcbin file */
  src: string;
  /** Optional fallback 2D screenshot image URL for card flip */
  imageUrl?: string;
  /** Vertical FOV in degrees (Minecraft default is 70) */
  fov?: number;
  /** Slowly rotate around the model */
  autoRotate?: boolean;
  /** Auto-rotation speed */
  autoRotateSpeed?: number;
  /** Canvas background hex color, or null for transparent */
  backgroundColor?: string | null;
  /** Show on-screen interactive navigation and fullscreen controls */
  interactiveControls?: boolean;
}

const props = withDefaults(defineProps<McModelProps>(), {
  fov: 70,
  autoRotate: false,
  autoRotateSpeed: 1.5,
  backgroundColor: '#111622',
  interactiveControls: true,
});

const emit = defineEmits<{
  (e: 'loaded', payload: {
    quadCount: number;
    yaw: number;
    pitch: number;
    position: THREE.Vector3;
    size: THREE.Vector3;
  }): void;
  (e: 'error', error: Error): void;
  (e: 'modal-change', isOpen: boolean): void;
}>();

const containerRef = ref<HTMLDivElement | null>(null);
const threeCanvasHostRef = ref<HTMLDivElement | null>(null);
const loading = ref<boolean>(true);
const errorMessage = ref<string | null>(null);
const isModalOpen = ref<boolean>(false);
const isFlipped = ref<boolean>(false);

function toggleModal(): void {
  isModalOpen.value = !isModalOpen.value;
  emit('modal-change', isModalOpen.value);
}

function closeModal(): void {
  isModalOpen.value = false;
  emit('modal-change', false);
}

function openModal(): void {
  isModalOpen.value = true;
  emit('modal-change', true);
}

function toggleFlip(): void {
  isFlipped.value = !isFlipped.value;
}

watch(isModalOpen, (isOpen) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }
});

watch(isSettingsOpen, (isOpen) => {
  if (isOpen) {
    handleBlur();
  }
});

// Active movement state
type MoveDirection = 'forward' | 'backward' | 'left' | 'right' | 'up' | 'down';
const activeMovement = ref<Record<MoveDirection, boolean>>({
  forward: false,
  backward: false,
  left: false,
  right: false,
  up: false,
  down: false,
});

function startMove(dir: MoveDirection) {
  activeMovement.value[dir] = true;
}

function stopMove(dir: MoveDirection) {
  activeMovement.value[dir] = false;
}

// Keyboard navigation
function isTypingInInput(e: KeyboardEvent): boolean {
  const target = e.target as HTMLElement | null;
  if (!target) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
}

function handleKeyDown(e: KeyboardEvent): void {
  // If settings modal is open, ignore all 3D controls & keys
  if (isSettingsOpen.value) return;

  // If modal is open, Escape closes it
  if (e.key === 'Escape' && isModalOpen.value) {
    closeModal();
    e.preventDefault();
    return;
  }

  // If flipped to 2D image, don't move 3D camera
  if (isFlipped.value) return;
  if (isTypingInInput(e)) return;

  const layout = modelControlsLayout.value;
  const key = e.key.toLowerCase();
  let handled = false;

  // Forward
  if (key === 'arrowup' || (layout === 'azerty' ? key === 'z' : key === 'w')) {
    activeMovement.value.forward = true;
    handled = true;
  }
  // Backward
  if (key === 'arrowdown' || key === 's') {
    activeMovement.value.backward = true;
    handled = true;
  }
  // Left
  if (key === 'arrowleft' || (layout === 'azerty' ? key === 'q' : key === 'a')) {
    activeMovement.value.left = true;
    handled = true;
  }
  // Right
  if (key === 'arrowright' || key === 'd') {
    activeMovement.value.right = true;
    handled = true;
  }
  // Up / Ascend
  if (key === ' ' || key === 'space' || key === 'e' || key === 'pageup') {
    activeMovement.value.up = true;
    handled = true;
  }
  // Down / Descend
  if (key === 'shift' || key === 'c' || key === 'pagedown') {
    activeMovement.value.down = true;
    handled = true;
  }

  if (handled && (e.key.startsWith('Arrow') || e.key === ' ')) {
    e.preventDefault();
  }
}

function handleKeyUp(e: KeyboardEvent): void {
  if (isSettingsOpen.value) return;

  const layout = modelControlsLayout.value;
  const key = e.key.toLowerCase();

  if (key === 'arrowup' || (layout === 'azerty' ? key === 'z' : key === 'w')) {
    activeMovement.value.forward = false;
  }
  if (key === 'arrowdown' || key === 's') {
    activeMovement.value.backward = false;
  }
  if (key === 'arrowleft' || (layout === 'azerty' ? key === 'q' : key === 'a')) {
    activeMovement.value.left = false;
  }
  if (key === 'arrowright' || key === 'd') {
    activeMovement.value.right = false;
  }
  if (key === ' ' || key === 'space' || key === 'e' || key === 'pageup') {
    activeMovement.value.up = false;
  }
  if (key === 'shift' || key === 'c' || key === 'pagedown') {
    activeMovement.value.down = false;
  }
}

function handleBlur(): void {
  activeMovement.value.forward = false;
  activeMovement.value.backward = false;
  activeMovement.value.left = false;
  activeMovement.value.right = false;
  activeMovement.value.up = false;
  activeMovement.value.down = false;
}

let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let controls: OrbitControls | null = null;
let currentModel: McBinParsedModel | null = null;
let resizeObserver: ResizeObserver | null = null;
let animationFrameId: number | null = null;
let abortController: AbortController | null = null;

const MOVE_SPEED = 30; // blocks per second

function updateMovement(delta: number): void {
  if (!camera || !controls || !currentModel || isFlipped.value || isSettingsOpen.value) return;

  const { forward, backward, left, right, up, down } = activeMovement.value;
  if (!forward && !backward && !left && !right && !up && !down) return;

  // Calculate forward vector parallel to ground plane
  const fwd = new THREE.Vector3();
  camera.getWorldDirection(fwd);
  fwd.y = 0;
  if (fwd.lengthSq() < 0.0001) {
    fwd.set(0, 0, -1);
  } else {
    fwd.normalize();
  }

  // Right vector perpendicular to forward and world up
  const upVec = new THREE.Vector3(0, 1, 0);
  const rgt = new THREE.Vector3().crossVectors(fwd, upVec).normalize();

  const moveDir = new THREE.Vector3();
  if (forward) moveDir.add(fwd);
  if (backward) moveDir.sub(fwd);
  if (right) moveDir.add(rgt);
  if (left) moveDir.sub(rgt);
  if (up) moveDir.add(upVec);
  if (down) moveDir.sub(upVec);

  if (moveDir.lengthSq() > 0.0001) {
    moveDir.normalize();
    const distance = MOVE_SPEED * delta;
    camera.position.addScaledVector(moveDir, distance);
    controls.target.addScaledVector(moveDir, distance);
  }
}

function initThree(): void {
  const container = containerRef.value;
  const canvasHost = threeCanvasHostRef.value;
  if (!container || !canvasHost) return;

  const width = container.clientWidth || 600;
  const height = container.clientHeight || 400;

  scene = new THREE.Scene();
  if (props.backgroundColor) {
    scene.background = new THREE.Color(props.backgroundColor);
  }

  camera = new THREE.PerspectiveCamera(props.fov, width / height, 0.1, 2000);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: !props.backgroundColor,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  canvasHost.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffffff, 0.75);
  const sunMain = new THREE.DirectionalLight(0xffffff, 0.85);
  sunMain.position.set(60, 120, 80);
  const sunFill = new THREE.DirectionalLight(0xffffff, 0.35);
  sunFill.position.set(-60, -40, -80);
  scene.add(ambient, sunMain, sunFill);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.autoRotate = props.autoRotate;
  controls.autoRotateSpeed = props.autoRotateSpeed;

  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (!renderer || !camera) return;
      const { width: w, height: h } = entry.contentRect;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    }
  });
  resizeObserver.observe(container);

  let lastTime = performance.now();
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    const now = performance.now();
    const delta = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    updateMovement(delta);

    if (controls) controls.update();
    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  };
  animate();
}

async function loadModel(url: string): Promise<void> {
  if (!url || !scene || !camera || !controls) return;

  if (abortController) {
    abortController.abort();
  }
  abortController = new AbortController();

  loading.value = true;
  errorMessage.value = null;

  if (currentModel) {
    scene.remove(currentModel.mesh);
    currentModel.dispose();
    currentModel = null;
  }

  try {
    const parsed = await loadModelFromCacheOrUrl(url, abortController.signal);
    currentModel = parsed;
    scene.add(parsed.mesh);

    resetCamera();
    loading.value = false;

    emit('loaded', {
      quadCount: parsed.quadCount,
      yaw: parsed.cameraPose.yaw,
      pitch: parsed.cameraPose.pitch,
      position: parsed.cameraPose.position.clone(),
      size: parsed.size,
    });
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === 'AbortError') return;
    const error = err instanceof Error ? err : new Error(String(err));
    errorMessage.value = error.message;
    loading.value = false;
    emit('error', error);
  }
}

/** Snaps the camera back to the exact screenshot position and angle */
function resetCamera(): void {
  if (!camera || !controls || !currentModel) return;
  const target = applyScreenshotCameraPose(camera, currentModel);
  controls.target.copy(target);
  controls.update();
}

defineExpose({
  resetCamera,
  toggleModal,
  openModal,
  closeModal,
  toggleFlip,
});

watch(
  () => props.src,
  (newSrc) => {
    isFlipped.value = false;
    loadModel(newSrc);
  }
);

watch(
  () => props.fov,
  (newFov) => {
    if (!camera) return;
    camera.fov = newFov;
    camera.updateProjectionMatrix();
  }
);

watch(
  () => props.backgroundColor,
  (newColor) => {
    if (!scene || !renderer) return;
    if (newColor) {
      scene.background = new THREE.Color(newColor);
      renderer.setClearAlpha(1);
    } else {
      scene.background = null;
      renderer.setClearAlpha(0);
    }
  }
);

onMounted(() => {
  initThree();
  if (props.src) {
    loadModel(props.src);
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
  }
});

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    window.removeEventListener('blur', handleBlur);
    document.body.style.overflow = 'auto';
  }

  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }

  if (resizeObserver) {
    resizeObserver.disconnect();
  }

  if (abortController) {
    abortController.abort();
  }

  if (controls) {
    controls.dispose();
  }

  if (currentModel && scene) {
    scene.remove(currentModel.mesh);
    currentModel.dispose();
  }

  if (renderer) {
    renderer.dispose();
    const canvas = renderer.domElement;
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  }
});
</script>

<style scoped>
.mc-model-root {
  width: 100%;
  height: 100%;
  position: relative;
}

/* Modal backdrop (styled like SettingsPopup and InfoPopup) */
.mc-model-root.is-modal {
  position: fixed !important;
  inset: 0 !important;
  z-index: 100 !important;
  width: 100vw !important;
  height: 100vh !important;
  background-color: rgba(0, 0, 0, 0.45) !important;
  -webkit-backdrop-filter: blur(15px) !important;
  backdrop-filter: blur(15px) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 1.5vh 1.5vw !important;
  box-sizing: border-box !important;
  animation: modal-fade-in 0.25s cubic-bezier(0.075, 0.82, 0.165, 1) !important;
}

/* Outer Flip Card Container */
.mc-flip-card {
  position: relative;
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
  perspective: 1200px;
  -webkit-perspective: 1200px;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
}

/* Expanded modal card: Strictly 16:9 aspect ratio (1440p) */
.mc-flip-card.modal-card {
  width: min(96vw, calc(94vh * 16 / 9)) !important;
  height: min(94vh, calc(96vw * 9 / 16)) !important;
  aspect-ratio: 16 / 9 !important;
  max-width: 2560px !important;
  max-height: 1440px !important;
  animation: popup-scale-in 0.3s cubic-bezier(0.075, 0.82, 0.165, 1) !important;
}

/* Each 3D Card Face */
.mc-card-face {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 8px 8px 0 0;
  background-color: #111622;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.12);
  overflow: hidden;
  will-change: transform, box-shadow;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  transition: transform 0.65s cubic-bezier(0.4, 0.0, 0.2, 1), box-shadow 0.65s ease;
}

.modal-card .mc-card-face {
  border-radius: 16px;
  box-shadow: 0 16px 56px rgba(0, 0, 0, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.14);
}

/* Front Face: starts at 0deg, flips to -180deg */
.mc-card-front {
  transform: rotateY(0deg);
  z-index: 2;
  pointer-events: auto;
}

.is-flipped .mc-card-front {
  transform: rotateY(-180deg);
  z-index: 1;
  pointer-events: none;
}

/* Back Face: starts at 180deg, flips to 0deg */
.mc-card-back {
  transform: rotateY(180deg);
  z-index: 1;
  pointer-events: none;
  cursor: pointer;
}

.is-flipped .mc-card-back {
  transform: rotateY(0deg);
  z-index: 2;
  pointer-events: auto;
}

/* Dynamic lighting/shadow gradient during 3D card flip */
.mc-card-shading {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.45) 100%);
  pointer-events: none;
  opacity: 0;
  border-radius: inherit;
  transition: opacity 0.65s cubic-bezier(0.4, 0.0, 0.2, 1);
  z-index: 15;
}

.mc-card-shading.is-shaded {
  opacity: 0.85;
}

.mc-face-content {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  overflow: hidden;
  border-radius: inherit;
}

.mc-canvas-host {
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
}

.mc-canvas-host canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}

.mc-image-container {
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f172a;
  position: relative;
  overflow: hidden;
  border-radius: inherit;
}

.mc-card-image {
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  user-select: none;
  -webkit-user-drag: none;
  display: block;
}

.mc-card-corner {
  position: absolute;
  z-index: 20;
}

.mc-corner-top-left {
  top: 10px;
  left: 10px;
}

.mc-corner-top-right {
  top: 10px;
  right: 10px;
}

.mc-back-hint {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  color: #94a3b8;
  font-size: 0.8rem;
  padding: 4px 14px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  pointer-events: none;
  user-select: none;
  transition: color 0.2s, background-color 0.2s;
  z-index: 20;
}

.mc-card-back:hover .mc-back-hint {
  color: #ffffff;
  background: rgba(0, 0, 0, 0.8);
}

/* Corner close button matching InfoPopup & SettingsPopup */
.mc-modal-close-button {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 200%;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.25);
  padding: 0 14px;
  border-radius: 0 16px 0 16px;
  user-select: none;
  line-height: 1.2;
  transition: background-color 0.2s, color 0.2s;
  color: var(--color-text, #ffffff);
  z-index: 30;
}

.mc-modal-close-button:hover {
  background-color: rgba(0, 0, 0, 0.6);
  color: #ff5555;
}

.mc-model-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 0.9rem;
  color: #e2e8f0;
  background: rgba(15, 23, 42, 0.75);
  pointer-events: none;
  z-index: 5;
}

.mc-model-error {
  color: #f87171;
}

.mc-flip-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px;
  width: auto;
  min-width: 62px;
  height: 36px;
  font-weight: 700;
  background: rgba(0, 0, 0, 0.55);
}

.mc-flip-badge {
  font-size: 0.85rem;
  font-family: monospace, system-ui;
  letter-spacing: 0.5px;
}

.mc-ctrl-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(0, 0, 0, 0.55);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  padding: 0;
  opacity: 0.85;
  transition: opacity 0.2s, background-color 0.2s, transform 0.15s;
  user-select: none;
}

.mc-ctrl-btn:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.85);
  transform: scale(1.05);
}

.mc-ctrl-btn:active {
  transform: scale(0.95);
}

.mc-icon {
  width: 18px;
  height: 18px;
  display: block;
}

/* Bottom-Left Navigation D-Pad Overlay (BIGGER CONTROLS) */
.mc-nav-overlay {
  position: absolute;
  bottom: 18px;
  left: 18px;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  z-index: 25;
  user-select: none;
}

.mc-dpad {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.55);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  padding: 6px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
}

.mc-dpad-middle {
  display: flex;
  gap: 6px;
  margin: 6px 0;
}

.mc-dpad-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
  transition: background-color 0.12s, transform 0.1s, color 0.12s;
  touch-action: manipulation;
}

.mc-dpad-btn:hover {
  background: rgba(255, 255, 255, 0.22);
}

.mc-dpad-btn.active,
.mc-dpad-btn:active {
  background: rgba(255, 255, 255, 0.45);
  color: #00ffcc;
  transform: scale(0.92);
}

.mc-center-icon {
  width: 22px;
  height: 22px;
  display: block;
}

.mc-elev-controls {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: rgba(0, 0, 0, 0.55);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  padding: 6px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
}

.mc-elev-btn {
  font-size: 1.5rem;
  line-height: 1;
}

@keyframes modal-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes popup-scale-in {
  0% {
    transform: scale(0.7);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@media screen and (max-width: 600px) {
  .mc-dpad-btn {
    width: 38px;
    height: 38px;
    font-size: 1.1rem;
  }
  .mc-flip-card.modal-card {
    width: min(98vw, calc(96vh * 16 / 9)) !important;
    height: min(96vh, calc(98vw * 9 / 16)) !important;
    aspect-ratio: 16 / 9 !important;
  }
}
</style>
