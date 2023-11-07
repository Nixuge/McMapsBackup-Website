import { ITagsMeta } from "@/ts/server/IServerMeta";
import { WildyaMap as M } from "./WildyaMap";
import { Download as D, Download } from "@/ts/server/ServerMap";

const Z = "Téléchargement Principal"
const K: Array<string> = [
    "Lobby",
    "TeamFight",
    "TowerFast",
    "TowerBridge",
    "KitFFA",
    "TheTowers"
];

export const WILDYA_MAPS: Array<M> = [
    new M(K[0], "Lobby Global", 0),
    new M(K[0], "Lobby d'attente", 1),

    new M(K[1], "Rush", 100),
    new M(K[1], "Sandstone", 101),
    new M(K[1], "Neon", 102),
    new M(K[1], "Jungle", 103),
    new M(K[1], "Carrefour", 104),
    new M(K[1], "Cercle", 105),
    new M(K[1], "Nether Diagonal", 106),
    new M(K[1], "Prison", 107),
    new M(K[1], "Epee Diagonal", 108),
    new M(K[1], "Rush Diagonal", 109),

    new M(K[2], "Moai", 200),
    new M(K[2], "Mario", 201),
    new M(K[2], "Sakai", 202),
    new M(K[2], "Prunier", 203),
    new M(K[2], "WFC", 204),
    new M(K[2], "Ariane", 205),
    new M(K[2], "Overlook", 206),
    new M(K[2], "Paris", 207),
    new M(K[2], "Nevada", 208),
    new M(K[2], "Toplaya", 209),
    new M(K[2], "Weaver", 210),
    new M(K[2], "Watergate", 211),
    new M(K[2], "TowerLand", 212),
    new M(K[2], "Cyclone", 213),
    new M(K[2], "Classique", 214),
    new M(K[2], "Olympe", 215),
    new M(K[2], "Babylone", 216),

    new M(K[3], "Mario", 300),
    new M(K[3], "Sakai", 301),
    new M(K[3], "Toplaya", 302),
    new M(K[3], "BombBeach", 303),
    new M(K[3], "Classique", 304),

    new M(K[4], "KitFFA Halloween", 400, [new Download(Z, "halloween.zip")]),

    new M(K[5], "TheTowers", 500, [new Download("Téléchargement 1", "thetowers_chests.zip"), new Download("Téléchargement 2", "thetowers_nochests.zip")], "Le téléchargement 1 devrait être complet avec tous les coffres d'une équipe (pas des deux)."),
];

export const WILDYA_TAGS: ITagsMeta = new Map(Object.entries({
    "jeu": K
}));