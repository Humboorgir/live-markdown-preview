import * as React from "react";

import { cn } from "@/lib/utils";

export type TextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, type, placeholder, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          `rounded-md bg-background px-3.5 py-4
        ring-offset-background focus-visible:outline-none border border-ring
         disabled:cursor-not-allowed disabled:opacity-50 focus:ring-offset-3 focus:border-3
         focus:border-primary transition-[border] resize-none text-foreground`,
          className
        )}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    );
  }
);
TextArea.displayName = "TextArea";

export default TextArea;
