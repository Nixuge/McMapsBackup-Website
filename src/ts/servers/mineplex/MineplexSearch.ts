// Could extend SearchEngine instead

import { OptionalTag, Tag, TagNode } from "@/ts/data/Tag";
import { textToBool } from "@/ts/utils/TextUtils";
import { MineplexMap } from "./MineplexMap";


export const validTags: string[] = ["game", "builder", "nano"];

let nanoTag: OptionalTag;
let wantsNano: boolean | undefined;

let gameTag: OptionalTag;
let builderTag: OptionalTag;

let remaining: string;


export function grabTags(tagNode: TagNode) {
    nanoTag = tagNode.getTag("nano");
    wantsNano = (nanoTag == undefined) ? undefined : textToBool(nanoTag.value);

    gameTag = tagNode.getTag("game");
    builderTag = tagNode.getTag("builder");
    remaining = tagNode.getRemaining();
}

export function isMapGood(map: MineplexMap) {
    if (nanoTag != undefined) {
        // Skip only if both tags aren't the same
        if (!((map.nano && wantsNano) || (!map.nano && !wantsNano))) {
            return false;
        }
    }

    if ((gameTag != undefined && !map.sanitizedMinigame.includes(gameTag.value)) ||
        (builderTag != undefined && !map.sanitizedBuilders.includes(builderTag.value)) ||
        (remaining != "" && !map.sanitizedMapName.includes(remaining))) {
        return false;
    }
    return true;
}