import { createContext, useContext, useState } from 'react';

type CodeContextType = {
  code: string;
  selectedLanguage: string;
  fontSize: string;
  setCode: (code: string) => void;
  setSelectedLanguage: (language: string) => void;
  setFontSize: (size: string) => void;
};

const CodeContext = createContext<CodeContextType | undefined>(undefined);

export const useCodeContext = (): CodeContextType => {
  const context = useContext(CodeContext);
  if (!context) {
    throw new Error('useCodeContext must be used within a CodeContextProvider');
  }
  return context;
};

export const CodeContextProvider: React.FC = ({ children }) => {
  const [code, setCode] = useState(
    `def hello_world():\n  print("Hello, world!")`
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string>('python');
  const [fontSize, setFontSize] = useState<string>('16');

  const contextValue: CodeContextType = {
    code,
    selectedLanguage,
    fontSize,
    setCode,
    setSelectedLanguage,
    setFontSize,
  };

  return (
    <CodeContext.Provider value={contextValue}>{children}</CodeContext.Provider>
  );
};
