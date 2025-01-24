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
    <Container className="prose prose-invert h-screen min-h-[1px] w-screen !px-0 py-20 flex flex-col items-center">
      {/* TODO: diplay an illustration if nothing is typed (like a resting animal or sth like that) */}

      <Tabs className="w-full" openByDefault="markdown">
        <TabsList>
          <TabsTrigger value="markdown">Preview</TabsTrigger>
          <TabsTrigger value="preview">Markdown</TabsTrigger>
        </TabsList>

        <TabsContent className="min-h-[600px]" value="markdown">
          <TextArea
            className="w-full h-full absolute resize-y"
            placeholder="Start typing to get started."
            value={content}
            onChange={updateContent}
          />
        </TabsContent>

        <TabsContent value="preview">
          <MarkdownPreview className="absolute p-10 border border-ring w-full min-h-full mb-8">
            {content}
          </MarkdownPreview>
        </TabsContent>
      </Tabs>
    </Container>
  );
}
