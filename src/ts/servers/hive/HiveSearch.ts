// Could extend SearchEngine instead

import { OptionalTag, TagNode } from "@/ts/data/Tag";
import { HiveMap } from "./HiveMap";
import { IServerSearch } from "@/ts/server/IServerSearch";


export class HiveSearch implements IServerSearch<HiveMap> {
    public validTags: string[] = ["jeu", "variante"];
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