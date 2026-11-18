import { DownloadInput, FileType, ServerMap } from "@/ts/server/ServerMap";

export class ErisiumMap extends ServerMap {
    constructor(minigame: string, mapName: string,
        downloads?: DownloadInput, id?: number, 
        commentaries?: string) {
            super(minigame, mapName, downloads, id, commentaries);
        }

    getBaseUrl(fileType: FileType): string {        
        let base = "/static/erisium/";
        base += fileType + "/";
        base += this.sanitizedMinigame + "/";
        return base;
    }
}
