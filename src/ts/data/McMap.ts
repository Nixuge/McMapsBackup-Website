export class Download {
    name: string
    url: string

    constructor(name: string, url: string) {
        this.name = name;
        this.url = url;
    }
}

export class McMap {
    url: string

    constructor(public minigame: string, public map_name: string, public builders: string,
        public preview_url: string, public downloads: Array<Download>,
        public commentaries?: string) {
        this.url = minigame.toLowerCase().replace(" ", "") + '/' + map_name;
    }
}