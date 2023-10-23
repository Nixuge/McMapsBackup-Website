import router from "@/router";
import { currentMapRawType, searchForMap } from "@/ts/manager/CurrentMap";
import { PageManager } from "@/ts/manager/PageManager";
import { serverSubUrl, setServer } from "@/ts/server/CurrentServer";


export function updateUrl() {
    let fullUrl = `/${serverSubUrl}/${PageManager.getPage()}/`
    if (currentMapRawType.minigame)
        fullUrl += currentMapRawType.minigame;
    if (currentMapRawType.mapName)
        fullUrl += currentMapRawType.mapName;

    router.push(fullUrl);
}

export function parseUrlArgs() {
    const params = router.currentRoute.value.params;
    const server = params.server;
    const page = params.page;
    const minigame = params.minigame;
    const mapname = params.mapname;
    
    if (server != null) {
        setServer(server as string);
    }

    if (page != null) {
        let num = Number.parseInt(page.toString());
        PageManager.page.value = (num < 1 || Number.isNaN(num))? 1 : num;
    }

    if (mapname != null) {
        searchForMap(minigame.toString(), mapname.toString());
    }
}
