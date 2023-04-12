import { reactive } from "vue";
import { Download, McMap } from "./mcmap";

const MAPS: Array<McMap> = [
    new McMap("Speed Builders", "map name here", "builder1, me, another one",
        "https://hivebackup.github.io/static/previews/Gravity/aquamarine.png",
        [
            new Download("download1", "https://github.com/hivebackup/hivemaps/releases/download/SurvivalGames/catching-fire.zip"),
            new Download("download another", "https://github.com/hivebackup/hivemaps/releases/download/SurvivalGames/condas.zip")
        ]),
    new McMap("Speed Builders", "map number two", "builder2, dsfsdme, another one",
        "https://hivebackup.github.io/static/previews/SurvivalGames/condas.png",
        [
            new Download("download1", "https://github.com/hivebackup/hivemaps/releases/download/SurvivalGames/forlorn.zip")
        ]),
    new McMap("Speed Builders", "map number three", "builder3, dsfsdme, another one",
        "https://hivebackup.github.io/static/previews/SurvivalGames/condas.png",
        [
            new Download("download1", "https://github.com/hivebackup/hivemaps/releases/download/SurvivalGames/forlorn.zip")
        ]),

]

// function getMapsFromSearchParams(search: string, selected_minigame: string | undefined) {
//     // if adding a character, just search from the old array
//     const mapsToSearchIn = (oldSearch != "" && search.includes(oldSearch)) ? oldMaps : MAPS;
//     let foundMaps: Array<McMap> = []

//     mapsToSearchIn.forEach(map => {
//         if (map.map_name.includes(search) || map.builders.includes(search) || map.minigame.includes(search)) {
//             foundMaps.push(map)
//         }
//     });
//     oldSearch = search;
//     oldMaps = foundMaps;
//     return foundMaps;
// }


export let currentMaps = reactive(MAPS.slice(0)); // clone original array

let search = ""

function onInsertText() {
    // recalculate based on what currentMaps holds
    for (let i = 0; i < currentMaps.length; i++) {
        const map = currentMaps[i];
        if (!(map.map_name.includes(search) || map.builders.includes(search) || map.minigame.includes(search))) {
            currentMaps.splice(i, 1)
        }
    }
}

function recalculateWhole() {
    // prolly not efficient but oh well
    currentMaps.length = 0;
    MAPS.forEach(map => {
        if (map.map_name.includes(search) || map.builders.includes(search) || map.minigame.includes(search)) {
            currentMaps.push(map)
        }
    });
}

//TODO: handle "select" change
export function handleInputChange(event: any) {
    console.log(event);
    
    switch (event.inputType) {
        case "insertText":
            search += event.data;
            onInsertText();
            break;
        
        case "deleteContentBackward": // may delete one or more chars
        case "insertFromPaste": // may insert multiple chars/replace existing chars
        case "historyUndo":
            search = event.target.value;
            recalculateWhole();
            break;
        
        default:
            recalculateWhole();
            break;
    }
}

