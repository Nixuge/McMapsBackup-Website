// Could extend SearchEngine instead

import { OptionalTag, Tag, TagNode } from "@/ts/data/Tag";
import { FuncraftMap } from "./FuncraftMap";


export const validTags: string[] = ["jeu", "variante"];

let gameTag: OptionalTag;
let variantTag: OptionalTag;

let remaining: string;

export function grabTags(tagNode: TagNode) {
    gameTag = tagNode.getTag("jeu");
    variantTag = tagNode.getTag("variante");
    remaining = tagNode.getRemaining();
}

export function isMapGood(map: FuncraftMap) {
    if ((gameTag != undefined && !map.sanitizedMinigame.includes(gameTag.value)) ||
        (variantTag != undefined && (map.variant == undefined || !map.variant.includes(variantTag.value))) ||
        (remaining != "" && !map.sanitizedMapName.includes(remaining))) {
        return false;
    }
    return true;
}