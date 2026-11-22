import { defineAsyncComponent } from "vue";

import { IServerMeta } from "@/ts/server/IServerMeta";
import { SoonSearch } from "./SoonSearch";

export class SoonMetaBadlion implements IServerMeta {
    public subUrl = "badlion";
    public serverSearcher = SoonSearch;
    public serverMaps = [];
    public elementViewerComponent = defineAsyncComponent(() => import('@/ts/servers/soon/SoonComponent.vue'));
}