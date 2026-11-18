import { sanitize } from "@/ts/utils/TextUtils";
import { DownloadInput, FileType, ServerMap } from "@/ts/server/ServerMap";

export class MineplexMap extends ServerMap {
    public sanitizedBuilders: string;

    constructor(
        minigame: string,
        mapName: string,
        public builders: string,
        downloads?: DownloadInput,
        id?: number,
        public nano: boolean = false, 
        commentaries?: string
    ) {
        super(minigame, mapName, downloads, id, commentaries, builders);
        this.sanitizedBuilders = sanitize(builders);
    }
    
    getBaseUrl(fileType: FileType): string {
        let base = "/static/mineplex/";
        base += fileType + "/";
        if (this.nano){
            base += "nano/";
        }

        // Kinda ugly workaround to have cakewars solo screenshots to work on standard too
        // iirc they're a bit different but should be fine.
        base += (this.sanitizedMinigame == "cakewarsstandard") ?
            "cakewarssoloduos/" : 
            this.sanitizedMinigame + "/";
        return base;
    }
}
