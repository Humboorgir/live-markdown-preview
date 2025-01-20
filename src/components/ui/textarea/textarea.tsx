import * as React from "react";

import { cn } from "@/lib/utils";

export type TextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  containerClassName?: string;
};

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, containerClassName, type, placeholder, ...props }, ref) => {
    return (
      <div className={cn("relative w-fit h-fit", containerClassName)}>
        <textarea
          className={cn(
            `flex top-0 left-0 bottom-0 right-0 rounded-md bg-background px-3.5 py-4
        ring-offset-background focus-visible:outline-none border border-ring
         disabled:cursor-not-allowed disabled:opacity-50 focus:ring-offset-3 focus:border-3
         focus:border-primary transition-[border] placeholder:text-transparent peer text-foreground`,
            className
          )}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
        <label
          className="absolute peer-placeholder-shown:top-[50%]
          peer-placeholder-shown:left-[13px] peer-placeholder-shown:text-base
          peer-focus:!top-0 peer-focus:!left-[8px] peer-focus:!text-xs
           bg-background px-1 transition-all pointer-events-none translate-y-[-50%]
        z-10 top-0 left-[8px] peer-focus:text-primary text-xs text-foreground">
          {placeholder}
        </label>
      </div>
    );
  }
);
TextArea.displayName = "TextArea";

export default TextArea;
