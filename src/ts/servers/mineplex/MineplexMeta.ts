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
/*
Comment with a dirty regex to add nekoli's parsed maps,
just ignore this

^    new M\(K\[(27)\], "(.*?)", "(.*?)", \[new D\(Z, "(.*?)"\)\], ([0-9]*?), false\)

    new M(K[$1], "$2", "$3", [new D(Z, "$4"), new D(P, "nekoli/$4", "nekoli")], $5, false)

*/