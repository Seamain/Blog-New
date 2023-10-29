import type Attribute from "./Attribute";
import type Author from "./Author";
import type Category from "./Category";
import type Data from "./Data";

export default interface Post {
  slug: string;
  title: string;
  createdAt: string;
  content: string;
  tags: {
    id: number;
    name: string;
  }[];
  category: Data<Attribute<Category>>;
  author: Data<Attribute<Author>>;
  summary: string;
}
