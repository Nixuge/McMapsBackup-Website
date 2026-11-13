import { DownloadInput, ServerMap } from "@/ts/server/ServerMap";

export class OnecubeMap extends ServerMap {

    constructor(minigame: string, mapName: string,
        downloads?: DownloadInput, id?: number, authors?: string, 
        public creationYear?: string, commentaries?: string) {
            super(minigame, mapName, downloads, id, commentaries, authors);
        }

    protected override getDefaultDownloadName(): string {
        return "Téléchargement principal";
    }

    getBaseUrl(file: boolean): string {        
        let base = "/static/onecube/";
        base += (file) ? "zip/" : "img/";
        base += this.sanitizedMinigame + "/";
        return base;
    }
}
