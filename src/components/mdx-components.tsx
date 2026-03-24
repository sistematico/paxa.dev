import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { codeToHtml } from "shiki";
import React from "react";
import CodeBlock from "./CodeBlock";

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  const headers = data.headers.map((header) => <th key={header}>{header}</th>);
  const rows = data.rows.map((row) => (
    <tr key={row.join("-")}>
      {row.map((cell) => (
        <td key={cell}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props: { href: string; children: React.ReactNode }) {
  const href = props.href;

  if (href.startsWith("/")) {
    return <Link {...props}>{props.children}</Link>;
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props: React.ComponentProps<typeof Image>) {
  return <Image className="rounded-lg" {...props} />;
}

function Code({
  children,
  className,
  ...props
}: {
  children: string;
  className?: string;
  [key: string]: unknown;
}) {
  // Block code (inside <pre>) — pass through raw, Pre handles highlighting
  if (className?.includes("language-")) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  // Inline code — just render plain (CSS styles it)
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

async function Pre({ children }: { children: React.ReactNode }) {
  let language: string | undefined;
  let codeString = "";

  if (React.isValidElement(children)) {
    const props = children.props as {
      className?: string;
      children?: string;
    };
    if (props.className) {
      const match = props.className.match(/language-(\w+)/);
      if (match) language = match[1];
    }
    if (typeof props.children === "string") {
      codeString = props.children;
    }
  }

  // Remove trailing newline that MDX adds
  codeString = codeString.replace(/\n$/, "");

  const html = await codeToHtml(codeString, {
    lang: language || "text",
    theme: "nord",
  });

  return <CodeBlock language={language} html={html} code={codeString} />;
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters except for -
    .replace(/--+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: React.ReactNode }) => {
    const slug = slugify(children as string);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children,
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  pre: Pre,
  Table,
};

export function CustomMDX(props: { source: string; components?: object }) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
