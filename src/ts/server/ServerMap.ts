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
        const prefix = (process.env.NODE_ENV == "development") ? "https://maps.nixuge.me" : "";
        if (this.minigame == "")
            return prefix + "/static/img/unselected.png";
        return `${prefix}${this.getBaseUrl(false)}${this.sanitizedMapName}.png`;
    }
}


// Empty implementation of the ServerMap
// Made only for the "nothing selected" map, which doesn't call getBaseUrl anyways.
export class EmptyServerMap extends ServerMap {
    constructor() {
        super("", "", [], -1);
    }
    getBaseUrl(_: boolean): string {
        return "";
    }
}; 