import { ITagsMeta } from "@/ts/server/IServerMeta";
import { ErisiumMap as EriMap } from "./ErisiumMap";
import { Download as Dl } from "@/ts/server/ServerMap";

const Game: Array<string> = [
    "Lobby",
    "Bedwars",
    "Fallen Kingdom",
    "Classic Brawl - Tower",
    "Classic Brawl - Target",
    "Classic Brawl - Balls Of Steel",
    "Classic Brawl - Blocked In Combat",
    "Classic Brawl - Totem",
    "Arcade - SheepWars",
    "Arcade - Lucky Race",
    "Arcade - Woosh",
    "Arcade - Bomberman",
    "UHC",
    "Practice"
];

const BEDWARS_NOTE = "Les maps Bedwars Duo sont identiques a celles du mode Solo.";
const LR_NOTE = "Maps sauvegardées en 1.8.9 (version originale en 1.10.2).";
const PRACTICE_NOTE = "Version sans arbres utilisée pour NoDebuff, Debuff, Archer. Version avec arbres utilisée pour Final UHC, Combo, Soup, UHC, Survival Games.";

function luckyRaceDl(zip: string) {
    return [
        new Dl("Téléchargement principal", zip),
        new Dl("Pack de textures", "lucky_texturepack.zip")
    ]
}

function practiceDl(noTreeZip: string, treeZip: string) {
    return [
        new Dl("Sans arbres", noTreeZip),
        new Dl("Avec arbres", treeZip)
    ];
}

