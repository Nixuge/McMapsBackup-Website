import { DownloadInput, FileType, ServerMap } from "@/ts/server/ServerMap";

export class ErisiumMap extends ServerMap {
    constructor(minigame: string, mapName: string,
        downloads?: DownloadInput, commentaries?: string) {
            super(minigame, mapName, downloads, undefined, commentaries);
        }

    protected override getDefaultDownloadName(): string {
        return "Téléchargement principal";
    }

    getBaseUrl(fileType: FileType): string {        
        let base = "/static/erisium/";
        base += fileType + "/";
        base += this.sanitizedMinigame + "/";
        return base;
    }
}
