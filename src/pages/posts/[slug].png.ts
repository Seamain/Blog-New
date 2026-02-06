import type { APIRoute } from "astro";
import { generateOgImageForPost } from "../../libs/generateOgImages";
import type { Locale } from "../../interfaces/Locale";
import { createFullListOfPost } from "../../api/Post";
// import type Entity from "interfaces/default/Entity";
import type Post from "../../interfaces/Post";

export async function getStaticPaths() {
    try {
        console.log(`[PNG StaticPaths] Starting getStaticPaths`);
        const languages: Locale[] = ["en", "fr", "zh-Hans", "zh-Hant-HK"];
        // const allLanguagePosts: Post[] = [];
        console.log(`[PNG StaticPaths] Calling createFullListOfPost()`);
        const posts: Post[] = await createFullListOfPost();
        console.log(`[PNG StaticPaths] Got ${posts.length} posts`);

        // await Promise.all(
        //     languages.map(async lang => {
        //         const posts = await createFullListOfPost();
        //         allLanguagePosts.push(...posts);
        //     })
        // );

        const postResult = posts.map(post => ({
            params: { slug: post.slug },
            props: post,
        }));

        console.log(`[PNG StaticPaths] Generated ${postResult.length} static paths`);
        return [...postResult];
    } catch (error) {
        console.error(`[PNG StaticPaths] Error:`, error instanceof Error ? error.message : String(error));
        return [];
    }
}

export const GET: APIRoute = async ({ props }) => {
    try {
        console.log(`[PNG GET] Generating image for post:`, props);
        const imageBuffer = await generateOgImageForPost(props as Post);
        console.log(`[PNG GET] Image generated successfully`);
        return new Response(new Uint8Array(imageBuffer), {
            headers: { "Content-Type": "image/png" },
        });
    } catch (error) {
        console.error(`[PNG GET] Error generating image:`, error instanceof Error ? error.message : String(error));
        return new Response("Error generating image", { status: 500 });
    }
};
