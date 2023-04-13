import { reactive } from "vue";
import { McMap } from "../data/McMap";
import router from "@/router";
import { SearchEngine } from "./SearchEngine";
import { updateUrl } from "./UrlManager";

export const currentMap = reactive(new McMap(
    "",
    "No maps selected",
    "",
    "https://hivebackup.github.io/static/previews/Gravity/pacman.png",
    []
))

export function setCurrentMap(newMap: McMap) {
    // currentMap = newMap, doesn't work bc of reactive()
    Object.assign(currentMap, newMap)
    updateUrl();
}

export function searchForMap(minigame: string, mapname: string) {
    SearchEngine.currentMapsRawArray.forEach(map => {
        if (map.minigame == minigame && map.map_name == mapname) {
            setCurrentMap(map);
        };
    });
}