import { DownloadInput, ServerMap } from "@/ts/server/ServerMap";

export class ErisiumMap extends ServerMap {
    constructor(minigame: string, mapName: string,
        downloads?: DownloadInput, id?: number, 
        commentaries?: string) {
            super(minigame, mapName, downloads, id, commentaries);
        }

    getBaseUrl(file: boolean): string {        
        let base = "/static/erisium/";
        base += (file) ? "zip/" : "img/";
        base += this.sanitizedMinigame + "/";
        return base;
    }
}
