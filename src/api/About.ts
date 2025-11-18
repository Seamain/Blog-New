import type { About } from "../interfaces/About";
import type Data from "../interfaces/Data";
import strapi from "../libs/strapi";
import unWrap from "../libs/unwrap";
import type { Locale } from "../types/Locale";

export async function getAbout(locale: Locale = "zh-Hans"): Promise<About> {
  const response = await strapi<Data<About>>({
    endpoint: "about",
    query: {
      "fields[0]": "content",
    },
    locale,
  });

  return unWrap(response?.data);
}
