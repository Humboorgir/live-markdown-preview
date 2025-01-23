"use client";

import Container from "@/components/ui/container";
import MarkdownPreview from "@/components/ui/markdown-preview/markdown-preview";
import TextArea from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs/tabs";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");

  function updateContent(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  return (
    <Container className="prose prose-invert h-screen w-screen !px-0 py-20 flex flex-col items-center">
      {/* TODO: diplay an illustration if nothing is typed (like a resting animal or sth like that) */}
      {/* TODO: make tabs for markdown preview */}

      {/* <MarkdownPreview className="p-10 border-2 border-white/5 w-full h-full mb-8">{content}</MarkdownPreview>

      <TextArea
        containerClassName="w-full"
        className="w-full"
        placeholder="Markdown"
        onChange={updateContent}
      /> */}
    </Container>
  );
}
