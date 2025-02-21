import { create } from 'zustand';
import type { ChatState } from '@/lib/types';

export const useChatStore = create<ChatState>()((set) => ({
  messages: [],
  mode: 'normal',
  loading: false,
  setMode: (mode) => set({ mode }),
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  clearMessages: () => set({ messages: [] }),
  setLoading: (loading) => set({ loading })
}));