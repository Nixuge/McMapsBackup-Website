// Gemini'd piece of shit. Not yet fully understood but working well enough.

import { reactive } from "vue";
import { parseMcBinBuffer, type McBinParsedModel } from "@/ts/utils/McBinLoader";

/**
 * Reactive set of model URLs that are known to have failed to load (e.g. 404 or corrupted).
 * Uses Vue 3's native reactive(Set) so .has(url) is tracked by computed() and .add(url) triggers updates.
 */
export const failedModelUrls = reactive(new Set<string>());

/**
 * Reactive set of model URLs verified available.
 */
export const availableModelUrls = reactive(new Set<string>());

// In-memory raw ArrayBuffer cache to avoid re-fetching .mcbin files
const bufferCache = new Map<string, ArrayBuffer>();

// In-flight fetch promises to deduplicate simultaneous/parallel requests
const inflightFetches = new Map<string, Promise<ArrayBuffer>>();

/**
 * Checks if a model URL is already known to have failed.
 * Because failedModelUrls is a reactive Set, calling this inside a computed()
 * automatically tracks dependency on the set.
 */
export function isModelFailed(url: string): boolean {
    if (!url) return true;
    return failedModelUrls.has(url);
}

/**
 * Marks a model URL as failed so components will not retry loading it.
 * Automatically notifies any computed() watching this URL.
 */
export function markModelFailed(url: string): void {
    if (!url) return;
    failedModelUrls.add(url);
}

/**
 * Preloads a model from a URL and caches its ArrayBuffer in memory.
 * If the fetch fails, automatically marks the URL as failed in the reactive registry.
 */
export async function preloadModel(url: string): Promise<boolean> {
    if (!url) return false;

    // Already failed?
    if (failedModelUrls.has(url)) {
        return false;
    }

    // Already cached?
    if (bufferCache.has(url)) {
        return true;
    }

    // Existing request already in flight?
    const existing = inflightFetches.get(url);
    if (existing) {
        try {
            await existing;
            return true;
        } catch {
            return false;
        }
    }

    // Start fetch and cache
    const fetchPromise = (async () => {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Failed to fetch model (${res.status} ${res.statusText}): ${url}`);
            }
            const buffer = await res.arrayBuffer();

            // Quick validation for MCBN header (Magic 0x4d43424e)
            if (buffer.byteLength < 14) {
                throw new Error("Invalid .mcbin: buffer too small");
            }
            const view = new DataView(buffer);
            if (view.getUint32(0, false) !== 0x4d43424e) {
                throw new Error("Invalid .mcbin: bad magic header");
            }

            bufferCache.set(url, buffer);
            availableModelUrls.add(url);

            return buffer;
        } catch (err) {
            markModelFailed(url);
            throw err;
        } finally {
            inflightFetches.delete(url);
        }
    })();

    inflightFetches.set(url, fetchPromise);

    try {
        await fetchPromise;
        return true;
    } catch {
        return false;
    }
}

/**
 * Loads a model from in-memory cache or network, and returns the parsed Three.js model.
 */
export async function loadModelFromCacheOrUrl(
    url: string,
    signal?: AbortSignal
): Promise<McBinParsedModel> {
    if (!url) {
        throw new Error("No model URL provided");
    }

    if (failedModelUrls.has(url)) {
        throw new Error(`Model known to have failed: ${url}`);
    }

    let buffer = bufferCache.get(url);

    if (!buffer) {
        // If there's an in-flight fetch from hover preload, reuse it
        let fetchPromise = inflightFetches.get(url);
        if (!fetchPromise) {
            fetchPromise = (async () => {
                const res = await fetch(url, { signal });
                if (!res.ok) {
                    throw new Error(`Failed to fetch model (${res.status} ${res.statusText}): ${url}`);
                }
                const buf = await res.arrayBuffer();

                // Validate header
                if (buf.byteLength < 14) {
                    throw new Error("Invalid .mcbin: buffer too small");
                }
                const view = new DataView(buf);
                if (view.getUint32(0, false) !== 0x4d43424e) {
                    throw new Error("Invalid .mcbin: bad magic header");
                }

                bufferCache.set(url, buf);
                availableModelUrls.add(url);

                return buf;
            })();

            inflightFetches.set(url, fetchPromise);
        }

        try {
            buffer = await fetchPromise;
        } catch (err) {
            markModelFailed(url);
            throw err;
        } finally {
            inflightFetches.delete(url);
        }
    }

    return parseMcBinBuffer(buffer);
}
