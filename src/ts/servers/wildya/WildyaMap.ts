import { DownloadInput, FileType, ServerMap } from "@/ts/server/ServerMap";
import { sanitize } from "@/ts/utils/TextUtils";

export class WildyaMap extends ServerMap {
    constructor(minigame: string, mapName: string, id?: number, downloads?: DownloadInput, commentaries?: string) {
        super(minigame, mapName, downloads, id, commentaries);
    }

    protected override getDefaultDownloadName(): string {
        return "Téléchargement Principal";
    }

    getBaseUrl(fileType: FileType): string {        
        let base = "/static/wildya/";
        base += fileType + "/";
        base += this.sanitizedMinigame + "/";
        return base;
    }
}
