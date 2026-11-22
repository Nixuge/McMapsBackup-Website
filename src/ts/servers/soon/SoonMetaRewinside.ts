import { defineAsyncComponent } from "vue";

import { IServerMeta } from "@/ts/server/IServerMeta";
import { SoonSearch } from "./SoonSearch";

export class SoonMetaRewinside implements IServerMeta {
    public subUrl = "rewinside";
    public serverSearcher = SoonSearch;
    public serverMaps = [];
    public elementViewerComponent = defineAsyncComponent(() => import('@/ts/servers/soon/SoonComponent.vue'));
}