import * as React from 'react';
import { FlashMessage, FlashContextType} from "./types";

export const FlashContext = React.createContext<FlashContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode
}

export const FlashProvider = ({ children }: Props) => {
  const [messages, setMessages] = React.useState<FlashMessage[]>([]);

  const addFlash = React.useCallback((text: string) => {
    const newMessage = { id: new Date().getTime(), text }; // use timestamp as a unique id
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, []);

  const removeFlash = React.useCallback((id: number) => {
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg.id !== id)
    );
  }, []);

  const contextValue = { addFlash, removeFlash, messages };

  return (
    <FlashContext.Provider value={contextValue}>
      {children}
    </FlashContext.Provider>
  );
};
