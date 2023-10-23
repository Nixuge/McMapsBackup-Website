// This file should reference everything from the currently selected server.
import router from "@/router";

import { IServerSearch } from "./IServerSearch";
import { IServerMeta } from "./IServerMeta";
import { EmptyServerMap } from "./ServerMap";

import { MineplexMeta } from "@/ts/servers/mineplex/MineplexMeta";
import { FuncraftMeta } from "@/ts/servers/funcraft/FuncraftMeta";
import { OnecubeMeta } from "@/ts/servers/onecube/OnecubeMeta";
import { HiveMeta } from "@/ts/servers/hive/HiveMeta";

import { SearchEngine } from "@/ts/manager/SearchEngine";

import { updateUrl } from "@/ts/manager/UrlManager";
import { setCurrentMap } from "@/ts/manager/CurrentMap";

export function setServer(serverName: string) {
    // const metaClassLoader = SERVER_METAS.get(serverName);
    const metaClass = SERVER_METAS.get(serverName);

    if (metaClass === undefined) {
        router.push('/');
        return;
    }

    // const metaClass = await metaClassLoader();

    serverMeta = new metaClass();
    serverSubUrl = serverMeta.subUrl; // could just be = serverName but this makes things more consistent;
    serverSearcher = new serverMeta.serverSearcher();
    ElementViewerComponent = serverMeta.elementViewerComponent;

    SearchEngine.init(serverMeta.serverMaps);
    setCurrentMap(new EmptyServerMap());
    updateUrl();
}

// todo: figure out how to import those async.
// Note that this is quite annoying due to the elementViewerComponent
// (& also due to the GoThrouer, see SearchInput.vue#36)
// Tried multiple things, including the beforeCreate mount,
// but this does not support async calls and so does not support this.
export const SERVER_METAS: Map<String, any> = new Map();
SERVER_METAS.set("mineplex", MineplexMeta);
SERVER_METAS.set("funcraft", FuncraftMeta);
SERVER_METAS.set("onecube", OnecubeMeta);
SERVER_METAS.set("hive", HiveMeta)
// SERVER_METAS.set("mineplex", async () => {const {MineplexMeta} = await import("@/ts/servers/mineplex/MineplexMeta"); return MineplexMeta})
// SERVER_METAS.set("funcraft", async () => {const {FuncraftMeta} = await import("@/ts/servers/funcraft/FuncraftMeta"); return FuncraftMeta});

export let serverSubUrl: string = "";

export let serverSearcher: IServerSearch<any>;
export let serverMeta: IServerMeta;

export let ElementViewerComponent: any;

