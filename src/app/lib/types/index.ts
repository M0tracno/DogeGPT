export type MessageRole = 'user' | 'assistant';

export interface Message {
  role: MessageRole;
  content: string;
  memeImage?: string;
}

export interface MemeTemplate {
  id: string;
  name: string;
  url: string;
  textPositions: Array<{x: number, y: number}>;
}

export type ResponseMode = 'normal' | 'ohio' | 'sigma' | 'conspiracy';

export interface ChatState {
  messages: Message[];
  mode: ResponseMode;
  loading: boolean;
  setMode: (mode: ResponseMode) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  setLoading: (loading: boolean) => void;
}