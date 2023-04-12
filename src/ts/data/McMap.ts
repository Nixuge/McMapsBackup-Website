export class Download {
    name: string
    url: string
    
    constructor(name: string, url: string) {
        this.name = name;
        this.url = url;
    }
}

export class McMap {
    minigame: string
    map_name: string
    builders: string
    url: string
    preview_url: string
    downloads: Array<Download>

    constructor(minigame: string, map_name: string, builders: string, preview_url: string, downloads: Array<Download>) {
        this.minigame = minigame;
        this.map_name = map_name;
        this.builders = builders;
        this.preview_url = preview_url;
        this.downloads = downloads;
        this.url = minigame.toLowerCase().replace(" ", "") + '/' + map_name;
    }
}