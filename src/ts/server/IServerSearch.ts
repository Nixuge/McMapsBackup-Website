import { TagNode } from "@/ts/data/Tag";
import { ServerMap } from "./ServerMap";
import { ITagsMeta } from "./IServerMeta";


export interface IServerSearch<T extends ServerMap> {
    validTags: ITagsMeta;
    exampleStrings: string[];

    grabTags(tagNode: TagNode): void;
    isMapGood(map: T): boolean;
}