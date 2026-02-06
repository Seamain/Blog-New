import type { APIRoute } from "astro";
import { generateOgImageForPost } from "../../libs/generateOgImages";
import type { Locale } from "../../interfaces/Locale";
import { createFullListOfPost } from "../../api/Post";
// import type Entity from "interfaces/default/Entity";
import type Post from "../../interfaces/Post";

export async function getStaticPaths() {
    try {
        // const allLanguagePosts: Post[] = [];
        const posts: Post[] = await createFullListOfPost();

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

        return [...postResult];
    } catch (error) {
        return [];
    }
}

export const GET: APIRoute = async ({ props }) => {
    try {
        const imageBuffer = await generateOgImageForPost(props as Post);
        return new Response(new Uint8Array(imageBuffer), {
            headers: { "Content-Type": "image/png" },
        });
    } catch (error) {
        console.error(`[PNG GET] Error generating image:`, error instanceof Error ? error.message : String(error));
        return new Response("Error generating image", { status: 500 });
    }
};
