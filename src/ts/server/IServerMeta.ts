// Currently sitting unused

import { Component } from "vue";
import { ServerMap } from "./ServerMap";
import { IServerSearch } from "./IServerSearch";

export interface IServerMeta {
    subUrl: string;
    serverSearcher: new () => IServerSearch<any>;
    serverMaps: ServerMap[];
    elementViewerComponent: Component;
}

export type ITagsMeta = Map<string, string[]>;