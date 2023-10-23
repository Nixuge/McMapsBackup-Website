import { FuncraftMap as M } from "./FuncraftMap";
import { Download as D } from "@/ts/data/ServerMap";

const Z = "Téléchargement principal";
const K: Array<string> = [
    "Lobby",
    "Blitz",
    "HikaBrain",
    "Infecté",
    "Octogone",
    "PVPSmash",
    "RushRetro",
    "RushFast",
    "Rush",
    "LandRush",
    "ShootCraft",
    "SkyWars", // PAS FAIT
    "SurvivalGames"
];

export const MAPS: Array<M> = [
    new M(K[0], "Lobby Survival Games", [new D(Z, "survival_games.zip")], 0),
    new M(K[0], "Lobby Skywars", [new D(Z, "skywars.zip")], 1),
    new M(K[0], "Lobby Rush", [new D("Téléchargement 1", "rush1.zip"), new D("Téléchargement 2", "rush2.zip")], 2),
    new M(K[0], "Lobby PvPSmash", [new D(Z, "pvpsmash.zip")], 3),
    new M(K[0], "Lobby Octogone", [new D(Z, "octogone.zip")], 4),
    new M(K[0], "Lobby LandRush", [new D(Z, "landrush.zip")], 5),
    new M(K[0], "Lobby HikaBrain", [new D(Z, "hikabrain.zip")], 6),
    new M(K[0], "Lobby Blitz", [new D(Z, "blitz.zip")], 7),
    new M(K[0], "Hub Funcraft", [new D(Z, "funcraft_hub.zip")], 8),
    new M(K[0], "Lobby Freecube (Monde A)", [new D("Moins complet", "freecube_a1.zip"), new D("Plus complet", "freecube_a2.zip")], 47, "freecube", "Le 'moins complet' est moins complet, mais tous les blocs y sont originanx. Le 'plus complet' est plus complet, mais j'ai pété deux tapis à un endroit et je me souviens plus d'ou. Rien de dramatique, mais techniquement moins précis que le moins complet."),
    new M(K[0], "Lobby Freecube (Monde B)", [new D(Z, "freecube_b.zip")], 48, "freecube"),
    new M(K[0], "Lobby Freecube (Monde C)", [new D(Z, "freecube_c.zip")], 49, "freecube"),
    new M(K[0], "Lobby Freecube (Monde D)", [new D(Z, "freecube_d.zip")], 50, "freecube"),

    new M(K[1], "Blitz 2v2", [new D(Z, "blitz_2v2.zip")], 9, "2v2", "Les coffres principaux (blocs, arcs) d'en face sont vides."),
    new M(K[1], "Blitz 4x8", [new D(Z, "blitz_4x8.zip")], 10, "4x8", "On peut croire que les escaliers sont pétés mais non c'est vraiment sur la map de base."),
    new M(K[1], "Blitz 8v8", [new D(Z, "blitz_8v8.zip")], 11, "8v8", "Les maps 2v2, 4v4 et 8v8 sont les mêmes"),

    new M(K[2], "HikaBrain 1v1", [new D(Z, "hikabrain_1v1.zip")], 12, "1v1"),
    new M(K[2], "HikaBrain 2v2", [new D(Z, "hikabrain_2v2.zip")], 13, "2v2"),
    new M(K[2], "HikaBrain 4v4", [new D(Z, "hikabrain_4v4.zip")], 14, "4v4"),

    new M(K[3], "Ancien hub", [new D(Z, "ancien_spawn_event.zip")], 15, "event", "Mise en ligne le dernier jour de Funcraft"),
    new M(K[3], "Hub Noel", [new D(Z, "hub_noel_event.zip")], 16, "event", "Mise en ligne le dernier jour de Funcraft"),
    new M(K[3], "Spaceship Interior", [new D(Z, "spaceship_interior.zip")], 17, undefined, "Nom pas officiel"),
    new M(K[3], "Mesa", [new D(Z, "mesa.zip")], 18, "Mesa"),
    new M(K[3], "Green Tree Sewers", [new D(Z, "green_tree_sewers.zip")], 19, undefined, "Nom pas officiel"),
    new M(K[3], "CS Sable", [new D(Z, "cs_sable.zip")], 20, undefined, "Nom pas officiel, map malheureusement pas backup dans son entièreté"),
    new M(K[3], "Mars", [new D(Z, "mars.zip")], 21, undefined, "Nom pas officiel, map malheureusement pas backup dans son entièreté"),
    new M(K[3], "Prison", [new D(Z, "prison.zip")], 22, undefined, "Nom pas officiel, map malheureusement pas backup dans son entièreté"),

    new M(K[4], "Octogone 8èmes", [new D(Z, "octogone_8emes.zip")], 23, "8emes", "Bords plats en stone possiblement manquants, rien de bien grave"),
    new M(K[4], "Octogone quarts", [new D(Z, "octogone_quarts.zip")], 24, "quarts", "Bords plats en stone possiblement manquants, rien de bien grave"),
    new M(K[4], "Octogone demis", [new D(Z, "octogone_demis.zip")], 25, "demis", "Bords plats en stone possiblement manquants, rien de bien grave"),
    new M(K[4], "Octogone finale", [new D(Z, "octogone_finale.zip")], 26, "finale", "Bords plats en stone possiblement manquants, rien de bien grave"),

    new M(K[5], "PvPSmash Solo", [new D("4 joueurs", "pvpsmash_solo_4j.zip"), new D("8 joueurs", "pvpsmash_solo_8j.zip"), new D("9 joueurs", "pvpsmash_solo_9j.zip")], 27, "solo", "Maps avec différents nombres de joueurs au moment de lancer. Pas vrmn de différence, la quantité chunks save sur les bords peut etre variable."),
    new M(K[5], "PvPSmash 8x2", [new D("4 joueurs", "pvpsmash_8x2_4j.zip"), new D("10 joueurs", "pvpsmash_8x2_10j.zip")], 28, "8x2", "Maps avec différents nombres de joueurs au moment de lancer. Pas vrmn de différence, la quantité chunks save sur les bords peut etre variable."),

    new M(K[6], "RushRetro 4x2", [new D(Z, "rushretro_4x2.zip")], 29, "4x2"),
    new M(K[6], "RushRetro 8x2", [new D(Z, "rushretro_8x2.zip")], 30, "8x2"),
    new M(K[6], "RushRetro 8x4", [new D(Z, "rushretro_8x4.zip")], 31, "8x4"),

    new M(K[7], "RushFast 1v1", [], 32, "1v1", "Malheureusement oublié de le save, vu que AZ only et que j'étais concentré sur save les modes de jeux sans AZ à ce moment"),
    new M(K[7], "Rush MDT Fast 2v2", [new D(Z, "rushmdtfast_2v2.zip")], 33, "2v2"),
    new M(K[7], "Rush MDT Fast 4v4", [new D(Z, "rushmdtfast_4v4.zip")], 34, "4v4"),

    new M(K[8], "Rush MDT 2v2", [new D(Z, "rushmdt_2v2.zip")], 35, "2v2"),
    new M(K[8], "Rush MDT 4v4", [new D(Z, "rushmdt_4v4.zip")], 36, "4v4"),
    new M(K[8], "Rush MDT 5v5", [new D(Z, "rushmdt_5v5.zip")], 37, "5v5"),

    new M(K[9], "LandRush 4v6", [new D(Z, "landrush_4x6.zip"), new D("Backup (terrain non vierge mais save plus de chunks vides)", "landrush_4x6_backup.zip")], 38, "4x6"),

    new M(K[10], "Cave", [new D(Z, "cave.zip")], 39, undefined, "Nom pas officiel"),
    new M(K[10], "Factory (blue)", [new D(Z, "factory_blue.zip")], 40, undefined, "Nom pas officiel"),
    new M(K[10], "Factory (red)", [new D(Z, "factory_red.zip")], 41, undefined, "Nom pas officiel"),
    new M(K[10], "Mini Village", [new D(Z, "mini_village.zip")], 42, undefined, "Nom pas officiel"),
    new M(K[10], "Sewers", [new D(Z, "sewers.zip")], 43, undefined, "Nom pas officiel"),
    new M(K[10], "Violet", [new D(Z, "violet.zip")], 44, undefined, "Nom pas officiel"),

    // SKYWARS TODO (LOTS OF MAPS)
    // Current last index: 50 (freecube lobbies)

    new M(K[12], "Map 19ème", [new D(Z, "map_19eme.zip")], 45, undefined, "Build par la Team de construction Ascentia"),
    new M(K[12], "Valdargen", [new D(Z, "valdargen.zip")], 46, undefined, "Build par la Team Rossignol"),
];