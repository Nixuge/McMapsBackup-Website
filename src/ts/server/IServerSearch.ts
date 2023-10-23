import { TagNode } from "@/ts/data/Tag";
import { ServerMap } from "./ServerMap";


export interface IServerSearch<T extends ServerMap> {
    validTags: string[];
    exampleStrings: string[];

    grabTags(tagNode: TagNode): void;
    isMapGood(map: T): boolean;
}