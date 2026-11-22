<script setup lang="ts">
import TST from '@/components/server/transitions/TextSlideTransitionElementViewer.vue'
import { currentMap as CM } from '@/ts/manager/CurrentMap';
import { computed } from 'vue';
</script>


<template>
    <div class="text">
        <TST>
            <div>
                <h1>Coming soon, still archiving.</h1>
                <h2>Note that the archive will most likely not be complete as the server has been shutdown a while ago.</h2>
            </div>
        </TST>
    </div>
</template>

<style scoped>
.text {
    padding: 10px;
}

h1 {
    margin: 0;
}

li {
    font-size: 150%
}

a {
    color: rgb(255, 168, 212);
}

a:visited {
    color: hotpink;
}
</style>