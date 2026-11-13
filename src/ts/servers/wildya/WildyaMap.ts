import { DownloadInput, ServerMap } from "@/ts/server/ServerMap";
import { sanitize } from "@/ts/utils/TextUtils";

export class WildyaMap extends ServerMap {
    constructor(minigame: string, mapName: string, id?: number, downloads?: DownloadInput, commentaries?: string) {
        super(minigame, mapName, downloads, id, commentaries);
    }

    protected override getDefaultDownloadName(): string {
        return "Téléchargement Principal";
    }

    getBaseUrl(file: boolean): string {        
        let base = "/static/wildya/";
        base += (file) ? "zip/" : "img/";
        base += this.sanitizedMinigame + "/";
        return base;
    }
}
