import router from "@/router";
import { currentMapRawType } from "./CurrentMap";
import { PageManager } from "./PageManager";

export function updateUrl() {
    router.push(`/${PageManager.getPage()}/${currentMapRawType.minigame}/${currentMapRawType.mapName}`);
}
