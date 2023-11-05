// Could extend SearchEngine instead

import { OptionalTag, TagNode } from "@/ts/data/Tag";
import { ErisiumMap } from "./ErisiumMap";
import { IServerSearch } from "@/ts/server/IServerSearch";
import { ITagsMeta } from "@/ts/server/IServerMeta";
import { ERISIUM_TAGS } from "./ErisiumData";


export class ErisiumSearch implements IServerSearch<ErisiumMap> {
    public validTags: ITagsMeta = ERISIUM_TAGS;
    public exampleStrings: string[] = [

    ];

    public grabTags(tagNode: TagNode) {
        
    }
    public isMapGood(map: ErisiumMap) {
        return true;
    }
}