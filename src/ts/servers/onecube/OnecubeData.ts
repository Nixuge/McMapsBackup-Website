import { OnecubeMap as M } from "./OnecubeMap";
import { Download as D } from "@/ts/server/ServerMap";

const Z = "Téléchargement principal";
const K: Array<string> = [
    "Bedwars",
    "Fallen Kingdom",
    "Pitchout",
    "PvpSwap",
    "Lobby",
    "UHC"
];

export const ONECUBE_MAPS: Array<M> = [
    new M(K[0], "Japon", [new D(Z, "japon.zip")], 0, "Celestral (OFLIVE)", "2022"),
    new M(K[0], "Orient", [new D(Z, "orient.zip")], 1, "Celestral (Kaosriper)", "2022"),
    new M(K[0], "Olympe", [new D(Z, "olympe.zip")], 2, "Akiiro_", "2023"),
    new M(K[0], "Médiéval", [new D(Z, "medieval.zip")], 3, "Celestral (OFLIVE, _Aranos)", "2022"),

    new M(K[1], "Punk Hazard", [new D(Z, "punk_hazard.zip")], 10, "Akiiro_, Stylbay", "2023"),
    new M(K[1], "Oasis", [new D(Z, "oasis.zip")], 11, "Akiiro_, Stylbay", "2023"),

    new M(K[2], "Glace", [new D(Z, "glace.zip")], 20, "Akiiro_", "2022"),
    new M(K[2], "Pokemon Arena", [new D(Z, "pokemon_arena.zip")], 21, "Akiiro_", "2023"),
    
    new M(K[3], "Manoir", [new D(Z, "manoir.zip"), new D("Téléchargement deathmatch", "end.zip")], 30, "Version originale (Kaosriper), Version duel (Akiiro_, Stylbay)", "2022"),
    new M(K[3], "Multi Biome", [new D(Z, "multibiome.zip")], 31, undefined, undefined, "Nom original, auteurs et année de création perdus."),

    new M(K[4], "Hub (Version épurée)", [new D(Z, "global.zip"), new D("Téléchargement lobby grief dernier jour", "global_grief.zip")], 40, "VisualMc (Libras_, vGama, airning, Zamal), _kaff, Vakei, IDoraken, Version épurée (Akiiro_, Kaosriper)", "2022", "Parties sur les côtés de la zone VIP malheureusement perdues."),
    new M(K[4], "Lobby BuildBattle", [new D(Z, "buildbattle.zip")], 41, undefined, "2023", "Autheur pas noté? Soit ne s'affichait pas soit oublié."),
    
    new M(K[5], "UHC Run Solo", [new D(Z, "uhc_run_solo.zip")], 50, undefined, undefined, "Quasi sur que les maps sont régenerées à chaque fois, map sauvegardée juste pour le spawn (et parce que j'arrivais a lancer une game qu'en ça)."),
];