import { defineAsyncComponent } from "vue";

import { IServerMeta } from "@/ts/server/IServerMeta";
import { SoonSearch } from "./SoonSearch";

export class SoonMetaEpicube implements IServerMeta {
    public subUrl = "epicube";
    public serverSearcher = SoonSearch;
    public serverMaps = [];
    public elementViewerComponent = defineAsyncComponent(() => import('@/ts/servers/soon/SoonComponent.vue'));
}

export class SoonMetaRewinside implements IServerMeta {
    public subUrl = "rewinside";
    public serverSearcher = SoonSearch;
    public serverMaps = [];
    public elementViewerComponent = defineAsyncComponent(() => import('@/ts/servers/soon/SoonComponent.vue'));
}

export class SoonMetaFantaBobWorld implements IServerMeta {
    public subUrl = "fantabobworld";
    public serverSearcher = SoonSearch;
    public serverMaps = [];
    public elementViewerComponent = defineAsyncComponent(() => import('@/ts/servers/soon/SoonComponent.vue'));
}

export class SoonMetaBadlion implements IServerMeta {
    public subUrl = "badlion";
    public serverSearcher = SoonSearch;
    public serverMaps = [];
    public elementViewerComponent = defineAsyncComponent(() => import('@/ts/servers/soon/SoonComponent.vue'));
}
