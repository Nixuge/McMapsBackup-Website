import { Download, AServerMap } from "@/ts/server/AServerMap";

export class FuncraftMap extends AServerMap {

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