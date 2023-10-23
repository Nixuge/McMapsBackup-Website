import { defineAsyncComponent } from "vue";

import { IServerMeta } from "@/ts/server/IServerMeta";
import { FuncraftSearch } from "./FuncraftSearch";
import { FUNCRAFT_MAPS } from "./FuncraftData";

export class FuncraftMeta implements IServerMeta {
    public subUrl = "mineplex";
    public serverSearcher = FuncraftSearch;
    public serverMaps = FUNCRAFT_MAPS;
    public elementViewerComponent = defineAsyncComponent(() => import('@/ts/servers/funcraft/FuncraftComponent.vue'));
}