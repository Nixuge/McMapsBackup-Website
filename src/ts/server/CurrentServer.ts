// This file should reference everything from the currently selected server.
import router from "@/router";

import { IServerSearch } from "./IServerSearch";
import { IServerMeta } from "./IServerMeta";
import { EmptyServerMap } from "./ServerMap";

import { SearchEngine } from "@/ts/manager/SearchEngine";

import { updateUrl } from "@/ts/manager/UrlManager";
import { setCurrentMap } from "@/ts/manager/CurrentMap";
import { Component, defineAsyncComponent, ref, shallowRef } from "vue";

const emptyComponent = defineAsyncComponent(() => import('@/ts/server/default/EmptyComponent.vue'));

export const serverSubUrl = ref<string>("");
export const serverSearcher = shallowRef<IServerSearch<any> | undefined>(undefined);
export let serverMeta: IServerMeta | undefined;
export const ElementViewerComponent = shallowRef<Component>(emptyComponent);

export async function setServer(serverName: string) {
    const metaClassLoader = SERVER_METAS[serverName];

    if (metaClassLoader === undefined) {
        router.push('/');
        return;
    }

    // Not 100% needed but a bit cleaner
    ElementViewerComponent.value = emptyComponent;
    // Needed, otherwise autocomplete may show results from previous instance
    serverSearcher.value = undefined;

    const metaClass = await metaClassLoader();

    const metaInstance = new metaClass();
    serverMeta = metaInstance;
    serverSubUrl.value = metaInstance.subUrl; // could just be = serverName but this makes things more consistent;
    serverSearcher.value = new metaInstance.serverSearcher();    
    ElementViewerComponent.value = metaInstance.elementViewerComponent;

    SearchEngine.init(metaInstance.serverMaps);
    setCurrentMap(new EmptyServerMap());
    updateUrl();
}

interface MetaMap {
    [key: string]: () => Promise<new () => IServerMeta>;
}
export const SERVER_METAS: MetaMap = {
    "mineplex": async () => {const {MineplexMeta} = await import("@/ts/servers/mineplex/MineplexMeta"); return MineplexMeta},
    "funcraft": async () => {const {FuncraftMeta} = await import("@/ts/servers/funcraft/FuncraftMeta"); return FuncraftMeta},
    "onecube": async () => {const {OnecubeMeta} = await import("@/ts/servers/onecube/OnecubeMeta"); return OnecubeMeta},
    "hive": async () => {const {HiveMeta} = await import("@/ts/servers/hive/HiveMeta"); return HiveMeta},
    "lunar": async () => {const {LunarMeta} = await import("@/ts/servers/lunar/LunarMeta"); return LunarMeta},
    "erisium": async () => {const {ErisiumMeta} = await import("@/ts/servers/erisium/ErisiumMeta"); return ErisiumMeta},
    "epicube": async () => {const {SoonMetaEpicube} = await import("@/ts/servers/soon/SoonMeta"); return SoonMetaEpicube},
    "rewinside": async () => {const {SoonMetaRewinside} = await import("@/ts/servers/soon/SoonMeta"); return SoonMetaRewinside},
    "fantabobworld": async () => {const {SoonMetaFantaBobWorld} = await import("@/ts/servers/soon/SoonMeta"); return SoonMetaFantaBobWorld},
    "badlion": async () => {const {SoonMetaBadlion} = await import("@/ts/servers/soon/SoonMeta"); return SoonMetaBadlion},
    // "wildya": async () => {const {WildyaMeta} = await import("@/ts/servers/wildya/WildyaMeta"); return WildyaMeta},
}

