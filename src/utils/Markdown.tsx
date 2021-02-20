import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

interface MarkdownProps {
  markdown: string;
}

export function Markdown(props: MarkdownProps) {
  return (
    <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
      <ReactMarkdown plugins={[gfm]}>{props.markdown}</ReactMarkdown>
    </article>
  );
}
