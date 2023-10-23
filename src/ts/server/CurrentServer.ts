// This file should reference everything from the currently selected server.
import router from "@/router";

import { IServerSearch } from "./IServerSearch";

import { MineplexMeta } from "@/ts/servers/mineplex/MineplexMeta";

import { SearchEngine } from "@/ts/manager/SearchEngine";

import { IServerMeta } from "./IServerMeta";
import { updateUrl } from "../manager/UrlManager";

export function setServer(serverName: string) {
    const metaClassLoader = SERVER_METAS.get(serverName);
    
    if (metaClassLoader === undefined) {
        router.push('/');
        return;
    }
    
    metaClassLoader().then(
        (metaClass: any) => {
            serverMeta = new metaClass();
            serverSubUrl = serverMeta.subUrl; // could just be = serverName but this makes things more consistent;
            serverSearcher = new serverMeta.serverSearcher();
            ElementViewerComponent = serverMeta.elementViewerComponent;

            SearchEngine.init(serverMeta.serverMaps);
            updateUrl();
        }
    );
}


export const SERVER_METAS: Map<String, any> = new Map();
SERVER_METAS.set("mineplex", async () => {const {MineplexMeta} = await import("@/ts/servers/mineplex/MineplexMeta"); return MineplexMeta})
SERVER_METAS.set("funcraft", async () => {const {FuncraftMeta} = await import("@/ts/servers/funcraft/FuncraftMeta"); return FuncraftMeta});

export let serverSubUrl: string = "";

export let serverSearcher: IServerSearch<any>;
export let serverMeta: IServerMeta;

export let ElementViewerComponent: any;

