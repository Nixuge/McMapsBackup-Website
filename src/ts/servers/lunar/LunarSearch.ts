// Could extend SearchEngine instead

import { OptionalTag, TagNode } from "@/ts/data/Tag";
import { LunarMap } from "./LunarMap";
import { IServerSearch } from "@/ts/server/IServerSearch";
import { ITagsMeta } from "@/ts/server/IServerMeta";
import { LUNAR_TAGS } from "./LunarData";

export class LunarSearch implements IServerSearch<LunarMap> {
    public validTags: ITagsMeta = LUNAR_TAGS;
    public exampleStrings: string[] = [
        "game:nodebuff Candyland",
        "game:boxing",
        "game:uhc Beach",
        "game:souppvp",
    ];

    private gameTag: OptionalTag;
    private remaining: string = "";

    public grabTags(tagNode: TagNode) {
        this.gameTag = tagNode.getTag("game");
        this.remaining = tagNode.getRemaining();
    }

    public isMapGood(map: LunarMap) {
        if ((this.gameTag != undefined && !map.sanitizedGames.some((g) => g.includes(this.gameTag!.value))) ||
            (this.remaining != "" && !map.sanitizedMapName.includes(this.remaining))) {
            return false;
        }
        return true;
    }
}
