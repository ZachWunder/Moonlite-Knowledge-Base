import { promises as fsPromises } from 'fs';

import Link from 'next/link';

import { getPostBySlug } from '../../utils/getPosts';
import { Post } from '../../utils/IPost';
import { Markdown } from '../../utils/Markdown';

interface SlugProps {
  slug: string;
}

interface PostProps {
  post: Post;
}

export async function getStaticPaths() {
  const markdownFiles = await fsPromises.readdir(`${process.cwd()}/src/content`);

  const paths = markdownFiles.map((filename) => {
    const slug = filename.replace(/.md$/, '');
    // const slug = removedExtension.split('-')
    // const final = slug[slug.length - 1]
    return {
      params: { slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: SlugProps }) {
  const post = getPostBySlug(params.slug);

  return {
    props: {
      post,
    },
  };
}

export default function PostTemplate(props: PostProps) {
  return (
    <div className="flex flex-col ml-12">
      <Link href="/">
        <a className="mx-auto text-4xl tracking-tight font-extrabold text-gray-900">Moonlite</a>
      </Link>
      <div className="">
        <h1 className="font-semibold text-2xl">{props.post.meta.title}</h1>
        <p>{props.post.meta.createdAt}</p>
        <p>
          Author:
          {props.post.meta.author}
        </p>
      </div>
      <Markdown markdown={props.post.content} />
    </div>
  );
}
