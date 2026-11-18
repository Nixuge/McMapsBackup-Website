import esbuild from 'esbuild';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const cacheDir = resolve(rootDir, 'node_modules/.cache');

if (!existsSync(cacheDir)) {
    mkdirSync(cacheDir, { recursive: true });
}

const outFile = resolve(cacheDir, 'export-data.mjs');

await esbuild.build({
    entryPoints: [resolve(rootDir, 'scripts/export-data.ts')],
    bundle: true,
    platform: 'node',
    format: 'esm',
    alias: { '@': resolve(rootDir, 'src') },
    define: {
        'import.meta.env.PROD': 'true',
    },
    outfile: outFile,
    logLevel: 'warning',
});

await import(`file://${outFile}?t=${Date.now()}`);
