// Could extend SearchEngine instead

import { OptionalTag, TagNode } from "@/ts/data/Tag";
import { textToBool } from "@/ts/utils/TextUtils";
import { MineplexMap } from "./MineplexMap";
import { IServerSearch } from "@/ts/server/IServerSearch";
import { ITagsMeta } from "@/ts/server/IServerMeta";
import { MINEPLEX_TAGS } from "./MineplexData";


export class MineplexSearch implements IServerSearch<MineplexMap> {
    public validTags: ITagsMeta = MINEPLEX_TAGS;
    public exampleStrings: string[] = [
        "game:thebridges Seretopia",
        "builder:powh",
        "nano:true game:gladiators Cavern"
    ];

    private nanoTag: OptionalTag;
    private wantsNano: boolean | undefined;

    private gameTag: OptionalTag;
    private builderTag: OptionalTag;

    private remaining: string = "";

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