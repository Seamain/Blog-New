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

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  if (locale) {
    url.searchParams.append("locale", locale);
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: "Bearer " + import.meta.env.API_TOKEN,
      "CF-Access-Client-Id": import.meta.env.CF_ACCESS_ID,
      "CF-Access-Client-Secret": import.meta.env.CF_ACCESS_SECRET,
    },
  });

  if (!response.ok) {
    throw new Error(
      "Response is not OK: " + response.status + " " + response.statusText
    );
  }

  const data = await response.json();

  if (wrappedByKey) {
    return data[wrappedByKey] as T;
  }

  return data as T;
}
