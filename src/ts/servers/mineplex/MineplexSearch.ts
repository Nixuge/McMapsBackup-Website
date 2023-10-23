// Could extend SearchEngine instead

import { OptionalTag, TagNode } from "@/ts/data/Tag";
import { textToBool } from "@/ts/utils/TextUtils";
import { MineplexMap } from "./MineplexMap";
import { IServerSearch } from "@/ts/server/IServerSearch";


export class MineplexSearch implements IServerSearch<MineplexMap> {
    public validTags: string[] = ["game", "builder", "nano"];

    nanoTag: OptionalTag;
    wantsNano: boolean | undefined;

    gameTag: OptionalTag;
    builderTag: OptionalTag;

    remaining: string = "";

    public grabTags(tagNode: TagNode) {
        this.nanoTag = tagNode.getTag("nano");
        this.wantsNano = (this.nanoTag == undefined) ? undefined : textToBool(this.nanoTag.value);
    
        this.gameTag = tagNode.getTag("game");
        this.builderTag = tagNode.getTag("builder");
        this.remaining = tagNode.getRemaining();
    }
    public isMapGood(map: MineplexMap) {
        if (this.nanoTag != undefined) {
            // Skip only if both tags aren't the same
            if (!((map.nano && this.wantsNano) || (!map.nano && !this.wantsNano))) {
                return false;
            }
        }
    
        if ((this.gameTag != undefined && !map.sanitizedMinigame.includes(this.gameTag.value)) ||
            (this.builderTag != undefined && !map.sanitizedBuilders.includes(this.builderTag.value)) ||
            (this.remaining != "" && !map.sanitizedMapName.includes(this.remaining))) {
            return false;
        }
        return true;
    }
}