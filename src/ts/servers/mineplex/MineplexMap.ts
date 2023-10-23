import { sanitize } from "@/ts/utils/TextUtils";
import { Download, ServerMap } from "@/ts/server/ServerMap"


export class MineplexMap extends ServerMap {
    public sanitizedBuilders: string;

    constructor(minigame: string, mapName: string, public builders: string,
        downloads: Download[], id: number, public nano: boolean, 
        commentaries?: string) {
            super(minigame, mapName, downloads, id, commentaries);
            this.sanitizedBuilders = sanitize(builders);
        }
    
    getBaseUrl(zip: boolean) {
        let base = "/static/mineplex/";
        base += (zip) ? "zip/" : "img/";
        if (this.nano){
            base += "nano/";
        }
        base += sanitize(this.minigame) + "/";
        return base;
    }
}
