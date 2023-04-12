import router from "@/router";
import { currentMap } from "./ElementViewerManager";
import { PageManager } from "./PageManager";

export function updateUrl() {
    router.push("/" + PageManager.page.value + "/" + currentMap.url)
}
