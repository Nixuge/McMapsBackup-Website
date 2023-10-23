import { sanitize } from "@/ts/utils/TextUtils";
import { Download, AServerMap } from "@/ts/server/AServerMap"


export class MineplexMap extends AServerMap {
    public sanitizedBuilders: string;

    constructor(minigame: string, mapName: string, public builders: string,
        downloads: Download[], id: number, public nano: boolean, 
        commentaries?: string) {
            super(minigame, mapName, downloads, id, commentaries);
            this.sanitizedBuilders = sanitize(builders);
        }
    
    getBaseUrl(zip: boolean) {
        let base = "/static/";
        base += (zip) ? "zip/" : "img/";
        if (this.nano){
            base += "nano/";
        }
        base += sanitize(this.minigame) + "/";
        return base;
    }
}
