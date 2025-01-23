import React, { useContext, useState, createContext, memo, useMemo } from "react";
import Button from "@/components/ui/button";

// TODO: clean up the code, and animate the transition between tabs

console.log("test");

type ReactSetState = React.Dispatch<React.SetStateAction<string>>;

const SelectedContext = createContext<{ selected: string }>({ selected: "" });
const SetSelectedContext = createContext<{ setSelected: ReactSetState }>({ setSelected: () => {} });

export const Tabs = ({ openByDefault, children }: { openByDefault: string; children: React.ReactNode }) => {
  const [selected, setSelected] = useState(openByDefault);

  const selectedContext = useMemo(() => ({ selected }), [selected]);
  const setSelectedContext = useMemo(() => ({ setSelected }), [setSelected]);
  return (
    <SelectedContext.Provider value={selectedContext}>
      <SetSelectedContext.Provider value={setSelectedContext}>{children}</SetSelectedContext.Provider>
    </SelectedContext.Provider>
  );
};

type TabsTriggerProps = {
  children: React.ReactNode;
  value: string;
};

export const TabsTrigger = memo(function TabsTrigger({ children, value }: TabsTriggerProps) {
  console.log("You shouldn't see this");
  const { setSelected } = useContext(SetSelectedContext);
  return (
    <Button onClick={() => setSelected(value)} variant="ghost">
      {children}
    </Button>
  );
});

type TabsListProps = {
  children: React.ReactNode;
};

export const TabsList = ({ children }: TabsListProps) => {
  return <div className="flex items-center space-x-3">{children}</div>;
};

type TabsContentProps = {
  children: React.ReactNode;
  value: string;
};

export const TabsContent = ({ children, value }: TabsContentProps) => {
  const { selected } = useContext(SelectedContext);
  return selected == value && <div>{children}</div>;
};
