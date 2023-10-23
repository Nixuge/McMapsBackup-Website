// Could extend SearchEngine instead

import { OptionalTag, TagNode } from "@/ts/data/Tag";
import { LunarMap } from "./LunarMap";
import { IServerSearch } from "@/ts/server/IServerSearch";


export class LunarSearch implements IServerSearch<LunarMap> {
    public validTags: string[] = []; // TODO
    public exampleStrings: string[] = [
        "" // TODO
    ];


    public grabTags(tagNode: TagNode) {
        // TODO
    }
    public isMapGood(map: LunarMap) {
        // TODO
        return true;
    }
}