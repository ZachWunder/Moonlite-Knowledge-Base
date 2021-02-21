import { promises as fsPromises } from 'fs';

import Link from 'next/link';

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
  const [year, month, day, ...rest] = params.slug.split('-');
  const createdAt = new Date(`${year} ${month} ${day}`).toLocaleDateString('en-US');
  const title = rest.join(' ');

  const content = await fsPromises.readFile(
    `${process.cwd()}/src/content/${params.slug}.md`,
    'utf8',
  );

  return {
    props: {
      post: {
        slug: params.slug,
        title,
        content,
        createdAt,
      },
    },
  };
}

export default function Post(props: PostProps) {
  return (
    <div className="flex flex-col">
      <Link href="/">
        <a className="mx-auto text-4xl tracking-tight font-extrabold text-gray-900">Moonlite</a>
      </Link>
      <p>{props.post.title}</p>
      <p>{props.post.createdAt}</p>
      <p>Author: Moonlite</p>
      <Markdown markdown={props.post.content} />
    </div>
  );
}
