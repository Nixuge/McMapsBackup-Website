import router from "@/router";
import { currentMap, searchForMap } from "@/ts/manager/CurrentMap";
import { PageManager } from "@/ts/manager/PageManager";
import { serverSubUrl, setServer } from "@/ts/server/CurrentServer";


export function updateUrl() {
    let fullUrl = `/${serverSubUrl}/${PageManager.getPage()}/`
    if (currentMap.value.minigame)
        fullUrl += currentMap.value.minigame + "/";
    if (currentMap.value.mapName)
        fullUrl += currentMap.value.mapName;

    router.push(fullUrl);
}

export async function parseUrlArgs() {
    const params = router.currentRoute.value.params;
    const server = params.server;
    const page = params.page;
    const minigame = params.minigame;
    const mapname = params.mapname;
    
    // Same as SearchInput.vue's inputelement, may be adapted to be cached between servers
    let num = Number.parseInt(page as string);
    PageManager.page.value = (num < 1 || Number.isNaN(num))? 1 : num;        

    if (server != null) {
        await setServer(server as string);
    }

    if (mapname != null) {
        searchForMap(minigame.toString(), mapname.toString());
    }
}
