// This file should reference everything from the currently selected server.

import { ServerMap } from "@/ts/data/ServerMap";
import { grabTags, isMapGood, validTags } from "./mineplex/MineplexSearch";
import { TagNode } from "../data/Tag";

export let allServerMaps: ServerMap[] = [];

export let serverValidTags: string[] = validTags;

export let tagsGrabber: (tagNode: TagNode) => void = grabTags;
export let mapMatcher: Function = isMapGood;

