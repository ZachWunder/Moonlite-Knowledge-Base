export interface Post {
  meta: {
    title: string;
    author: string;
    createdAt: string;
  };
  content: string;
  slug: string;
}
