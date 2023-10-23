import { defineAsyncComponent } from "vue";

import { IServerMeta } from "@/ts/server/IServerMeta";
import { LunarSearch } from "./LunarSearch";
import { LUNAR_MAPS } from "./LunarData";

export class LunarMeta implements IServerMeta {
    public subUrl = "lunar";
    public serverSearcher = LunarSearch;
    public serverMaps = LUNAR_MAPS;
    public elementViewerComponent = defineAsyncComponent(() => import('@/ts/servers/lunar/LunarComponent.vue'));
}