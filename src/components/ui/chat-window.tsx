import { useChatStore } from '@/lib/store/chat-store';
import { MessageInput } from './message-input';
import { MemeDisplay } from './meme-display';
import { ModeSelector } from './mode-selector';
import { toast } from 'react-hot-toast';
import { Message } from '@/lib/types';

export const ChatWindow = () => {
  const { messages, mode, loading, addMessage, setLoading } = useChatStore();

  const handleSendMessage = async (content: string) => {
    if (loading) return;
    
    setLoading(true);
    addMessage({ role: 'user', content });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: content, mode })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      addMessage({
        role: 'assistant',
        content: data.content,
        memeImage: data.memeImage
      });
    } catch (error) {
      toast.error('Failed to generate response');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <ModeSelector />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message: Message, index: number) => (
          <MemeDisplay key={index} message={message} />
        ))}
      </div>
      <MessageInput onSend={handleSendMessage} disabled={loading} />
    </div>
  );
};