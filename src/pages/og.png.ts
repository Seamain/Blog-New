import type { APIRoute } from "astro";
import { generateOgImageForSite } from "../libs/generateOgImages";

export const GET: APIRoute = async () =>
    new Response(await generateOgImageForSite(), {
        headers: { "Content-Type": "image/png" },
    });
