import Image from 'next/image';
import { Message } from '@/lib/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Inline the cn function to avoid import issues
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Props {
  message: Message;
}

export const MemeDisplay = ({ message }: Props) => {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      "flex",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg p-4",
        isUser ? "bg-blue-500 text-white" : "bg-gray-100"
      )}>
        <p className="mb-2">{message.content}</p>
        {message.memeImage && (
          <div className="relative w-full aspect-square max-w-md">
            <Image
              src={message.memeImage}
              alt="Generated meme"
              fill
              className="rounded-lg object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};