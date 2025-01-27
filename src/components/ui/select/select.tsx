"use client";

import Button from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Option = {
  name: string;
  value: string;
};

type Props = Omit<React.HTMLProps<HTMLDivElement>, "onChange"> & {
  children: React.ReactNode;
  options: Option[];
  variant?: "default" | "secondary" | "outline" | "ghost" | "link";
  scrollable?: boolean;
  onChange?: (option: Option) => void;
};

const Select = ({
  variant = "default",
  scrollable = false,
  children,
  options,
  className,
  onChange = () => {},
}: Props) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>({ name: "", value: "" });

  function toggleOpen() {
    setOpen(!open);
  }

  function selectOption(option: Option) {
    onChange(option);
    setSelected(option);
    setOpen(false);
  }

  // select component
  return (
    <div className={cn("relative w-fit h-fit", className)}>
      <Button variant={variant} onClick={toggleOpen}>
        {selected.value ? selected.name : children}
      </Button>
      {/* select options  */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, delay: 0.1, ease: [0.85, 0, 0.15, 1] }}
            className={cn(
              `absolute top-full right-0 bg-neutral-900 z-20 origin-top max-h-[200px] rounded-b-md
           border-b border-b-secondary`,
              scrollable && "overflow-y-scroll"
            )}>
            {options &&
              options.map((option, i) => (
                <Button
                  key={i}
                  className={cn(
                    `w-full justify-start border-secondary border-t-0 first-of-type:border-t rounded-none
            last-of-type:rounded-b-md`
                  )}
                  variant="outline"
                  onClick={() => selectOption(option)}>
                  {option.name}
                </Button>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
