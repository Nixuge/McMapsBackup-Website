// Could extend SearchEngine instead

import { OptionalTag, TagNode } from "@/ts/data/Tag";
import { HiveMap } from "./HiveMap";
import { IServerSearch } from "@/ts/server/IServerSearch";
import { ITagsMeta } from "@/ts/server/IServerMeta";


export class HiveSearch implements IServerSearch<HiveMap> {
    public validTags: ITagsMeta = new Map<string, string[]>(); // TODO
    public exampleStrings: string[] = [
        "" // TODO
    ];


    public grabTags(tagNode: TagNode) {
        // TODO
    }
    public isMapGood(map: HiveMap) {
        // TODO
        return true;
    }
}