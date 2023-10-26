// Could extend SearchEngine instead

import { OptionalTag, TagNode } from "@/ts/data/Tag";
import { LunarMap } from "./LunarMap";
import { IServerSearch } from "@/ts/server/IServerSearch";
import { ITagsMeta } from "@/ts/server/IServerMeta";


export class LunarSearch implements IServerSearch<LunarMap> {
    public validTags: ITagsMeta = new Map<string, string[]>(); // TODO
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