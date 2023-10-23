import { defineAsyncComponent } from "vue";

import { IServerMeta } from "@/ts/server/IServerMeta";
import { HiveSearch } from "./HiveSearch";
import { HIVE_MAPS } from "./HiveData";

export class HiveMeta implements IServerMeta {
    public subUrl = "hive";
    public serverSearcher = HiveSearch;
    public serverMaps = HIVE_MAPS;
    public elementViewerComponent = defineAsyncComponent(() => import('@/ts/servers/hive/HiveComponent.vue'));
}