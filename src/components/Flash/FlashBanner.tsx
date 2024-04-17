import * as React from 'react';
import { useFlash } from './useFlash'; // Adjust the import path as necessary

const FlashBanner = () => {
  const { messages, removeFlash } = useFlash();

  React.useEffect(() => {
    const timers: NodeJS.Timeout[] = messages.map((message) =>
      setTimeout(() => {
        removeFlash(message.id);
      }, 3000)
    );

    return () => timers.forEach(timer => clearTimeout(timer)); // Cleanup timeouts
  }, [messages, removeFlash]);

  return (
    <div className="fixed bottom-0 right-0 m-4 space-y-2`">
      {messages.map((msg) => (
        <div key={msg.id} className="bg-blue-500 text-white p-2 rounded">
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default FlashBanner;
