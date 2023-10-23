import { reactive } from "vue";
import { DefaultAServerMap, AServerMap, } from "@/ts/server/AServerMap";
import { SearchEngine } from "./SearchEngine";
import { updateUrl } from "./UrlManager";

export const currentMapRawType: AServerMap = reactive(new DefaultAServerMap(
    "", "", [], -1
));

export function setCurrentMap<T extends AServerMap>(newMap: T) {
    // currentMap = newMap, doesn't work bc of reactive()
    Object.assign(currentMapRawType, newMap);
    updateUrl();
}

export function searchForMap(minigame: string, mapname: string) {
    SearchEngine.currentMapsRawArray.forEach(map => {
        if (map.minigame == minigame && map.mapName == mapname) {
            setCurrentMap(map);
        };
    });
}