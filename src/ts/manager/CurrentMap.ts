import { ref } from "vue";
import { EmptyServerMap, ServerMap, } from "@/ts/server/ServerMap";
import { SearchEngine } from "./SearchEngine";
import { updateUrl } from "./UrlManager";

export let currentMap = ref(new EmptyServerMap());

export function setCurrentMap<T extends ServerMap>(newMap: T) {
    // Object.assign(currentMap.value, newMap);
    currentMap.value = newMap;
    updateUrl();
}

export function searchForMap(minigame: string, mapname: string) {
    SearchEngine.currentMapsRawArray.forEach(map => {
        if (map.minigame == minigame && map.mapName == mapname) {
            setCurrentMap(map);
        };
    });
}