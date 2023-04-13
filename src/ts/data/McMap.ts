import { sanitize } from "../TextUtils";

export class Download {
    name: string
    url: string

    constructor(name: string, url: string) {
        this.name = name;
        this.url = url;
    }
}

export class McMap {
    public sanitizedMinigame: string;
    public sanitizedMapName: string;
    public sanitizedBuilders: string;

    constructor(public minigame: string, public mapName: string, public builders: string,
        public downloads: Array<Download>, public id: number, public nano: boolean, 
        public commentaries?: string) {
            this.sanitizedMinigame = sanitize(minigame);
            this.sanitizedMapName = sanitize(mapName);
            this.sanitizedBuilders = sanitize(builders);
        }
    
    private getBaseUrl(zip: boolean) {
        let base = "/static/"
        base += (zip) ? "zip/" : "img/"
        if (this.nano){
            base += "nano/"
        }
        base += sanitize(this.minigame) + "/"
        return base
    }

    public getDownloadUrl(filename: string) {
        return this.getBaseUrl(true) + filename
    }

    public getPreviewUrl() {
        if (this.minigame == "") {
            // TODO: return a placeholder for invalid entries (eg. preview)
            return "https://hivebackup.github.io/static/previews/Lobbies/arcade-shuffle.png"
        }

        const full_url = `${this.getBaseUrl(false)}${sanitize(this.mapName)}.png`
        // return full_url
        return "https://hivebackup.github.io/static/previews/Lobbies/arcade-shuffle.png"
    }
}