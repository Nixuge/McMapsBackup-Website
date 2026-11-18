import { DownloadInput, FileType, ServerMap } from "@/ts/server/ServerMap";

export class LunarMap extends ServerMap {

    constructor(minigame: string, mapName: string,
        downloads?: DownloadInput, id?: number, public authors?: string, 
        public creationYear?: string, commentaries?: string) {
            super(minigame, mapName, downloads, id, commentaries);
        }

    getBaseUrl(fileType: FileType): string {        
        let base = "/static/lunar/";
        base += fileType + "/";
        base += this.sanitizedMinigame + "/";
        return base;
    }
}
