import { Download, ServerMap } from "@/ts/data/ServerMap";

export class FuncraftMap extends ServerMap {

    constructor(minigame: string, mapName: string,
        downloads: Download[], id: number, public variant?: string, 
        commentaries?: string) {
            super(minigame, mapName, downloads, id, commentaries)
        }

    getBaseUrl(file: boolean): string {
        let base = "/static/";
        base += (file) ? "zip/" : "img/";
        base += this.sanitizedMinigame + "/";
        return base;
    }
}