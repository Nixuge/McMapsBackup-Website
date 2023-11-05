import { Download, ServerMap } from "@/ts/server/ServerMap";

export class ErisiumMap extends ServerMap {
    constructor(minigame: string, mapName: string,
        downloads: Download[], id: number, 
        commentaries?: string) {
            super(minigame, mapName, downloads, id, commentaries)
        }

    getBaseUrl(file: boolean): string {        
        let base = "/static/erisium/";
        base += (file) ? "zip/" : "img/";
        base += this.sanitizedMinigame + "/";
        return base;
    }
}