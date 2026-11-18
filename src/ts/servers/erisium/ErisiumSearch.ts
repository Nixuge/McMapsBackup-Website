// Could extend SearchEngine instead

import { OptionalTag, TagNode } from "@/ts/data/Tag";
import { ErisiumMap } from "./ErisiumMap";
import { IServerSearch } from "@/ts/server/IServerSearch";
import { ITagsMeta } from "@/ts/server/IServerMeta";
import { ERISIUM_TAGS } from "./ErisiumData";


export class ErisiumSearch implements IServerSearch<ErisiumMap> {
    public validTags: ITagsMeta = ERISIUM_TAGS;
    public exampleStrings: string[] = [
        "jeu:bedwars Acropole",
        "jeu:practice BrickSide",
        "jeu:luckyrace"
    ];

    private gameTag: OptionalTag;
    private remaining: string = "";

    public grabTags(tagNode: TagNode) {
        this.gameTag = tagNode.getTag("jeu");
        this.remaining = tagNode.getRemaining();
    }
    public isMapGood(map: ErisiumMap) {
        if ((this.gameTag != undefined && !map.sanitizedMinigame.includes(this.gameTag.value)) ||
            (this.remaining != "" && !map.sanitizedMapName.includes(this.remaining))) {
            return false;
        }
        return true;
    }
}