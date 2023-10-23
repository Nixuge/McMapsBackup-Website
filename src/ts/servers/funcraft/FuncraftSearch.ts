// Could extend SearchEngine instead

import { OptionalTag, TagNode } from "@/ts/data/Tag";
import { FuncraftMap } from "./FuncraftMap";
import { IServerSearch } from "@/ts/server/IServerSearch";


export class FuncraftSearch implements IServerSearch<FuncraftMap> {
    public validTags: string[] = ["jeu", "variante"];

    gameTag: OptionalTag;
    variantTag: OptionalTag;
    
    remaining: string = "";

    public grabTags(tagNode: TagNode) {
        this.gameTag = tagNode.getTag("jeu");
        this.variantTag = tagNode.getTag("variante");
        this.remaining = tagNode.getRemaining();
    }
    public isMapGood(map: FuncraftMap) {
        if ((this.gameTag != undefined && !map.sanitizedMinigame.includes(this.gameTag.value)) ||
            (this.variantTag != undefined && (map.variant == undefined || !map.variant.includes(this.variantTag.value))) ||
            (this.remaining != "" && !map.sanitizedMapName.includes(this.remaining))) {
            return false;
        }
        return true;
    }
}