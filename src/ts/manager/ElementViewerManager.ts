import { reactive } from "vue";
import { DefaultServerMap, ServerMap, } from "@/ts/data/ServerMap";
import { SearchEngine } from "./SearchEngine";
import { updateUrl } from "./UrlManager";

export const currentMap: ServerMap = reactive(new DefaultServerMap(
    "", "", [], -1
));

export function setCurrentMap<T extends ServerMap>(newMap: T) {
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