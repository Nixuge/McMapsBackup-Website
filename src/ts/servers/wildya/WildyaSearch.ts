// Could extend SearchEngine instead

import { OptionalTag, TagNode } from "@/ts/data/Tag";
import { WildyaMap } from "./WildyaMap";
import { IServerSearch } from "@/ts/server/IServerSearch";
import { ITagsMeta } from "@/ts/server/IServerMeta";
import { WILDYA_TAGS } from "./WildyaData";


export class WildyaSearch implements IServerSearch<WildyaMap> {
    public validTags: ITagsMeta = WILDYA_TAGS;
    public exampleStrings: string[] = [
        "jeu:TowerFast mario",
        "toplaya"
    ];

    private jeuTag: OptionalTag;
    private remaining: string = "";

    public grabTags(tagNode: TagNode) {
        this.jeuTag = tagNode.getTag("jeu");
        this.remaining = tagNode.getRemaining();
    }
    public isMapGood(map: WildyaMap) {
        if (this.jeuTag && !map.sanitizedMinigame.includes(this.jeuTag.value))
            return false;
        
        return this.remaining == "" || map.sanitizedMapName.includes(this.remaining);
    }
}