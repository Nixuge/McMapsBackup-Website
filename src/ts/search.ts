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

export let currentMaps = reactive(MAPS.slice(0)); // clone original array

function onInsertText(search: string) {
    // recalculate based on what currentMaps holds
    for (let i = 0; i < currentMaps.length; i++) {
        const map = currentMaps[i];
        if (!(map.map_name.includes(search) || map.builders.includes(search) || map.minigame.includes(search))) {
            currentMaps.splice(i, 1)
        }
    }
}

function recalculateWhole(search: string) {
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
    const search = event.target.value;

    switch (event.inputType) {
        case "insertText": // causes issues when ctrl+a ing & replacing :/
            onInsertText(search); // will maybe have to recalculate the whole thing anyways every time
            break;
        
        case "deleteContentBackward": // may delete one or more chars
        case "insertFromPaste": // may insert multiple chars/replace existing chars
        case "historyUndo":
            recalculateWhole(search);
            break;
        
        default:
            recalculateWhole(search);
            break;
    }
}

