import { defineAsyncComponent } from "vue";

import { IServerMeta } from "@/ts/server/IServerMeta";
import { WildyaSearch } from "./WildyaSearch";
import { WILDYA_MAPS } from "./WildyaData";

export class WildyaMeta implements IServerMeta {
    public subUrl = "wildya";
    public serverSearcher = WildyaSearch;
    public serverMaps = WILDYA_MAPS;
    public elementViewerComponent = defineAsyncComponent(() => import('@/ts/servers/wildya/WildyaComponent.vue'));
}