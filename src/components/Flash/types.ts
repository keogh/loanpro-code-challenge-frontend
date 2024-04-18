export interface FlashMessage {
  id: number;
  text: string;
}

export interface FlashContextType {
  addFlash: (text: string, type?: string) => void;
  removeFlash: (id: number) => void;
  messages: FlashMessage[];
}
