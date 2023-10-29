import type Attribute from "./Attribute";
import type Data from "./Data";
import type Post from "./Post";

export default interface Category {
  slug: string;
  name: string;
  posts: Data<Attribute<Post>[]>;
}
