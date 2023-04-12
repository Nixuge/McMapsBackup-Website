import { reactive } from "vue";

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
    id: string
    preview_url: string
    downloads: Array<Download>

    constructor(minigame: string, map_name: string, builders: string, preview_url: string, downloads: Array<Download>) {
        this.minigame = minigame;
        this.map_name = map_name;
        this.builders = builders;
        this.preview_url = preview_url;
        this.downloads = downloads;
        this.id = minigame + '_' + map_name;
    }

    static fromJsonDict(map_data_dict: any) {
        let downloads: Array<Download> = []
        const downloads_dict = map_data_dict["downloads"]
        for (const dl_name of Object.keys(downloads_dict)) {
            downloads.push(new Download(dl_name, downloads_dict[dl_name]))
        }

        return new McMap(
            map_data_dict["minigame"],
            map_data_dict["map_name"],
            map_data_dict["builders"],
            map_data_dict["preview_url"],
            downloads
        )
    }
}

export const currentMap = reactive(new McMap(
    "",
    "No maps selected",
    "",
    "https://hivebackup.github.io/static/previews/Gravity/pacman.png",
    []
))

export function setCurrentMap(newMap: McMap) {
    // Not the prettiest, thought i could reassign the reactive
    currentMap.minigame = newMap.minigame;
    currentMap.map_name = newMap.map_name;
    currentMap.builders = newMap.builders;
    currentMap.preview_url = newMap.preview_url;
    currentMap.downloads = newMap.downloads;
    currentMap.id = newMap.id;
    
}