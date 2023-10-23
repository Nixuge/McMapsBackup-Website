// This file should reference everything from the currently selected server.

import { ServerMap } from "@/ts/data/ServerMap";

import { MineplexSearch } from "./mineplex/MineplexSearch";
import { MAPS } from "./mineplex/MineplexData";

import { defineAsyncComponent } from "vue";
import { IServerSearch } from "../data/IServerSearch";

export let allServerMaps: ServerMap[] = MAPS;

export let mapSearcher: IServerSearch<any> = new MineplexSearch();

export let ElementViewerComponent = defineAsyncComponent(() =>import('./mineplex/MineplexComponent.vue'));

// TODO left:
// on URL change, proper URL changes, currentServerManager (somewhere or here?), refactor