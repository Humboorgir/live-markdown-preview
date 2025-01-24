import React, { useContext, useState, createContext, memo, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/button";
import usePrevious from "@/hooks/usePrevious";
import { cn } from "@/lib/utils";

// TODO: clean up the code

type SetSelected = React.Dispatch<React.SetStateAction<string>>;
type SetTabs = React.Dispatch<React.SetStateAction<{ value: string }[]>>;
type Tab = { value: string };

// Three separate contexts because they have different change patterns
const SelectedContext = createContext<{ selected: string }>({
  selected: "",
});
const TabsContext = createContext<{ tabs: Tab[]; setTabs: SetTabs }>({ tabs: [], setTabs: () => {} });
const SetSelectedContext = createContext<{ setSelected: SetSelected }>({ setSelected: () => {} });

type TabsProps = { openByDefault: string; children: React.ReactNode; className?: string };

export const Tabs = ({ openByDefault, children, className }: TabsProps) => {
  const [selected, setSelected] = useState(openByDefault);
  const [tabs, setTabs] = useState<{ value: string }[]>([]);

  const selectedContext = useMemo(() => ({ selected }), [selected]);
  const tabsContext = useMemo(() => ({ tabs, setTabs }), [tabs, setTabs]);
  const setSelectedContext = useMemo(() => ({ setSelected }), [setSelected]);
  return (
    <SelectedContext.Provider value={selectedContext}>
      <TabsContext.Provider value={tabsContext}>
        <SetSelectedContext.Provider value={setSelectedContext}>
          <div className={cn("relative w-fit h-fit flex flex-col", className)}>{children}</div>
        </SetSelectedContext.Provider>
      </TabsContext.Provider>
    </SelectedContext.Provider>
  );
};

type TabsTriggerProps = {
  children: React.ReactNode;
  className?: string;
  value: string;
};

export const TabsTrigger = memo(function TabsTrigger({
  children,
  className,
  value,
  ...props
}: TabsTriggerProps) {
  const { setSelected } = useContext(SetSelectedContext);
  return (
    <Button className={className} onClick={() => setSelected(value)} variant="outline" {...props}>
      {children}
    </Button>
  );
});

type TabsListProps = {
  children: React.ReactNode;
  className?: string;
};

export const TabsList = ({ children, className, ...props }: TabsListProps) => {
  return (
    <div className={cn("flex items-center space-x-3", className)} {...props}>
      {children}
    </div>
  );
};

type TabsContentProps = {
  children: React.ReactNode;
  className?: string;
  value: string;
};

export const TabsContent = ({ children, className, value, ...props }: TabsContentProps) => {
  const { selected } = useContext(SelectedContext);
  const { tabs, setTabs } = useContext(TabsContext);
  const prevSelected = usePrevious(selected);

  useEffect(() => {
    setTabs((prev) => [...prev, { value }]);

    return () => {
      setTabs((prev) => {
        if (prev.length) {
          prev.pop();
          return prev;
        }
        return prev;
      });
    };
  }, []);

  if (selected != value) return null;

  const prevSelectedTabIndex = tabs.findIndex((tab) => tab.value == prevSelected);
  const currentTabIndex = tabs.findIndex((tab) => tab.value == value);
  // Directional aware transition
  const initialX = currentTabIndex > prevSelectedTabIndex ? 30 : -30;
  const easeOut = [0, 0, 0.2, 1];

  return (
    selected == value && (
      <motion.div
        initial={{ opacity: 0, x: initialX }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25, ease: easeOut }}
        className={cn("absolute w-full min-h-[340px] left-0 top-full mt-2", className)}
        {...props}>
        {children}
      </motion.div>
    )
  );
};
