import router from "@/router";
import { currentMapRawType } from "./ElementViewerManager";
import { PageManager } from "./PageManager";

export function updateUrl() {
    router.push(`/${PageManager.getPage()}/${currentMapRawType.minigame}/${currentMapRawType.mapName}`);
}
