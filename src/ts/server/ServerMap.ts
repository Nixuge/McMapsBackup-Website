export class Download {
    name: string
    url: string

    constructor(name: string, url: string) {
        this.name = name;
        this.url = url;
    }
}

import { sanitize } from "@/ts/utils/TextUtils";

export abstract class ServerMap {
    public sanitizedMinigame: string;
    public sanitizedMapName: string;

    constructor(public minigame: string, public mapName: string,
        public downloads: Download[], public id: number, 
        public commentaries?: string) {
            this.sanitizedMinigame = sanitize(minigame);
            this.sanitizedMapName = sanitize(mapName);
        }

    abstract getBaseUrl(file: boolean): string;

    public getDownloadUrl(filename: string) {
        return this.getBaseUrl(true) + filename;
    }
    
    public getPreviewUrl() {
        if (this.minigame == "")
            return "/static/img/unselected.png";
        return `${this.getBaseUrl(false)}${this.sanitizedMapName}.png`;
    }
}


// Default implementation of the getBaseUrl
// May be added into the abstract class above.
// Only case where this isn't used as of now is mineplex w its nanos
export class DefaultServerMap extends ServerMap{
    getBaseUrl(file: boolean): string {
        let base = "/static/";
        base += (file) ? "zip/" : "img/";
        base += this.sanitizedMinigame + "/";
        return base;
    }
}; 