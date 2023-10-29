import type { Navigation } from "../interfaces/Navigation";
import strapi from "../libs/strapi";

export async function getNavigationRender(
  navigationName: string
): Promise<Navigation[]> {
  const response = await strapi<Navigation[]>({
    endpoint: `navigation/render/${navigationName}`,
  });

  return response;
}
