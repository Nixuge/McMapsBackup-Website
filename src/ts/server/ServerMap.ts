export class Download {
    name: string
    url: string

    constructor(name: string, url: string) {
        this.name = name;
        this.url = url;
    }
}

// todo (maybe?):
// Have it so that if a string is provided as the downloads,
// It auto generates the array with sanitizedMapName + '.zip' as the url and the given string as the name
// Or just implement it in the server specific maps directly (see WildyaMap & WildyaData)

import { sanitize } from "@/ts/utils/TextUtils";

export abstract class ServerMap {
    public sanitizedMinigame: string;
    public sanitizedMapName: string;

    constructor(public minigame: string, public mapName: string,
        public downloads: Download[], public id: number,
        public commentaries?: string, public builders?: string) {
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