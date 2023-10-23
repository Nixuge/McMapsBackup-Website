// This file should reference everything from the currently selected server.

import { AServerMap } from "./AServerMap";
import { IServerSearch } from "./IServerSearch";

import { MineplexSearch } from "@/ts/servers/mineplex/MineplexSearch";
import { MAPS } from "@/ts/servers/mineplex/MineplexData";

import { defineAsyncComponent, reactive } from "vue";

export let allAServerMaps: AServerMap[] = MAPS;

export let mapSearcher: IServerSearch<any> = new MineplexSearch();

export let ElementViewerComponent = defineAsyncComponent(() =>import('@/ts/servers/mineplex/MineplexComponent.vue'));

// TODO left:
// on URL change, proper URL changes, currentServerManager (somewhere or here?), refactor