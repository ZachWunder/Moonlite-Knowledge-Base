import { promises as fsPromises } from 'fs';

import Link from 'next/link';

import { getPostBySlug } from '../../utils/getPosts';
import { Markdown } from '../../utils/Markdown';

interface SlugProps {
  slug: string;
}

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    createdAt: string;
  };
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
      post: {
        slug: params.slug,
        title: post.meta.title,
        content: post.content,
        createdAt: post.meta.createdAt,
      },
    },
  };
}

export default function Post(props: PostProps) {
  return (
    <div className="flex flex-col ml-12">
      <Link href="/">
        <a className="mx-auto text-4xl tracking-tight font-extrabold text-gray-900">Moonlite</a>
      </Link>
      <div className="mb-8 prose">
        <h1>{props.post.title}</h1>
        <p>{props.post.createdAt}</p>
        <p>Author: Moonlite</p>
      </div>
      <Markdown markdown={props.post.content} />
    </div>
  );
}
