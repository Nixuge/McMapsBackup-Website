import { DownloadInput, FileType, ServerMap } from "@/ts/server/ServerMap";
import { sanitize } from "@/ts/utils/TextUtils";

export class LunarMap extends ServerMap {
    public games: string[];
    public sanitizedGames: string[];

    constructor(
        minigame: string,
        mapName: string,
        downloads?: DownloadInput,
        games?: string[],
        commentaries?: string
    ) {
        const assignedGames = games && games.length > 0 ? games : [minigame];
 
        if (commentaries == null && assignedGames.length > 1) {
            commentaries = `Shared map pool for: ${assignedGames.join(", ")}.`
        }

        super(minigame, mapName, downloads, undefined, commentaries);
        this.games = assignedGames;
        this.sanitizedGames = Array.from(
            new Set([this.sanitizedMinigame, ...assignedGames.map((g) => sanitize(g))])
        );
    }

    getBaseUrl(fileType: FileType): string {        
        let base = "/static/lunar/";
        base += fileType + "/";
        base += this.sanitizedMinigame + "/";
        return base;
    }
}
