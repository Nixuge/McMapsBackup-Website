import { DownloadInput, FileType, ServerMap } from "@/ts/server/ServerMap";

export class FuncraftMap extends ServerMap {

    constructor(minigame: string, mapName: string,
        downloads?: DownloadInput, id?: number, public variant?: string, 
        commentaries?: string) {
            super(minigame, mapName, downloads, id, commentaries);
        }

    protected override getDefaultDownloadName(): string {
        return "Téléchargement principal";
    }

    getBaseUrl(fileType: FileType): string {        
        let base = "/static/funcraft/";
        base += fileType + "/";
        base += this.sanitizedMinigame + "/";
        return base;
    }
}
