// This file should reference everything from the currently selected server.

import { IServerSearch } from "./IServerSearch";

import { MineplexMeta } from "@/ts/servers/mineplex/MineplexMeta";
import { FuncraftMeta } from "@/ts/servers/funcraft/FuncraftMeta";

import { SearchEngine } from "@/ts/manager/SearchEngine";

import { defineAsyncComponent, reactive } from "vue";
import { IServerMeta } from "./IServerMeta";
import { updateUrl } from "../manager/UrlManager";

export function setServer(serverName: string) {
    let metaClass = SERVER_METAS.get(serverName);

    serverSubUrl = serverName;

    serverMeta = new metaClass();
    
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



// TODO left:
// on URL change, proper URL changes, currentServerManager (somewhere or here?), refactor