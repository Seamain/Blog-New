import type { Locale } from "../types/Locale";

interface Props {
  endpoint: string;
  locale?: Locale;
  query?: Record<string, string>;
  wrappedByKey?: string;
}

export default async function strapi<T>({
  endpoint,
  locale,
  query,
  wrappedByKey,
}: Props): Promise<T> {
  if (endpoint.startsWith("/")) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(import.meta.env.API_URL + "/api/" + endpoint);
  
  console.log(`[Strapi API] Calling: ${url.toString()}`);
  console.log(`[Strapi API] Endpoint: ${endpoint}, Locale: ${locale}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  if (locale) {
    url.searchParams.append("locale", locale);
  }

  console.log(`[Strapi API] Final URL: ${url.toString()}`);

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: "Bearer " + import.meta.env.API_TOKEN,
      "CF-Access-Client-Id": import.meta.env.CF_ACCESS_ID,
      "CF-Access-Client-Secret": import.meta.env.CF_ACCESS_SECRET,
    },
  });

  if (!response.ok) {
    console.log(`[Strapi API] Error Response Status: ${response.status} ${response.statusText}`);
    console.log(`[Strapi API] Error URL: ${url.toString()}`);
    const errorMessage = `API Error: ${response.status} ${response.statusText} for ${url.toString()}`;
    console.error(`[Strapi API] ${errorMessage}`);
    throw new Error(errorMessage);
  }

  console.log(`[Strapi API] Success: ${response.status} for ${url.toString()}`);

  const data = await response.json();

  if (wrappedByKey) {
    return data[wrappedByKey] as T;
  }

  return data as T;
}
