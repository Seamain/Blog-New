import type { Root } from "mdast";

type MarkdownNode = {
  type: "root" | "heading" | "paragraph";
  value?: string;
  children?: MarkdownNode[];
};

export function simplifyMarkdownAST(node: Root): MarkdownNode {
  const simplifiedNode: MarkdownNode = {
    type: node.type,
  };

  node.children.forEach((node) => {
    if (node.type === "heading" || node.type === "paragraph") {
      simplifiedNode.value = node.children
        .filter((child: any) => child.type === "text")
        .map((textNode: any) => textNode.value)
        .join(" ");
    }

    if (
      node.type == "heading" ||
      (node.type == "paragraph" && node.children.length > 0)
    ) {
      simplifiedNode.children = node.children.map((child: any) =>
        simplifyMarkdownAST(child)
      );
    }
  });

  return simplifiedNode;
}
