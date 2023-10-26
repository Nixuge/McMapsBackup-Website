// Could extend SearchEngine instead

import { OptionalTag, TagNode } from "@/ts/data/Tag";
import { OnecubeMap } from "./OnecubeMap";
import { IServerSearch } from "@/ts/server/IServerSearch";
import { ITagsMeta } from "@/ts/server/IServerMeta";


export class OnecubeSearch implements IServerSearch<OnecubeMap> {
    public validTags: ITagsMeta = new Map<string, string[]>();
    public exampleStrings: string[] = [
        "" //TODO
    ];

    // private gameTag: OptionalTag;
    // private variantTag: OptionalTag;
    
    // private remaining: string = "";

    public grabTags(tagNode: TagNode) {
        // this.gameTag = tagNode.getTag("jeu");
        // this.variantTag = tagNode.getTag("variante");
        // this.remaining = tagNode.getRemaining();
        // TODO
    }
    public isMapGood(map: OnecubeMap) {
        // if ((this.gameTag != undefined && !map.sanitizedMinigame.includes(this.gameTag.value)) ||
        //     (this.variantTag != undefined && (map.variant == undefined || !map.variant.includes(this.variantTag.value))) ||
        //     (this.remaining != "" && !map.sanitizedMapName.includes(this.remaining))) {
        //     return false;
        // }
        // return true;
        // TODO
        return true;
    }
}