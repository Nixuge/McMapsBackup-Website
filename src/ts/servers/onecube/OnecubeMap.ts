import { DownloadInput, FileType, ServerMap } from "@/ts/server/ServerMap";

export class OnecubeMap extends ServerMap {

    constructor(minigame: string, mapName: string,
        downloads?: DownloadInput, id?: number, authors?: string, 
        public creationYear?: string, commentaries?: string) {
            super(minigame, mapName, downloads, id, commentaries, authors);
        }

    protected override getDefaultDownloadName(): string {
        return "Téléchargement principal";
    }

    getBaseUrl(fileType: FileType): string {        
        let base = "/static/onecube/";
        base += fileType + "/";
        base += this.sanitizedMinigame + "/";
        return base;
    }
}
