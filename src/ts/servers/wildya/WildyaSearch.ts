// Could extend SearchEngine instead

import { OptionalTag, TagNode } from "@/ts/data/Tag";
import { WildyaMap } from "./WildyaMap";
import { IServerSearch } from "@/ts/server/IServerSearch";
import { ITagsMeta } from "@/ts/server/IServerMeta";
import { WILDYA_TAGS } from "./WildyaData";


export class WildyaSearch implements IServerSearch<WildyaMap> {
    public validTags: ITagsMeta = WILDYA_TAGS;
    public exampleStrings: string[] = [

    ];

    public grabTags(tagNode: TagNode) {
        
    }
    public isMapGood(map: WildyaMap) {
        return true;
    }
}