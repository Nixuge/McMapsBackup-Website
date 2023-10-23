import { TagNode } from "@/ts/data/Tag";
import { AServerMap } from "./AServerMap";


export interface IServerSearch<T extends AServerMap> {
    validTags: string[];

    grabTags(tagNode: TagNode): void;
    isMapGood(map: T): boolean;
}