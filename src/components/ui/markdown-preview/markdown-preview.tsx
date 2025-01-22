import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkBreaks from "remark-breaks";

type MarkdownPreviewProps = {
  children?: string;
  className?: string;
};

const MarkdownPreview = ({ children, className }: MarkdownPreviewProps) => {
  return (
    <ReactMarkdown
      className={className}
      remarkPlugins={[remarkBreaks]}
      components={{
        code({ className, children, ...rest }) {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            // @ts-ignore
            <SyntaxHighlighter PreTag="div" language={match[1]} style={oneDark} {...rest}>
              {children}
            </SyntaxHighlighter>
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}>
      {children}
    </ReactMarkdown>
  );
};

export default MarkdownPreview;
