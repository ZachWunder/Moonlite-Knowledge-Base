import { promises as fsPromises } from 'fs';

import Link from 'next/link';

import { getPostBySlug } from '../../utils/getPosts';
import { Post } from '../../utils/IPost';
import { Markdown } from '../../utils/Markdown';
import { Meta } from '../../layout/Meta'

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
  const { title, author, createdAt } = props.post.meta
  return (
    <>
    <Meta 
      title={title} 
      description={`${title} by ${author}. Written: ${createdAt}`}
    />
    <div className="flex flex-col">
      <Link href="/">
        <a className="mx-auto text-4xl tracking-tight font-extrabold text-gray-700 dark:text-gray-50">Moonlite</a>
      </Link>
      <div className="text-gray-700 dark:text-gray-50 text-center lg:text-left mx-auto lg:ml-12">
        <h1 className="font-semibold text-2xl">{title}</h1>
        <p>{createdAt}</p>
        <p>{`Author: ${author}`}</p>
      </div>
      <div className="mx-auto lg:ml-12">
        <Markdown markdown={props.post.content} />
      </div>
    </div> 
    </>
  );
}
