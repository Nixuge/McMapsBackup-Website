// Could extend SearchEngine instead

import { OptionalTag, TagNode } from "@/ts/data/Tag";
import { IServerSearch } from "@/ts/server/IServerSearch";
import { ITagsMeta } from "@/ts/server/IServerMeta";
import { ServerMap } from "@/ts/server/ServerMap";


export class SoonSearch implements IServerSearch<ServerMap> {
    public validTags: ITagsMeta = new Map();
    public exampleStrings: string[] = ["coming soon"];


    public grabTags(tagNode: TagNode) {}
    public isMapGood(map: ServerMap) {return true;}
}