import router from "@/router";
import { searchForMap } from "./data/McMap";
import { PageManager } from "./manager/SearchEngine";

export function parseUrlArgs() {
    const params = router.currentRoute.value.params;
    const page = params.page;
    const minigame = params.minigame;
    const mapname = params.mapname;
    
    if (page != null) {
        PageManager.page = Number.parseInt(page.toString());
    }

    if (minigame != null) {
        //TODO: SET MINIGAME
    }
    if (mapname != null) {
        searchForMap(minigame.toString(), mapname.toString())
    }    
}
