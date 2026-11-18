// Gemini'd piece of shit, not the most fun thing to write

import { FUNCRAFT_MAPS } from "@/ts/servers/funcraft/FuncraftData";
import { MINEPLEX_MAPS } from "@/ts/servers/mineplex/MineplexData";
import { ONECUBE_MAPS } from "@/ts/servers/onecube/OnecubeData";
import { WILDYA_MAPS } from "@/ts/servers/wildya/WildyaData";
import { ERISIUM_MAPS } from "@/ts/servers/erisium/ErisiumData";
import { HIVE_MAPS } from "@/ts/servers/hive/HiveData";
import { LUNAR_MAPS } from "@/ts/servers/lunar/LunarData";
import { FileType, ServerMap } from "@/ts/server/ServerMap";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";

export interface ExportDownload {
    name: string;
    filename: string;
    url: string;
    community?: string;
}

export interface ExportMap {
    id: number;
    mapName: string;
    minigame: string;
    image: string;
    model: string;
    downloads: ExportDownload[];
    variant?: string;
    builders?: string;
    authors?: string;
    creationYear?: string;
    nano?: boolean;
    commentaries?: string;
}

export function formatMap(serverName: string, map: ServerMap, baseUrl: string = "https://maps.nixuge.me"): ExportMap {
    const prefix = baseUrl ? baseUrl.replace(/\/$/, "") : "";
    const downloads: ExportDownload[] = (map.downloads || []).map((d) => {
        const item: ExportDownload = {
            name: d.name,
            filename: d.url,
            url: `${prefix}${map.getBaseUrl(FileType.FILE)}${d.url}`,
        };
        if (d.community) {
            item.community = d.community;
        }
        return item;
    });

    const entry: ExportMap = {
        id: map.id,
        mapName: map.mapName,
        minigame: map.minigame,
        image: `${prefix}${map.getBaseUrl(FileType.IMAGE)}${map.sanitizedMapName}.png`,
        model: `${prefix}${map.getBaseUrl(FileType.MODEL)}${map.sanitizedMapName}.mcbin`,
        downloads,
    };

    const anyMap = map as any;

    if (serverName === "mineplex") {
        if (anyMap.builders) entry.builders = anyMap.builders;
        if (anyMap.nano) entry.nano = true;
    } else if (serverName === "onecube") {
        if (anyMap.builders) entry.authors = anyMap.builders;
        if (anyMap.creationYear) entry.creationYear = anyMap.creationYear;
    } else if (serverName === "hive" || serverName === "lunar") {
        const author = anyMap.authors || anyMap.builders;
        if (author) entry.authors = author;
        if (anyMap.creationYear) entry.creationYear = anyMap.creationYear;
    } else if (serverName === "funcraft") {
        if (anyMap.variant) entry.variant = anyMap.variant;
    }

    if (anyMap.commentaries && anyMap.commentaries.trim().length > 0) {
        entry.commentaries = anyMap.commentaries;
    }

    return entry;
}

const SERVERS: Array<{ name: string; maps: ServerMap[] }> = [
    { name: "funcraft", maps: FUNCRAFT_MAPS },
    { name: "mineplex", maps: MINEPLEX_MAPS },
    { name: "onecube", maps: ONECUBE_MAPS },
    { name: "wildya", maps: WILDYA_MAPS },
    { name: "erisium", maps: ERISIUM_MAPS },
    { name: "hive", maps: HIVE_MAPS },
    { name: "lunar", maps: LUNAR_MAPS },
];

function parseArgs() {
    const args = process.argv.slice(2);
    let outDir = "";
    let baseUrl = "https://maps.nixuge.me";
    let wrap = false;
    let dist = false;
    let help = false;

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (arg === "-o" || arg === "--out") {
            outDir = args[++i] || outDir;
        } else if (arg === "--base-url") {
            baseUrl = args[++i] || baseUrl;
        } else if (arg === "--relative") {
            baseUrl = "";
        } else if (arg === "--wrap") {
            wrap = true;
        } else if (arg === "--dist") {
            dist = true;
        } else if (arg === "-h" || arg === "--help") {
            help = true;
        }
    }

    if (!outDir) {
        outDir = dist ? "dist/static" : "exported_data";
    }

    return { outDir, baseUrl, wrap, dist, help };
}

