import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

interface MarkdownProps {
  markdown: string;
}

export function Markdown(props: MarkdownProps) {
  return (
    <article className="prose prose-blue mt-8 dark:text-gray-50">
      <ReactMarkdown plugins={[gfm]}>{props.markdown}</ReactMarkdown>
    </article>
  );
}