export const ERISIUM_MAPS: Array<EriMap> = [
    new EriMap(Game[0], "Main Lobby", "main_lobby.zip"),
    new EriMap(Game[0], "Lobby Fallen Kingdom", "fallen_kingdom_lobby.zip"),
    new EriMap(Game[0], "Lobby Practice", "practice_lobby.zip"),
    new EriMap(Game[0], "Lobby Tower", "tower_lobby.zip"),
    new EriMap(Game[0], "Lobby Target", "target_lobby.zip"),
    new EriMap(Game[0], "Lobby Balls Of Steel", "balls_of_steel_lobby.zip"),
    new EriMap(Game[0], "Lobby Blocked In Combat", "blocked_in_combat_lobby.zip"),
    new EriMap(Game[0], "Lobby Totem", "totem_lobby.zip", "pas assez de joueurs pour lancer une partie"),
    new EriMap(Game[0], "Lobby SheepWars", "sheepwars_lobby.zip"),
    new EriMap(Game[0], "Lobby Lucky Race", [new Dl("Version 1.8.9", "lucky_race_lobby_1_8_9.zip"), new Dl("Version 1.10.2", "lucky_race_lobby_1_10_2.zip")], "Version de base en 1.10.2. Forge 1.10.2 et le WorldDownloader ont un problème avec les tripwires dans cette version, la map peut donc manquer ces blocs. La version 1.8.9 n'a pas ce problème."),
    new EriMap(Game[0], "Lobby UHC Meetup (Mesa / Swamp)", "uhc_meetup_lobby_mesa_swamp.zip", "Lobby partagé entre les modes UHC Meetup et UHC Run Solo."),
    new EriMap(Game[0], "Lobby UHC Meetup (Sable)", "uhc_meetup_lobby_sable.zip", "Lobby partagé entre les modes UHC Meetup et UHC Run Solo."),
    new EriMap(Game[0], "Lobby UHC Run Solo (Plaine montagnes)", "uhc_run_solo_lobby_plaine_montagnes.zip", "Lobby partagé entre les modes UHC Meetup et UHC Run Solo."),

    new EriMap(Game[1], "Acropole", "acropole.zip", BEDWARS_NOTE),
    new EriMap(Game[1], "Amazonie", "amazonie.zip", BEDWARS_NOTE),
    new EriMap(Game[1], "Canyon", "canyon.zip", BEDWARS_NOTE),
    new EriMap(Game[1], "Caraïbes", "caraibes.zip", BEDWARS_NOTE),
    new EriMap(Game[1], "Espace", "espace.zip", BEDWARS_NOTE),
    new EriMap(Game[1], "Médiéval", "medieval.zip", BEDWARS_NOTE),
    new EriMap(Game[1], "Plateaux", "plateaux.zip", BEDWARS_NOTE),
    new EriMap(Game[1], "Prototype", "prototype.zip", BEDWARS_NOTE),

    new EriMap(Game[2], "Plaine", "plaine.zip"),
    new EriMap(Game[2], "Taïga", "taiga.zip"),

    new EriMap(Game[3], "Classique (5vs5)", "classique_5v5.zip"),

    new EriMap(Game[4], "FarWest", "farwest.zip"),
    new EriMap(Game[4], "Gray Void", "gray_void.zip"),
    new EriMap(Game[4], "HeightDifferenceGreen", "height_difference_green.zip"),
    new EriMap(Game[4], "Orange Green Spiral", "orange_green_spiral.zip"),
    new EriMap(Game[4], "Plain River Rainbow", "plain_river_rainbow.zip"),
    new EriMap(Game[4], "Wooden Platforms", "wooden_platforms.zip"),

    new EriMap(Game[5], "Classique", [new Dl("Coin début", "classique_coin_debut.zip"), new Dl("Fin abîmée", "classique_fin_abimee.zip")]),

    new EriMap(Game[6], "Classique", "classique.zip"),

    new EriMap(Game[7], "Totem", [], "Pas assez de joueurs pour lancer une partie (8 joueurs)."),

    new EriMap(Game[8], "Dirigeables", "dirigeables.zip"),
    new EriMap(Game[8], "Frégates", "fregates.zip"),
    new EriMap(Game[8], "Galeries", "galeries.zip"),
    new EriMap(Game[8], "Galions", "galions.zip"),
    new EriMap(Game[8], "Gravity", "gravity.zip"),
    new EriMap(Game[8], "Marais", "marais.zip"),
    new EriMap(Game[8], "Royaumes", "royaumes.zip"),

    new EriMap(Game[9], "Désert Pik Pik", luckyRaceDl("desert_pik_pik.zip"), LR_NOTE),
    new EriMap(Game[9], "Evasion", luckyRaceDl("evasion.zip"), LR_NOTE),
    new EriMap(Game[9], "Industrie", luckyRaceDl("industrie.zip"), LR_NOTE),
    new EriMap(Game[9], "Lagon", luckyRaceDl("lagon.zip"), LR_NOTE),
    new EriMap(Game[9], "Mont Glagla", luckyRaceDl("mont_glagla.zip"), LR_NOTE),
    new EriMap(Game[9], "Pride", luckyRaceDl("pride.zip"), LR_NOTE),
    new EriMap(Game[9], "Savane", luckyRaceDl("savane.zip"), LR_NOTE),
    new EriMap(Game[9], "The Wall", luckyRaceDl("the_wall.zip"), LR_NOTE),

    new EriMap(Game[10], "Island", "island.zip"),
    new EriMap(Game[10], "Oasis", "oasis.zip"),
    new EriMap(Game[10], "Tiki Tiki", "tiki_tiki.zip"),

    new EriMap(Game[11], "Classique", "classique.zip"),

    new EriMap(Game[12], "Génération Aléatoire", [], "Les parties UHC Run Solo et UHC Meetup se jouaient sur des maps générées aléatoirement. Seuls les lobbies d'attente ont pu être sauvegardés (disponibles dans la catégorie Lobby)."),

    new EriMap(Game[13], "BrickSide", practiceDl("brickside.zip", "brickside_trees.zip"), PRACTICE_NOTE),
    new EriMap(Game[13], "Debuff", practiceDl("debuff.zip", "debuff_trees.zip"), PRACTICE_NOTE),
    new EriMap(Game[13], "IndianTop", practiceDl("indiantop.zip", "indiantop_trees.zip"), PRACTICE_NOTE),
    new EriMap(Game[13], "NoDebuff", practiceDl("nodebuff.zip", "nodebuff_trees.zip"), PRACTICE_NOTE),
    new EriMap(Game[13], "Statues", practiceDl("statues.zip", "statue_trees.zip"), PRACTICE_NOTE),
    new EriMap(Game[13], "TopBorders", practiceDl("topborders.zip", "topborders_trees.zip"), PRACTICE_NOTE),
    new EriMap(Game[13], "Japan Sakura", "japan_sakura.zip", "Map identique avec ou sans arbres."),
    new EriMap(Game[13], "Japan Red", [new Dl("Avec arbres", "japan_red_trees.zip")], "Version sans arbres introuvable/non sauvegardée (la version avec arbres peut être nettoyée en supprimant les arbres)."),
];

export const ERISIUM_TAGS: ITagsMeta = new Map(Object.entries({
    "jeu": Game,
}));
