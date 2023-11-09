import { Download, ServerMap } from "@/ts/server/ServerMap";

export class OnecubeMap extends ServerMap {

    constructor(minigame: string, mapName: string,
        downloads: Download[], id: number, authors?: string, 
        public creationYear?: string, commentaries?: string) {
            super(minigame, mapName, downloads, id, commentaries, authors)
        }

    getBaseUrl(file: boolean): string {        
        let base = "/static/onecube/";
        base += (file) ? "zip/" : "img/";
        base += this.sanitizedMinigame + "/";
        return base;
    }
}