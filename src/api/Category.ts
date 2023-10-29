import type Attribute from "../interfaces/Attribute";
import type Category from "../interfaces/Category";
import type Data from "../interfaces/Data";
import strapi from "../libs/strapi";
import type { Locale } from "../types/Locale";
import unWrap from "../libs/unwrap";

export interface SlugAndId {
  id: number;
  slug: string;
}

export async function getCategory(id: number): Promise<Category> {
  const response = await strapi<Data<Attribute<Category>>>({
    endpoint: "categories/" + id,
    query: {
      "populate[posts][fields][0]": "slug",
      "populate[posts][fields][1]": "title",
      "populate[posts][fields][2]": "summary",
      "populate[posts][sort][0]": "createdAt:desc",
    },
  });

  return unWrap(response.data?.attributes);
}

export async function listCategory(
  locale: Locale = "zh-Hans",
  pageSize: number = 6,
  page: number = 1
): Promise<Data<Attribute<Category>[]>> {
  const response = await strapi<Data<Attribute<Category>[]>>({
    endpoint: "categories",
    query: {
      "fields[0]": "slug",
      "fields[1]": "name",
      "populate[posts][fields][0]": "slug",
      "populate[posts][sort][0]": "createdAt:desc",
      "populate[posts][fields][1]": "title",
      "populate[posts][fields][2]": "summary",
      "pagination[pageSize]": pageSize.toString(),
      "pagination[page]": page.toString(),
    },
    locale,
  });

  return response;
}

export async function createFullListOfCategory(
  locale: Locale = "zh-Hans"
): Promise<Category[]> {
  let current = 1;
  const result: Category[] = [];
  const first = await listCategory(locale);

  if (first.meta == null || first.meta == undefined) {
    throw new Error("Meta is null or undefined");
  }

  if (first.meta.pagination.total === 0) {
    return result;
  }

  if (
    first.meta.pagination.pageCount === 1 &&
    (first.data != undefined || first.data != null)
  ) {
    result.push(...first.data.map((category) => category.attributes));
    return result;
  }

  if (first.meta.pagination.pageCount == undefined) {
    throw new Error("Page count is undefined");
  }

  while (current <= first.meta.pagination.pageCount) {
    const next = await listCategory(locale, 6, current);

    if (next.data == undefined || next.data == null) {
      throw new Error("Page data is undefined or null");
    }

    result.push(...next.data?.map((category) => category.attributes));

    current++;
  }

  return result;
}

export async function createFullListOfCategorySlugWithId(
  locale: Locale = "zh-Hans"
): Promise<SlugAndId[]> {
  let current = 1;
  const result: SlugAndId[] = [];
  const first = await listCategory(locale);

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
      ...first.data.map((category) => {
        return {
          id: category.id,
          slug: category.attributes.slug,
        };
      })
    );
    return result;
  }

  if (first.meta.pagination.pageCount == undefined) {
    throw new Error("Page count is undefined");
  }

  while (current <= first.meta.pagination.pageCount) {
    const next = await listCategory(locale, 6, current);

    if (next.data == undefined || next.data == null) {
      throw new Error("Page data is undefined or null");
    }

    result.push(
      ...next.data?.map((category) => {
        return {
          id: category.id,
          slug: category.attributes.slug,
        };
      })
    );

    current++;
  }

  return result;
}
