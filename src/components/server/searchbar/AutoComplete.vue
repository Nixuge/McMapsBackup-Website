<script setup lang="ts">
import { AutoCompleter as ac } from '@/ts/manager/SearchEngine';
import { computed, nextTick, ref, watch } from 'vue';

const autocompleteOffset = computed(() => ac.xOffset.value + "px");

const itemRefs = ref<(HTMLElement | null)[]>([]);

function setItemRef(el: HTMLElement | null, index: number) {
    itemRefs.value[index] = el;
}

watch(ac.currentlySelectedTag, async (newIndex) => {
    if (newIndex < 0) return;
    await nextTick();
    const elem = itemRefs.value[newIndex];
    elem?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
});
</script>

<template>
    <ul id="searchtagautocomplete" v-if="ac.completionValues.value !== undefined" @keydown="ac.handleAutocompleteKeyboardPresses">
        <li
            v-for="(completion, index) of ac.completionValues.value"
            :key="index"
            :ref="el => setItemRef(el as HTMLElement | null, index)"
            :class="['autocompletevalue', { selected: index === ac.currentlySelectedTag.value }]"
            tabindex="0"
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
    padding: 4px;
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
}
</style>
