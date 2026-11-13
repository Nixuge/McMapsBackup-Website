export class Download {
    constructor(public name: string, public url: string, public community?: string) {}
}

export type DownloadInput = Download[] | Download | string;

import { sanitize } from "@/ts/utils/TextUtils";

let nextAutoId = 10000;

export abstract class ServerMap {
    public sanitizedMinigame: string;
    public sanitizedMapName: string;
    public downloads: Download[];
    public id: number;

    constructor(
        public minigame: string,
        public mapName: string,
        downloads?: DownloadInput,
        id?: number,
        public commentaries?: string,
        public builders?: string
    ) {
        this.sanitizedMinigame = sanitize(minigame);
        this.sanitizedMapName = sanitize(mapName);
        this.id = id !== undefined ? id : nextAutoId++;
        this.downloads = this.normalizeDownloads(downloads);
    }

    protected getDefaultDownloadName(): string {
        return "Main download";
    }

    private normalizeDownloads(input?: DownloadInput): Download[] {
        if (Array.isArray(input))
            return input;

        if (typeof input === "string") {
            const fileName = input.endsWith(".zip") ? input : `${input}.zip`;
            return [new Download(this.getDefaultDownloadName(), fileName)];
        }
        
        if (input === undefined) {
            return [new Download(this.getDefaultDownloadName(), `${this.sanitizedMapName}.zip`)];
        }

        return [input];
    }

    abstract getBaseUrl(file: boolean): string; 

    public getDownloadUrl(filename: string) {
        return this.getBaseUrl(true) + filename;
    }
    
    public getPreviewUrl() {
        const prefix = import.meta.env.DEV ? "https://maps.nixuge.me" : "";
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
}
