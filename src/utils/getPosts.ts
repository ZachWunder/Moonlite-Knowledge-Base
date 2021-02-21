import fs from 'fs';
import { join } from 'path';

import matter from 'gray-matter';

import { Post } from './IPost';

const postsDirectory = join(process.cwd(), '/src/content');

/*
Get slugs of all posts
*/
export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory);
}

/*
Parses front matter
Returns meta tags, content and slug
*/
export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  console.log(data);
  const { title, author, createdAt } = data;

  if (data.isEmpty) {
    throw new Error(`${slug} post has no front matter`);
  } else if (!title && !author && !createdAt) {
    throw new Error(`${slug} post doesn't have all front matter fields`);
  }
  console.log(String(data.createdAt));
  const date = new Date(data.createdAt);
  return {
    meta: { title, author, createdAt: date.toLocaleDateString('en-US') },
    content,
    slug: realSlug,
  };
}

/*
Gets full Post for all posts in content directory
*/
export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.meta.createdAt > post2.meta.createdAt ? -1 : 1));

  console.log(posts);
  return posts;
}
