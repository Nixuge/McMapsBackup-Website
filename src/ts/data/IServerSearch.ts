import { ServerMap } from "./ServerMap";
import { TagNode } from "./Tag";

export interface IServerSearch<T extends ServerMap> {
    validTags: string[];

    grabTags(tagNode: TagNode): void;
    isMapGood(map: T): boolean;
}