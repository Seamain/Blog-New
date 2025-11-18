import type Author from "./Author";
import type Category from "./Category";

export default interface Post {
  slug: string;
  documentId: string;
  title: string;
  createdAt: string;
  content: string;
  tags: {
    id: number;
    name: string;
  }[];
  category: Category;
  author: Author;
  summary: string;
}
