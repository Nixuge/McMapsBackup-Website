import { sanitize } from "@/ts/utils/TextUtils";
import { Download, ServerMap } from "@/ts/server/ServerMap"


export class MineplexMap extends ServerMap {
    public sanitizedBuilders: string;

    constructor(minigame: string, mapName: string, public builders: string,
        downloads: Download[], id: number, public nano: boolean, 
        commentaries?: string) {
            super(minigame, mapName, downloads, id, commentaries, builders);
            this.sanitizedBuilders = sanitize(builders);
        }
    
    getBaseUrl(file: boolean): string {
        let base = "/static/mineplex/";
        base += (file) ? "zip/" : "img/";
        if (this.nano){
            base += "nano/";
        }

        // Kinda ugly workaround to have cakewars solo screenshots to work on standard too
        // iirc they're a bit different but should be fine.
        base += (this.sanitizedMinigame == "cakewarsstandard") ?
            "cakewarssoloduos/" : 
            this.sanitizedMinigame + "/";
        return base;
    }
}
