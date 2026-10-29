import Markdown from "markdown-it";

// Strapi content separates images, captions and lines with single newlines,
// so soft breaks render as <br> instead of collapsing into one paragraph.
const md = Markdown({ breaks: true });

const defaultImage =
  md.renderer.rules.image ??
  ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));

md.renderer.rules.image = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  token.attrSet("loading", "lazy");
  token.attrSet("decoding", "async");
  return defaultImage(tokens, idx, options, env, self);
};

md.renderer.rules.table_open = () => '<div class="table-wrap"><table>';
md.renderer.rules.table_close = () => "</table></div>";

export function renderMarkdown(source: string): string {
  return md.render(source ?? "");
}

/** Plain-text excerpt for meta descriptions and fallbacks. */
export function excerpt(source: string, length = 120): string {
  const text = renderMarkdown(source)
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > length ? `${text.slice(0, length).trimEnd()}…` : text;
}
