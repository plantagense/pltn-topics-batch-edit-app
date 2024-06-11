/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode } from "react";

interface TopicContextType {
  selectedTopic: string | null;
  setSelectedTopic: (topic: string | null) => void;
}

const TopicContext = createContext<TopicContextType | undefined>(undefined);

interface TopicProviderProps {
  children: ReactNode;
}

export const TopicProvider: React.FC<TopicProviderProps> = ({ children }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  return (
    <TopicContext.Provider value={{ selectedTopic, setSelectedTopic }}>
      {children}
    </TopicContext.Provider>
  );
};

export const useTopic = (): TopicContextType => {
  const context = useContext(TopicContext);
  if (!context) {
    throw new Error("useTopic must be used within a TopicProvider");
  }
  return context;
};
