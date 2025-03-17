import { createContext, useContext, useState } from "react";

const PromptContext = createContext();

export const PromptProvider = ({ children }) => {
  const [promptCount, setPromptCount] = useState(0);
  const [isPaid, setIsPaid] = useState(false);

  // Function to add a prompt
  const addPrompt = () => {
    setPromptCount((prev) => prev + 1);
  };
  
  const resetPromptCount = () => {
    setPromptCount(0);
    setIsPaid(true);
  };

  return (
    <PromptContext.Provider value={{ promptCount, addPrompt, isPaid, resetPromptCount }}>
      {children}
    </PromptContext.Provider>
  );
};

export const usePrompt = () => useContext(PromptContext);
