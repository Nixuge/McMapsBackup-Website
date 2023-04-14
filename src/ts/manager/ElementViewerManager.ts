import { reactive } from "vue";
import { McMap } from "@/ts/data/McMap";
import { SearchEngine } from "./SearchEngine";
import { updateUrl } from "./UrlManager";

export const currentMap = reactive(new McMap(
    "", "", "",
    [], 0, false
));

export function setCurrentMap(newMap: McMap) {
    // currentMap = newMap, doesn't work bc of reactive()
    Object.assign(currentMap, newMap);
    updateUrl();
}

export function searchForMap(minigame: string, mapname: string) {
    SearchEngine.currentMapsRawArray.forEach(map => {
        if (map.minigame == minigame && map.mapName == mapname) {
            setCurrentMap(map);
        };
    });
}