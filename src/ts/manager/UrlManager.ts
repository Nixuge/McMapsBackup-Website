import router from "@/router";
import { currentMapRawType } from "./CurrentMap";
import { PageManager } from "./PageManager";
import { serverSubUrl } from "../server/CurrentServer";

export function updateUrl() {
    let fullUrl = `/${serverSubUrl}/${PageManager.getPage()}/`
    if (currentMapRawType.minigame)
        fullUrl += currentMapRawType.minigame;
    if (currentMapRawType.mapName)
        fullUrl += currentMapRawType.mapName;

    router.push(fullUrl);
}
