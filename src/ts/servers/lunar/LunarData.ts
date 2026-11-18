import { ITagsMeta } from "@/ts/server/IServerMeta";
import { LunarMap as LunMap } from "./LunarMap";
import { Download as Dl } from "@/ts/server/ServerMap";

const Game: Array<string> = [
    "General",
    "UHC",
    "Wool",
    "HCT",
    "Bow Sumo",
    "Battle Rush",
    "Lucky Shot",
    "Stick Fight",
    "Pearl Fight",
    "Final UHC",
    "Obstacles",
    "Sumo",
    "Spleef",
    "Bridges",
    "SoupPvP",
];

const GENERAL_GAMES = [
    "Soup HG",
    "Boxing",
    "Arcade",
    "Debuff",
    "OP Soup",
    "No Debuff",
    "OP Duel",
    "Arcade Mashup",
    "Archer",
    "Gapple",
    "Soup",
    "Combo",
    "Vanilla",
    "Axe",
    "SG",
];

const UHC_GAMES = [
    "Hypixel UHC",
    "Dual Wield",
    "BuildUHC",
];

const WOOL_GAMES = [
    "Bed Fight",
    "Top Bridge Fight",
];

const HCT_GAMES = [
    "HCT Debuff",
    "HCT No Debuff",
];

