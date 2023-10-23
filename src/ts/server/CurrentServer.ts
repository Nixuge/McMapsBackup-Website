// This file should reference everything from the currently selected server.
import router from "@/router";

import { IServerSearch } from "./IServerSearch";

import { MineplexMeta } from "@/ts/servers/mineplex/MineplexMeta";
import { FuncraftMeta } from "@/ts/servers/funcraft/FuncraftMeta";

import { SearchEngine } from "@/ts/manager/SearchEngine";

import { IServerMeta } from "./IServerMeta";
import { updateUrl } from "../manager/UrlManager";

export function setServer(serverName: string) {
    let metaClass = SERVER_METAS.get(serverName);
    if (metaClass === undefined) {
        router.push('/');
        return;        
    }
    
    serverMeta = new metaClass();
    serverSubUrl = serverMeta.subUrl; // could just be = serverName but this makes things more consistent;
    serverSearcher = new serverMeta.serverSearcher();
    ElementViewerComponent = serverMeta.elementViewerComponent;

    SearchEngine.init(serverMeta.serverMaps);
    updateUrl();
}


export const SERVER_METAS: Map<String, any> = new Map();
SERVER_METAS.set("mineplex", MineplexMeta)
SERVER_METAS.set("funcraft", FuncraftMeta)

export let serverSubUrl: string = "";

export let serverSearcher: IServerSearch<any>;
export let serverMeta: IServerMeta;

export let ElementViewerComponent: any;

