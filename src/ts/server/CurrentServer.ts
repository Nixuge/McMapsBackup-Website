// This file should reference everything from the currently selected server.
import router from "@/router";

import { IServerSearch } from "./IServerSearch";
import { IServerMeta } from "./IServerMeta";
import { EmptyServerMap } from "./ServerMap";

import { SearchEngine } from "@/ts/manager/SearchEngine";

import { updateUrl } from "@/ts/manager/UrlManager";
import { setCurrentMap } from "@/ts/manager/CurrentMap";
import { defineAsyncComponent, shallowRef } from "vue";

const emptyComponent = defineAsyncComponent(() => import('@/ts/server/default/EmptyComponent.vue'));
export async function setServer(serverName: string) {
    const metaClassLoader = SERVER_METAS[serverName];

    if (metaClassLoader === undefined) {
        router.push('/');
        return;
    }

    // Not 100% needed but a bit cleaner
    ElementViewerComponent.value = emptyComponent;
    // Needed, otherwise autocomplete may show results from previous instance
    serverSearcher = undefined;

    const metaClass = await metaClassLoader();

    serverMeta = new metaClass();
    serverSubUrl = serverMeta.subUrl; // could just be = serverName but this makes things more consistent;
    serverSearcher = new serverMeta.serverSearcher();    
    ElementViewerComponent.value = serverMeta.elementViewerComponent;

    SearchEngine.init(serverMeta.serverMaps);
    setCurrentMap(new EmptyServerMap());
    updateUrl();
}

interface MetaMap {
    [key: string]: () => Promise<any>;
}
export const SERVER_METAS: MetaMap = {
    "mineplex": async () => {const {MineplexMeta} = await import("@/ts/servers/mineplex/MineplexMeta"); return MineplexMeta},
    "funcraft": async () => {const {FuncraftMeta} = await import("@/ts/servers/funcraft/FuncraftMeta"); return FuncraftMeta},
    "onecube": async () => {const {OnecubeMeta} = await import("@/ts/servers/onecube/OnecubeMeta"); return OnecubeMeta},
    "hive": async () => {const {HiveMeta} = await import("@/ts/servers/hive/HiveMeta"); return HiveMeta},
    "lunar": async () => {const {LunarMeta} = await import("@/ts/servers/lunar/LunarMeta"); return LunarMeta},
    "erisium": async () => {const {ErisiumMeta} = await import("@/ts/servers/erisium/ErisiumMeta"); return ErisiumMeta},
}


export let serverSubUrl: string = "";
export let serverSearcher: IServerSearch<any> | undefined;
export let serverMeta: IServerMeta;

export let ElementViewerComponent: any = shallowRef(emptyComponent);

