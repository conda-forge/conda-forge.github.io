import { useState, useEffect } from "react";
import { Resolver } from "@stoplight/json-ref-resolver";
import Heading from "@theme/Heading";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "@theme/CodeBlock";
import Admonition from "@theme/Admonition";
import Details from "@theme/Details";
import prefetchedJsonSchema from "@site/static/schema/conda-forge.schema.json";
import { urls } from "@site/src/constants";

export default function CondaForgeYmlSchema({ toc = null }) {
  const schemaURL = urls.schemas["conda-forge.yml"];
  const [schema, setSchema] = useState(prefetchedJsonSchema);
  const [resolved, setResolved] = useState(false);
  useEffect(() => {
    fetch(schemaURL, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((rawSchema) => new Resolver({
        resolvers: {
          // this resolver will be invoked for refs with the https protocol
          https: {
            async resolve(ref) {
              return fetch(ref).then((response) => response.json())
            }
          }
      }}).resolve(rawSchema, {}))
      .then((resolved) => {
        setSchema(resolved.result);
        setResolved(true);
      });
  }, []);

  return (
    <>
      <Admonition type="info">
        This documentation is autogenerated from{" "}
        <a href={schemaURL} target="_blank">
          conda-smithy's JSON Schema
        </a>
        .
      </Admonition>
      <SchemaToc schema={schema} />
      <Markdown>{schema.description}</Markdown>
      <p></p>
      {Object.entries(schema.properties)
        .sort()
        .map(([key, value]) => (
          <Setting
            key={key}
            name={key}
            value={value}
            withTypes={resolved}
            toc={toc}
          />
        ))}
    </>
  );
}

function SchemaToc({ schema }) {
  return (
    <ul>
      {Object.entries(schema.properties)
        .sort()
        .map(([key, value]) => (
          <li key={`toc-${key}`}>
            <a href={`#${key.replaceAll("_", "-")}`} key={key}>
              {(value.deprecated && (
                <span style={{ textDecoration: "line-through" }}>{key}</span>
              )) ||
                key}
            </a>
          </li>
        ))}
    </ul>
  );
}

function Setting({ name, value, level = 1, withTypes = true, toc = null }) {
  if (toc) {
    toc.push({
      value: name,
      id: name.replaceAll("_", "-"),
      level: level + 2,
    });
  }
  return (
    <>
      <a id={name}></a>
      <Heading as={`h${level + 2}`} id={name.replaceAll("_", "-")}>
        {(value.deprecated && (
          <span style={{ textDecoration: "line-through" }}>{name}</span>
        )) ||
          name}
      </Heading>
      {value.deprecated && (
        <p>
          <span className={["badge", "badge--danger"].join(" ")}>
            Deprecated
          </span>
        </p>
      )}
      {value.description?.length && (
        <Markdown>{value.description.trim()}</Markdown>
      )}
      {withTypes && <Type value={value} />}
      {value.examples && (
        <Details summary={Examples} closed="true">
          <Markdown>{value.examples.join(", ")}</Markdown>
        </Details>
      )}
    </>
  );
}

function Type({ value }) {
  var types = [];
  var customTypes = { options: [] };
  var values = value.anyOf || [value];
  values.map((v) => {
    if (v.type) {
      if (v.type === "object") {
        types.push(<code>dict</code>);
        if (v.title) {
          customTypes.options.push(
            <Details key={v.title} summary={v.title} closed="true">
              {Object.entries(v.properties)
                .sort()
                .map(([key, value]) => (
                  <Setting key={`${v.title}-${key}`} name={key} value={value} level={2} />
                ))}
            </Details>
          );
        }
      } else if (v.type === "array") {
        if (v.items.type) {
          if (v.items.title) {
            types.push(<code>{`list of ${v.items.title}`}</code>);
            if (v.items.enum) {
              customTypes[v.items.title] = v.items.enum.map((e) => (
                <code>{e}</code>
              ));
            }
          } else {
            types.push(<code>{`list of ${v.items.type}`}</code>);
            if (v.items.enum) {
              customTypes.options.push(
                ...v.items.enum.map((e) => <code>{e}</code>)
              );
            }
          }
        } else {
          types.push(<code>list</code>);
        }
      } else if (v.type === "string") {
        if (v.enum) {
          types.push(<code>{v.title || "string"}</code>);
        } else {
          types.push(<code>string</code>);
        }
      } else if (v.type !== "null") {
        types.push(<code>{v.type}</code>);
      }
    }
    if (v.enum) {
      customTypes.options.push(...v.enum.map((e) => <code>{e}</code>));
    }
  });
  return (
    <>
      {types.length ? <span>Type: {types}</span> : null}
      {types.length && value.default !== undefined ? <span>, </span> : null}
      {value.default !== undefined ? (
        <span>
          default: <code>{JSON.stringify(value.default)}</code>
        </span>
      ) : null}
      {Object.entries(customTypes).map(([key, value]) =>
        value.length ? (
          <>
            <br />
            <span>
              With{" "}
              {(key === "options" && <span>{key}</span>) || <code>{key}</code>}:{" "}
            </span>
            {value.reduce((prev, curr) => [prev, ', ', curr])}
          </>
        ) : null
      )}
      <p></p>
    </>
  );
}

const Markdown = ({ children }) => (
  <ReactMarkdown
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
);
