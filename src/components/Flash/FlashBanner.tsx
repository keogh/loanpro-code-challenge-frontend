import * as React from 'react';
import { useFlash } from './useFlash';
import {CheckCircleIcon} from "@heroicons/react/20/solid"; // Adjust the import path as necessary

const FlashBanner = () => {
  const { messages, removeFlash } = useFlash();

  React.useEffect(() => {
    const timers: NodeJS.Timeout[] = messages.map((message) =>
      setTimeout(() => {
        removeFlash(message.id);
      }, 5000)
    );

    return () => timers.forEach(timer => clearTimeout(timer)); // Cleanup timeouts
  }, [messages, removeFlash]);

  return (
    <div className="w-full space-y-2 z-30">
      {messages.map((msg) => (
        <div key={msg.id} className="rounded-md bg-green-50 p-4 mx-1 border border-green-600">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true"/>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">{msg.text}</p>
            </div>
          </div>
        </div>
      ))}
</div>
)
  ;
};

export default FlashBanner;
