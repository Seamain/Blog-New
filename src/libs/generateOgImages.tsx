import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import postOgImage from "../templates/og-templates/post";
import siteOgImage from "../templates/og-templates/site";
import type Post from "../interfaces/Post";

/**
 * Fetch a font with a timeout. Falls back to empty ArrayBuffer on failure.
 * Uses jsDelivr (a fast, reliable CDN that mirrors GitHub & npm) so fonts load
 * at build time without depending on flaky external hosts.
 */
async function fetchFont(url: string, label: string): Promise<ArrayBuffer> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000); // 10s timeout
    try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.arrayBuffer();
    } catch (err) {
        console.warn(
            `[OG Fonts] Failed to fetch ${label}: ${err instanceof Error ? err.message : String(err)}`
        );
        return new ArrayBuffer(0);
    } finally {
        clearTimeout(timer);
    }
}

const fetchFonts = async () => {
    // IBM Plex Mono — served via jsDelivr (npm mirror, highly reliable)
    const [fontRegular, fontBold, cjkFont] = await Promise.all([
        fetchFont(
            "https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-mono@5/files/ibm-plex-mono-latin-400-normal.woff",
            "IBM Plex Mono Regular"
        ),
        fetchFont(
            "https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-mono@5/files/ibm-plex-mono-latin-700-normal.woff",
            "IBM Plex Mono Bold"
        ),
        // Noto Sans SC — Google's CJK font, mirrored on jsDelivr via npm
        fetchFont(
            "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-sc@5/files/noto-sans-sc-chinese-simplified-700-normal.woff",
            "Noto Sans SC Bold (CJK)"
        ),
    ]);
    return { fontRegular, fontBold, cjkFont };
};

let fontRegular: ArrayBuffer;
let fontBold: ArrayBuffer;
let cjkFont: ArrayBuffer;

try {
    ({ fontRegular, fontBold, cjkFont } = await fetchFonts());
} catch (error) {
    console.error(
        "[OG Images] Font fetch failed:",
        error instanceof Error ? error.message : String(error)
    );
    fontRegular = new ArrayBuffer(0);
    fontBold = new ArrayBuffer(0);
    cjkFont = new ArrayBuffer(0);
}

const options: SatoriOptions = {
    width: 1200,
    height: 630,
    embedFont: true,
    fonts: [
        {
            name: "IBM Plex Mono",
            data: fontRegular,
            weight: 400,
            style: "normal",
        },
        {
            name: "IBM Plex Mono",
            data: fontBold,
            weight: 700,
            style: "normal",
        },
        {
            name: "Noto Sans SC",
            data: cjkFont,
            weight: 700,
            style: "normal",
        },
    ],
};

function svgBufferToPngBuffer(svg: string) {
    const resvg = new Resvg(svg);
    const pngData = resvg.render();
    return pngData.asPng();
}

export async function generateOgImageForPost(post: Post) {
    const svg = await satori(postOgImage(post), options);
    return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
    const svg = await satori(siteOgImage(), options);
    return svgBufferToPngBuffer(svg);
}
