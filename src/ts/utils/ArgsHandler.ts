import router from "@/router";
import { searchForMap } from "@/ts/manager/ElementViewerManager";
import { PageManager } from "@/ts/manager/PageManager";

export function parseUrlArgs() {
    const params = router.currentRoute.value.params;
    const page = params.page;
    const minigame = params.minigame;
    const mapname = params.mapname;
    
    if (page != null) {
        let num = Number.parseInt(page.toString());
        PageManager.page.value = (num < 1 || Number.isNaN(num))? 1 : num;
    }

    if (mapname != null) {
        searchForMap(minigame.toString(), mapname.toString());
    }
}
