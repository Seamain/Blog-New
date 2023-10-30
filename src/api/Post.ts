import type Attribute from "../interfaces/Attribute";
import type Data from "../interfaces/Data";
import type Post from "../interfaces/Post";
import strapi from "../libs/strapi";
import unWrap from "../libs/unwrap";
import type { Locale } from "../types/Locale";

export interface SlugAndId {
  id: number;
  slug: string;
}

export async function getPost(id: number): Promise<Post> {
  const response = await strapi<Data<Attribute<Post>>>({
    endpoint: "posts/" + id,
    query: {
      "fields[0]": "title",
      "fields[1]": "content",
      "fields[2]": "createdAt",
      "populate[tags]": "*",
      "populate[author][fields][0]": "name",
      "populate[author][populate][avatar][fields][0]": "formats",
      "populate[category][fields][0]": "slug",
      "populate[category][fields][1]": "name",
    },
  });

  return unWrap(response.data?.attributes);
}

export async function listPosts(
  locale: Locale = "zh-Hans",
  pageSize: number = 5,
  page: number = 1
): Promise<Data<Attribute<Post>[]>> {
  const response = await strapi<Data<Attribute<Post>[]>>({
    endpoint: "posts",
    query: {
      "fields[0]": "slug",
      "fields[1]": "title",
      "fields[2]": "createdAt",
      "fields[3]": "summary",
      "populate[tags]": "*",
      "populate[category][fields][0]": "slug",
      "populate[category][fields][1]": "name",
      "populate[author][fields][0]": "name",
      "sort[0]": "createdAt:desc",
      "populate[author][populate][avatar][fields][0]": "formats",
      "pagination[pageSize]": pageSize.toString(),
      "pagination[page]": page.toString(),
    },
    locale,
  });

  return response;
}

export async function createFullListOfPostSlugWithId(
  locale: Locale = "zh-Hans"
): Promise<SlugAndId[]> {
  let current = 1;
  const result: SlugAndId[] = [];
  const first = await listPosts(locale);

  if (first.meta == null || first.meta == undefined) {
    throw new Error("Meta is null or undefined");
  }

  if (first.meta?.pagination.total === 0) {
    return result;
  }

  if (
    first.meta?.pagination.pageCount === 1 &&
    (first.data != undefined || first.data != null)
  ) {
    result.push(
      ...first.data.map((post) => {
        return {
          id: post.id,
          slug: post.attributes.slug,
        };
      })
    );
    return result;
  }

  if (first.meta.pagination.pageCount == undefined) {
    throw new Error("Page count is undefined");
  }

  while (current <= first.meta.pagination.pageCount) {
    const next = await listPosts(locale, 5, current);

    if (next.data == undefined || next.data == null) {
      throw new Error("Page data is undefined or null");
    }

    result.push(
      ...next.data?.map((post) => {
        return {
          id: post.id,
          slug: post.attributes.slug,
        };
      })
    );

    current++;
  }

  return result;
}

export async function createFullListOfPost(
  locale: Locale = "zh-Hans"
): Promise<Post[]> {
  let current = 1;
  const result: Post[] = [];
  const first = await listPosts(locale);

  if (first.meta == null || first.meta == undefined) {
    throw new Error("Meta is null or undefined");
  }

  if (first.meta?.pagination.total === 0) {
    return result;
  }

  if (
    first.meta?.pagination.pageCount === 1 &&
    (first.data != undefined || first.data != null)
  ) {
    result.push(...first.data.map((post) => post.attributes));
    return result;
  }

  if (first.meta.pagination.pageCount == undefined) {
    throw new Error("Page count is undefined");
  }

  while (current <= first.meta.pagination.pageCount) {
    const next = await listPosts(locale, 5, current);

    if (next.data == undefined || next.data == null) {
      throw new Error("Page data is undefined or null");
    }

    result.push(...next.data?.map((post) => post.attributes));

    current++;
  }

  return result;
}
