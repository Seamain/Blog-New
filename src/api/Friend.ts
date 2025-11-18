import type Data from "../interfaces/Data";
import type { Friend } from "../interfaces/Friend";
import strapi from "../libs/strapi";

export async function getFriend(): Promise<Data<Friend[]>> {
  const response = await strapi<Data<Friend[]>>({
    endpoint: "friends",
    query: {
      "fields[0]": "slug",
      "fields[1]": "name",
      "fields[2]": "links",
      "fields[3]": "descriptions",
    },
  });

  return response;
}
