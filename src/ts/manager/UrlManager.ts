import router from "@/router";
import { currentMap, searchForMap } from "@/ts/manager/CurrentMap";
import { PageManager } from "@/ts/manager/PageManager";
import { serverSubUrl, setServer } from "@/ts/server/CurrentServer";


export function updateUrl() {
    let fullUrl = `/${serverSubUrl}/${PageManager.getPage()}/`
    if (currentMap.map.minigame)
        fullUrl += currentMap.map.minigame + "/";
    if (currentMap.map.mapName)
        fullUrl += currentMap.map.mapName;

    router.push(fullUrl);
}

export function parseUrlArgs() {
    const params = router.currentRoute.value.params;
    const server = params.server;
    const page = params.page;
    const minigame = params.minigame;
    const mapname = params.mapname;
    
    let num = Number.parseInt(page as string);
    PageManager.page.value = (num < 1 || Number.isNaN(num))? 1 : num;        

    if (server != null) {
        setServer(server as string);
    }

    if (mapname != null) {
        searchForMap(minigame.toString(), mapname.toString());
    }
}
