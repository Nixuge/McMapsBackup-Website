// This file should reference everything from the currently selected server.

import { ServerMap } from "./ServerMap";
import { IServerSearch } from "./IServerSearch";

import { MineplexSearch } from "@/ts/servers/mineplex/MineplexSearch";
import { MineplexMeta } from "@/ts/servers/mineplex/MineplexMeta";
import { MAPS } from "@/ts/servers/mineplex/MineplexData";

import { defineAsyncComponent, reactive } from "vue";
import { IServerMeta } from "./IServerMeta";

export let allServerMaps: ServerMap[] = MAPS;

export let serverMapSearcher: IServerSearch<any> = new MineplexSearch();
export let serverMeta: IServerMeta = new MineplexMeta();

export let ElementViewerComponent = defineAsyncComponent(() => import('@/ts/servers/mineplex/MineplexComponent.vue'));



// TODO left:
// on URL change, proper URL changes, currentServerManager (somewhere or here?), refactor