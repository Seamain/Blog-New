/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly API_URL: string;
    readonly API_TOKEN: string;
    readonly CF_ACCESS_ID: string;
    readonly CF_ACCESS_SECRET: string
}