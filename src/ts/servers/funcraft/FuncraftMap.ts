import { DownloadInput, ServerMap } from "@/ts/server/ServerMap";

export class FuncraftMap extends ServerMap {

    constructor(minigame: string, mapName: string,
        downloads?: DownloadInput, id?: number, public variant?: string, 
        commentaries?: string) {
            super(minigame, mapName, downloads, id, commentaries);
        }

    protected override getDefaultDownloadName(): string {
        return "Téléchargement principal";
    }

    getBaseUrl(file: boolean): string {        
        let base = "/static/funcraft/";
        base += (file) ? "zip/" : "img/";
        base += this.sanitizedMinigame + "/";
        return base;
    }
}
