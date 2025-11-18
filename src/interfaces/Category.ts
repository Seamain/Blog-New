import type Post from "./Post";

export default interface Category {
  slug: string;
  name: string;
  posts: Post[];
}
