import { defineAsyncComponent } from "vue";

import { IServerMeta } from "@/ts/server/IServerMeta";
import { ErisiumSearch } from "./ErisiumSearch";
import { ERISIUM_MAPS } from "./ErisiumData";

export class ErisiumMeta implements IServerMeta {
    public subUrl = "erisium";
    public serverSearcher = ErisiumSearch;
    public serverMaps = ERISIUM_MAPS;
    public elementViewerComponent = defineAsyncComponent(() => import('@/ts/servers/erisium/ErisiumComponent.vue'));
}