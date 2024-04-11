import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import postOgImage from "../templates/og-templates/post";
import siteOgImage from "../templates/og-templates/site";
import type Post from "../interfaces/Post";

const fetchFonts = async () => {
    // Regular Font
    const fontFileRegular = await fetch(
        "https://www.1001fonts.com/download/font/ibm-plex-mono.regular.ttf"
    );
    const fontRegular: ArrayBuffer = await fontFileRegular.arrayBuffer();

    // Bold Font
    const fontFileBold = await fetch(
        "https://www.1001fonts.com/download/font/ibm-plex-mono.bold.ttf"
    );
    const fontBold: ArrayBuffer = await fontFileBold.arrayBuffer();

    const taipeiFile = await fetch(
        "https://github.com/JimmyRice/astro-static-resources/raw/main/TaipeiSansTCBeta-Bold.ttf"
    );
    const taipeiFont: ArrayBuffer = await taipeiFile.arrayBuffer();

    return { fontRegular, fontBold, taipeiFont };
};

const { fontRegular, fontBold, taipeiFont } = await fetchFonts();

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
            weight: 600,
            style: "normal",
        },
        {
            name: "Taipei Sans TC Beta",
            data: taipeiFont,
            weight: 600,
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