export const LUNAR_MAPS: Array<LunMap> = [
    new LunMap(Game[0], "Avengers", "avengers.zip", GENERAL_GAMES),
    new LunMap(Game[0], "Backyard", "backyard.zip", GENERAL_GAMES),
    new LunMap(Game[0], "Barnyard", "barnyard.zip", GENERAL_GAMES),
    new LunMap(Game[0], "Candyland", "candyland.zip", GENERAL_GAMES),
    new LunMap(Game[0], "Cathedral", "cathedral.zip", GENERAL_GAMES),
    new LunMap(Game[0], "Construction", "construction.zip", GENERAL_GAMES),
    new LunMap(Game[0], "Daisy", "daisy.zip", GENERAL_GAMES),
    new LunMap(Game[0], "Game of Thrones", "game_of_thrones.zip", GENERAL_GAMES),
    new LunMap(Game[0], "Groot", "groot.zip", GENERAL_GAMES),
    new LunMap(Game[0], "Mushroom Forest", "mushroom_forest.zip", GENERAL_GAMES),
    new LunMap(Game[0], "Old Western", "old_western.zip", GENERAL_GAMES),
    new LunMap(Game[0], "Pac-Man", "pac_man.zip", GENERAL_GAMES),
    new LunMap(Game[0], "Perry", "perry.zip", GENERAL_GAMES),
    new LunMap(Game[0], "Quidditch", "quidditch.zip", GENERAL_GAMES),
    new LunMap(Game[0], "Skull Island", "skull_island.zip", GENERAL_GAMES),
    new LunMap(Game[0], "Sonic", "sonic.zip", GENERAL_GAMES),

    new LunMap(Game[1], "Beach", "beach.zip", UHC_GAMES),
    new LunMap(Game[1], "End", "end.zip", UHC_GAMES),
    new LunMap(Game[1], "Ocean Floor", "ocean_floor.zip", UHC_GAMES),
    new LunMap(Game[1], "Pumpkin Patch", "pumpkin_patch.zip", UHC_GAMES),
    new LunMap(Game[1], "Swamp", "swamp.zip", UHC_GAMES),
    new LunMap(Game[1], "Winter", "winter.zip", UHC_GAMES),

    new LunMap(Game[2], "City", "city.zip", WOOL_GAMES),
    new LunMap(Game[2], "Court House", "court_house.zip", WOOL_GAMES),
    new LunMap(Game[2], "Ferris Wheel", "ferris_wheel.zip", WOOL_GAMES),
    new LunMap(Game[2], "Modern", "modern.zip", WOOL_GAMES),
    new LunMap(Game[2], "Skull Island", "skull_island.zip", WOOL_GAMES),

    new LunMap(Game[3], "Arch", "arch.zip", HCT_GAMES),
    new LunMap(Game[3], "Kitmap Tourn", "kitmap_tourn.zip", HCT_GAMES),
    new LunMap(Game[3], "Map 7 Citadel", "map_7_citadel.zip", HCT_GAMES),
    new LunMap(Game[3], "Nether Road", "nether_road.zip", HCT_GAMES),

    new LunMap(Game[4], "End", "end.zip"),
    new LunMap(Game[4], "Mario", "mario.zip"),
    new LunMap(Game[4], "Surfboard", "surfboard.zip"),
    new LunMap(Game[4], "Traffic", "traffic.zip"),

    new LunMap(Game[5], "Boneyard", "boneyard.zip"),
    new LunMap(Game[5], "End", "end.zip"),
    new LunMap(Game[5], "Ocean Floor", "ocean_floor.zip"),
    new LunMap(Game[5], "Tree", "tree.zip"),

    new LunMap(Game[6], "Cave", "cave.zip"),
    new LunMap(Game[6], "Mario", "mario.zip"),
    new LunMap(Game[6], "Poker", "poker.zip"),

    new LunMap(Game[7], "Desert", "desert.zip"),
    new LunMap(Game[7], "End", "end.zip"),
    new LunMap(Game[7], "Frozen", "frozen.zip"),
    new LunMap(Game[7], "Mushroom", "mushroom.zip"),
    new LunMap(Game[7], "Solar System", "solar_system.zip"),

    new LunMap(Game[8], "Basketball", "basketball.zip"),
    new LunMap(Game[8], "Candyland", "candyland.zip"),
    new LunMap(Game[8], "Northern Lights", "northern_lights.zip"),
    new LunMap(Game[8], "Old Western", "old_western.zip"),
    new LunMap(Game[8], "Pokemon", "pokemon.zip"),
    new LunMap(Game[8], "Poker", "poker.zip"),
    new LunMap(Game[8], "Snowflake", "snowflake.zip"),
    new LunMap(Game[8], "Traffic", "traffic.zip"),

    new LunMap(Game[9], "Desert", "desert.zip"),
    new LunMap(Game[9], "Plains", "plains.zip"),
    new LunMap(Game[9], "Sahara Desert", "sahara_desert.zip"),
    new LunMap(Game[9], "Tree", "tree.zip"),
    new LunMap(Game[9], "Winter", "winter.zip"),

    new LunMap(Game[10], "Nether", "nether.zip"),
    new LunMap(Game[10], "Sand Castle", "sand_castle.zip"),
    new LunMap(Game[10], "Sword", "sword.zip"),
    new LunMap(Game[10], "Tree", "tree.zip"),
    new LunMap(Game[10], "Winter", "winter.zip"),

    new LunMap(Game[11], "Aquarium", "aquarium.zip"),
    new LunMap(Game[11], "Candyland", "candyland.zip"),
    new LunMap(Game[11], "Forest", "forest.zip"),
    new LunMap(Game[11], "Ocean Floor", "ocean_floor.zip"),
    new LunMap(Game[11], "Tropical Mesa", "tropical_mesa.zip"),
    new LunMap(Game[11], "Winter", "winter.zip"),

    new LunMap(Game[12], "Frozen", "frozen.zip"),
    new LunMap(Game[12], "Northern Lights", "northern_lights.zip"),

    new LunMap(Game[13], "Candyland", "candyland.zip"),
    new LunMap(Game[13], "Holiday", "holiday.zip"),
    new LunMap(Game[13], "Retro", "retro.zip"),
    new LunMap(Game[13], "Treasure", "treasure.zip"),
    new LunMap(Game[13], "Tree", "tree.zip"),
    new LunMap(Game[13], "Western", "western.zip"),

    new LunMap(Game[14], "SoupPvP", [
        new Dl("Main download", "souppvp.zip"),
        new Dl("Kit list (video)", "kits.mkv"),
    ]),
];

export const LUNAR_TAGS: ITagsMeta = new Map(
    Object.entries({
        game: [...Game, ...GENERAL_GAMES, ...UHC_GAMES,  ...WOOL_GAMES, ...HCT_GAMES]
    })
);
