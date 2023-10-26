// Currently sitting unused

import { ServerMap } from "./ServerMap";

export interface IServerMeta {
    subUrl: string;
    serverSearcher: any;
    serverMaps: ServerMap[];
    elementViewerComponent: Function;
}

export type ITagsMeta = Map<string, string[]>;