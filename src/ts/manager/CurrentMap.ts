import { reactive } from "vue";
import { DefaultServerMap, ServerMap, } from "@/ts/server/ServerMap";
import { SearchEngine } from "./SearchEngine";
import { updateUrl } from "./UrlManager";

export let currentMap = reactive({map: new DefaultServerMap()});

export function setCurrentMap<T extends ServerMap>(newMap: T) {
    // currentMap.map = newMap;
    Object.assign(currentMap.map, newMap);
    updateUrl();
}

export function searchForMap(minigame: string, mapname: string) {
    SearchEngine.currentMapsRawArray.forEach(map => {
        if (map.minigame == minigame && map.mapName == mapname) {
            setCurrentMap(map);
        };
    });
}