import { Download, ServerMap } from "@/ts/server/ServerMap";
import { sanitize } from "@/ts/utils/TextUtils";

export class WildyaMap extends ServerMap {
    constructor(minigame: string, mapName: string, id: number, downloads?: Download[], commentaries?: string) {
            if (downloads === undefined) // This double sanitizes the name but makes things so much more convenient
                downloads = [new Download("Téléchargement Principal", sanitize(mapName) + ".zip")]
            
            super(minigame, mapName, downloads, id, commentaries)
        }

    getBaseUrl(file: boolean): string {        
        let base = "/static/wildya/";
        base += (file) ? "zip/" : "img/";
        base += this.sanitizedMinigame + "/";
        return base;
    }
}