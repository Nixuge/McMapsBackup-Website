<script setup lang="ts">
import { AutoCompleter as ac } from '@/ts/manager/SearchEngine';
import { computed, ref, toRaw, watch } from 'vue';

const autocompleteOffset = computed(() => ac.xOffset.value + "px")

// Dirty fix, but for some reason nothing else works?
// Apparently can't use "this" in a :class=""??????
function returnSelectedScrollIntoView() {  
    try {
        setTimeout(() => {
            const elem = document.getElementById("searchtagautocomplete")?.getElementsByClassName("selected")[0];
        // See https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView#aligntotop
        // for scrollIntoView(false/true) replacement w behavior smooth
        elem?.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
        }, 20);
    } catch {}
    return 'autocompletevalue selected'
}
watch(ac.currentlySelectedTag, () => {

})

const epicRefs = ref([])
</script>

<template>
    <ul id="searchtagautocomplete" v-if="ac.completionValues.value !== undefined" @keydown="ac.handleAutocompleteKeyboardPresses">
        <li v-for="(completion, index) of ac.completionValues.value" :key="index"
            :class="(index === ac.currentlySelectedTag.value) ? returnSelectedScrollIntoView() : 'autocompletevalue'" tabindex="0"  
            @click="ac.onAutocompletePress(completion)" 
            @keypress.enter="ac.onAutocompletePress(completion)"
            >
            {{ completion }}
        </li>
    </ul>
</template>

<style scoped>
#searchtagautocomplete {
    position: absolute;
    top: 30px;
    left: v-bind("autocompleteOffset");
    z-index: 1;
    
    border-radius: 5px;
    background: rgba(26, 26, 26, 0.852);
    list-style: none;
    padding: 4px 4px 4px 4px;
    max-height: 90%;
    overflow: auto;
}
.autocompletevalue {
    padding-left: 2px;
    padding-right: 2px;
    padding-top: 1px;
}
.autocompletevalue:hover {
    cursor: pointer;
}
.autocompletevalue.selected {
    border-radius: 3px;
    background: rgba(84, 84, 84, 0.852);
    /* transition: 50ms; */
}
</style>