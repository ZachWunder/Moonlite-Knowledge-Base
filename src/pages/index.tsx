import Link from 'next/link';

import { getAllPosts } from '../utils/getPosts';
import { Post } from '../utils/IPost';
import { Meta } from '../layout/Meta'

interface IndexProps {
  postList: Post[];
}

export default function Home(props: IndexProps) {
  return (
    <>
    <Meta title="Moonlite" description="Moonlite Development Team" />
    <main className="text-center mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div>
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">Moonlite</span>
        </h1>
        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
          Elit sunt amet fugiat veniam occaecat fugiat aliqua.
        </p>
      </div>
      <div className="flex flex-col mt-5 ">
        <h2 className="text-xl font-medium text-gray-700">Articles</h2>
        {props.postList.map((post) => (
          <Link key={post.meta.title} href={`posts/${post.slug}`}>
            <a className="mt-5">{post.meta.title}</a>
          </Link>
        ))}
      </div>
    </main>
    </>
  );
}

export async function getStaticProps() {
  const postList = getAllPosts();

  return {
    props: {
      postList,
    },
  };
}
