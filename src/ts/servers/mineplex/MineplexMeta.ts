import { defineAsyncComponent } from "vue";

import { IServerMeta } from "@/ts/server/IServerMeta";
import { MineplexSearch } from "./MineplexSearch";
import { MINEPLEX_MAPS } from "./MineplexData";

export class MineplexMeta implements IServerMeta {
    public subUrl = "mineplex";
    public serverSearcher = MineplexSearch;
    public serverMaps = MINEPLEX_MAPS;
    public elementViewerComponent = defineAsyncComponent(() => import('@/ts/servers/mineplex/MineplexComponent.vue'));
}