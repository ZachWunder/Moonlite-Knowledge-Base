import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

interface MarkdownProps {
  markdown: string;
}

export function Markdown(props: MarkdownProps) {
  return (
    <article className="prose prose-blue mt-8">
      <ReactMarkdown plugins={[gfm]}>{props.markdown}</ReactMarkdown>
    </article>
  );
}
