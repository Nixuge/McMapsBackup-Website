<script setup lang="ts">

</script>
<template>
    <Transition name="bounce" mode="out-in" appear>
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