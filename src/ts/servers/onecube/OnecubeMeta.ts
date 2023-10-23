import { defineAsyncComponent } from "vue";

import { IServerMeta } from "@/ts/server/IServerMeta";
import { OnecubeSearch } from "./OnecubeSearch";
import { ONECUBE_MAPS } from "./OnecubeData";

export class OnecubeMeta implements IServerMeta {
    public subUrl = "onecube";
    public serverSearcher = OnecubeSearch;
    public serverMaps = ONECUBE_MAPS;
    public elementViewerComponent = defineAsyncComponent(() => import('@/ts/servers/onecube/OnecubeComponent.vue'));
}