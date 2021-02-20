import { promises as fsPromises } from 'fs';

interface Post {
  slug: string;
  createdAt: string;
  title: string;
}

interface IndexProps {
  postList: Post[];
}

export default function Home(props: IndexProps) {
  return (
    <div>
      {props.postList.map((post) => (
        <h1 key={post.title}>{post.title}</h1>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const markdownFiles = await fsPromises.readdir(`${process.cwd()}/src/content`);

  const postList = markdownFiles.map((filename) => {
    const slug = filename.replace(/.md$/, '');
    const [year, month, date, ...rest] = slug.split('-');
    const createdAt = new Date(`${year} ${month} ${date}`).getTime();
    const title = rest.join(' ');

    return {
      slug,
      createdAt,
      title,
    };
  });

  return {
    props: {
      postList,
    },
  };
}
