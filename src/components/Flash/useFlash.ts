import * as React from 'react';
import { FlashContextType } from "./types";
import { FlashContext } from './FlashProvider'; // Adjust the import path as necessary

export const useFlash = (): FlashContextType => {
  const context = React.useContext(FlashContext);
  if (!context) {
    throw new Error('useFlash must be used within a FlashProvider');
  }
  return context;
};
