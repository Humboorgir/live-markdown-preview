"use client";

import Container from "@/components/ui/container";
import TextArea from "@/components/ui/textarea";

import { ChangeEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Home() {
  const [text, setText] = useState("");
  console.log(text);

  function updateText(e: ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
  }

  return (
    <Container className="prose prose-invert h-screen w-screen !px-0 py-20 flex flex-col items-center">
      {/* TODO: diplay an illustration if nothing is typed (like a resting animal or sth like that) */}
      {/* TODO: make a separate component for ReactMarkdown  */}
      {/* TODO: make tabs for markdown preview */}
      <ReactMarkdown
        className="p-10 border-2 border-white/5 w-full h-full mb-8"
        components={{
          code({ className, children, ...rest }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
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
        {text}
      </ReactMarkdown>

      <TextArea containerClassName="w-full" className="w-full" placeholder="Markdown" onChange={updateText} />
    </Container>
  );
}
