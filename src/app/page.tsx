"use client";

import Container from "@/components/ui/container";
import MarkdownPreview from "@/components/ui/markdown-preview/markdown-preview";
import TextArea from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs/tabs";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [content, setContent] = useState("");

  function updateContent(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  return (
    <Container className="prose prose-invert prose-sm md:prose-base h-screen min-h-[1px] w-screen !px-2 py-20 flex flex-col items-center">
      <Tabs className="w-full" openByDefault="markdown">
        <TabsList>
          <TabsTrigger value="markdown">Markdown</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
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
          {content ? (
            <MarkdownPreview className="border border-ring rounded-md absolute px-6 w-full min-h-full mb-8">
              {content}
            </MarkdownPreview>
          ) : (
            <div className="px-2 text-center absolute border border-ring rounded-md w-full min-h-full flex flex-col items-center">
              <h2 className="text-2xl md:text-3xl md:mb-3.5">Oops, nothing to show you here!</h2>
              <p className="text-foreground-muted/80">Type something in 'Markdown' to get started</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Container>
  );
}