function printHelp() {
    console.log(`
Map Data Exporter CLI
Export map definitions from TypeScript to structured JSON files.

Usage:
  npm run export-data [options]
  npm run export-dist [options]

Options:
  -o, --out <dir>      Output directory for JSON files (default: "exported_data", or "dist/static" with --dist)
  --dist               Export to server subdirectories: <dir>/<server>/<server>_maps.json
  --base-url <url>     Base URL prefix for files, images, and models (default: "https://maps.nixuge.me")
  --relative           Use relative paths (e.g. "/static/...") instead of an absolute URL prefix
  --wrap               Wrap maps array inside an object ({ server, total, maps })
  -h, --help           Show this help message
`);
}

export function runExport() {
    const startTime = Date.now();
    const { outDir, baseUrl, wrap, dist, help } = parseArgs();

    if (help) {
        printHelp();
        return;
    }

    const resolvedOutDir = resolve(process.cwd(), outDir);
    if (!dist && !existsSync(resolvedOutDir)) {
        mkdirSync(resolvedOutDir, { recursive: true });
    }

    console.log(`Exporting map data ${dist ? "to dist layout" : "to"}: ${resolvedOutDir}${dist ? "/<server>/<server>_maps.json" : ""}`);
    console.log(`Base URL prefix: ${baseUrl || "(relative /)"}`);
    console.log(`Output format: ${wrap ? "Wrapped ({ server, total, maps })" : "Raw Array ([...])"}\n`);

    const allServersExport: Record<string, any> = {};
    let grandTotalMaps = 0;

    for (const server of SERVERS) {
        const formattedMaps = server.maps.map((m) => formatMap(server.name, m, baseUrl));
        grandTotalMaps += formattedMaps.length;

        const serverPayload = wrap
            ? { server: server.name, total: formattedMaps.length, maps: formattedMaps }
            : formattedMaps;

        if (dist) {
            const serverDir = join(resolvedOutDir, server.name);
            if (!existsSync(serverDir)) {
                mkdirSync(serverDir, { recursive: true });
            }
            const outPath = join(serverDir, `${server.name}_maps.json`);
            writeFileSync(outPath, JSON.stringify(serverPayload, null, 2), "utf-8");
            console.log(`  ✓ ${server.name.padEnd(10)}: ${String(formattedMaps.length).padStart(4)} maps -> ${outDir}/${server.name}/${server.name}_maps.json`);
        } else {
            const outPath = join(resolvedOutDir, `${server.name}.json`);
            writeFileSync(outPath, JSON.stringify(serverPayload, null, 2), "utf-8");
            allServersExport[server.name] = serverPayload;
            console.log(`  ✓ ${server.name.padEnd(10)}: ${String(formattedMaps.length).padStart(4)} maps -> ${server.name}.json`);
        }
    }

    if (!dist) {
        // Write all_servers.json
        const allServersPath = join(resolvedOutDir, "all_servers.json");
        writeFileSync(allServersPath, JSON.stringify(allServersExport, null, 2), "utf-8");
        console.log(`  ✓ all_servers: ${String(grandTotalMaps).padStart(4)} maps across ${SERVERS.length} servers -> all_servers.json`);

        // Write summary.json
        const summaryPath = join(resolvedOutDir, "summary.json");
        const summary = {
            exportedAt: new Date().toISOString(),
            baseUrl: baseUrl || "",
            totalServers: SERVERS.length,
            totalMaps: grandTotalMaps,
            servers: Object.fromEntries(SERVERS.map((s) => [s.name, s.maps.length])),
        };
        writeFileSync(summaryPath, JSON.stringify(summary, null, 2), "utf-8");
        console.log(`  ✓ summary    : metadata & counts -> summary.json`);
    }

    const elapsed = Date.now() - startTime;
    console.log(`\nSuccessfully exported ${grandTotalMaps} maps in ${elapsed}ms.`);
}

runExport();
