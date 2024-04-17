import * as React from 'react';
import { FlashMessage, FlashContextType} from "./types";

export const FlashContext = React.createContext<FlashContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode
}

export const FlashProvider = ({ children }: Props) => {
  const [messages, setMessages] = React.useState<FlashMessage[]>([]);

  const addFlash = (text: string) => {
    const newMessage = { id: new Date().getTime(), text }; // use timestamp as a unique id
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const removeFlash = (id: number) => {
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg.id !== id)
    );
  };

  return (
    <FlashContext.Provider value={{ addFlash, removeFlash, messages }}>
      {children}
    </FlashContext.Provider>
  );
};
