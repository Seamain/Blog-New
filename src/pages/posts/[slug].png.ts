import type { APIRoute } from "astro";
import { generateOgImageForPost } from "../../libs/generateOgImages";
import type { Locale } from "../../interfaces/Locale";
import { createFullListOfPost } from "../../api/Post";
// import type Entity from "interfaces/default/Entity";
import type Post from "../../interfaces/Post";

export async function getStaticPaths() {
    const languages: Locale[] = ["en", "fr", "zh-Hans", "zh-Hant-HK"];
    const allLanguagePosts: Post[] = [];

    await Promise.all(
        languages.map(async lang => {
            const posts = await createFullListOfPost();
            allLanguagePosts.push(...posts);
        })
    );

    const postResult = allLanguagePosts.map(post => ({
        params: { slug: post.slug },
        props: post,
    }));

    return [...postResult];
}

export const GET: APIRoute = async ({ props }) =>
    new Response(await generateOgImageForPost(props as Post), {
        headers: { "Content-Type": "image/png" },
    });
