import router from "@/router";
import { searchForMap } from "@/ts/manager/CurrentMap";
import { PageManager } from "@/ts/manager/PageManager";
import { setServer } from "@/ts/server/CurrentServer";

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
