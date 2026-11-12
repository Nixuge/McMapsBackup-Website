<script setup lang="ts">
import AutoComplete from './AutoComplete.vue'
import { SearchEngine as se, AutoCompleter as ac, registerSearchInput } from '@/ts/manager/SearchEngine';
import { serverSearcher } from '@/ts/server/CurrentServer';
import { onMounted, onUnmounted, ref, watch } from 'vue';

const inputElement = ref<HTMLInputElement | null>(null);
const placeholder = ref("");
let isRunning = false;

onMounted(() => {
    registerSearchInput(inputElement.value);
    isRunning = true;
    startGoThrougher();
});

onUnmounted(() => {
    isRunning = false;
    registerSearchInput(null);
});

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let goThrougherStarted = false;
function startGoThrougher() {
    if (goThrougherStarted) return;
    
    const stopWatcher = watch(serverSearcher, (searcher) => {
        if (searcher && searcher.exampleStrings && searcher.exampleStrings.length > 0) {
            goThrougherStarted = true;
            stopWatcher();
            runGoThrougher(searcher.exampleStrings);
        }
    }, { immediate: true });
}

async function runGoThrougher(exampleStrings: string[]) {
    let listIndex = 0;

    while (isRunning && exampleStrings.length > 0) {
        const currentString = exampleStrings[listIndex];
        
        // Type forward
        for (let i = 0; i < currentString.length; i++) {
            if (!isRunning) return;
            placeholder.value += currentString[i];
            await delay(40);
        }

        await delay(2000);

        // Delete backward
        while (placeholder.value.length > 0) {
            if (!isRunning) return;
            placeholder.value = placeholder.value.slice(0, -1);
            await delay(30);
        }

        listIndex = (listIndex + 1) % exampleStrings.length;
        await delay(500);
    }
}
</script>

<template>
    <input
        ref="inputElement"
        id="searchinput"
        name="Search Input"
        :placeholder="placeholder"
        @input="event => se.handleInputChange(event)"
        @keydown="ac.handleAutocompleteKeyboardPresses"
    />
    <AutoComplete />
</template>

<style scoped>
input {
    font-size: 20px;
    font-family: 'Nunito', Helvetica, Arial, sans-serif;
    width: 100%;
    box-sizing: border-box;
    background: transparent;
    border: none;
    box-shadow: none;
    color: var(--text-color);
}

textarea:focus, input:focus {
    outline: none;
}
</style>
