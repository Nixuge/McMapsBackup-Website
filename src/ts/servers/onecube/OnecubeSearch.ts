// Could extend SearchEngine instead

import { OptionalTag, TagNode } from "@/ts/data/Tag";
import { OnecubeMap } from "./OnecubeMap";
import { IServerSearch } from "@/ts/server/IServerSearch";
import { ITagsMeta } from "@/ts/server/IServerMeta";
import { ONECUBE_TAGS } from "./OnecubeData";


export class OnecubeSearch implements IServerSearch<OnecubeMap> {
    public validTags: ITagsMeta = ONECUBE_TAGS;
    public exampleStrings: string[] = [
        "jeu:pitchout pokemon",
        "année:2022",
        "game:fallenkingdom auteur:Akiiro_"
    ];

    private gameTag: OptionalTag;
    private authorTag: OptionalTag;
    private yearTag: OptionalTag;
    
    private remaining: string = "";

    public grabTags(tagNode: TagNode) {
        this.gameTag = tagNode.getTag("jeu");
        this.authorTag = tagNode.getTag("auteur");
        this.yearTag = tagNode.getTag("annee");
        this.remaining = tagNode.getRemaining();
    }
    public isMapGood(map: OnecubeMap) {
        if ((this.gameTag != undefined && !map.sanitizedMinigame.includes(this.gameTag.value)) ||
            (this.authorTag != undefined && (map.builders == undefined || !map.builders.includes(this.authorTag.value))) ||
            (this.yearTag != undefined && map.creationYear != this.yearTag.value) ||
            (this.remaining != "" && !map.sanitizedMapName.includes(this.remaining))) {
            return false;
        }
        
        return true;
    }
}