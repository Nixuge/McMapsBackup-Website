// This file should reference everything from the currently selected server.

import { ServerMap } from "@/ts/data/ServerMap";
import { TagNode } from "@/ts/data/Tag";

import { grabTags, isMapGood, validTags } from "./mineplex/MineplexSearch";
import { MAPS } from "./mineplex/MineplexData";

import { defineAsyncComponent } from "vue";

export let allServerMaps: ServerMap[] = MAPS;
export let serverValidTags: string[] = validTags;

export let tagsGrabber: (tagNode: TagNode) => void = grabTags;
export let mapMatcher: Function = isMapGood;

export let ElementViewerComponent = defineAsyncComponent(() =>import('./mineplex/MineplexComponent.vue'));
