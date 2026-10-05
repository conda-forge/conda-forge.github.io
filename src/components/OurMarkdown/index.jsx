import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "@theme/CodeBlock";
import Admonition from "@theme/Admonition";

export default function Markdown({ children }) {
  return <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      pre(props) {
        const { children, className, node, ...rest } = props;
        if (children && children.props.node.tagName == "code") {
          return <div>{children}</div>;
        }
        return node;
      },
      code(props) {
        const { children, className, node, ...rest } = props;
        const match = /language-(\w+)/.exec(className || "");
        if (!match) {
          return <code {...rest} className={className} children={children} />;
        }
        if (["info", "error", "warning", "danger"].includes(match[1])) {
          return <Admonition type={match[1]} children={children} />;
        } else {
          return (
            <CodeBlock {...rest} children={children} language={match[1]} />
          );
        }
      },
    }}
  >
    {children}
  </ReactMarkdown>
};
