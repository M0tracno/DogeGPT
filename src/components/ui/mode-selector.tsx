import { useChatStore } from '@/lib/store/chat-store';
import { ResponseMode } from '@/lib/types';

const modes: { value: ResponseMode; label: string }[] = [
  { value: 'normal', label: 'Normal Mode' },
  { value: 'ohio', label: 'Ohio Mode' },
  { value: 'sigma', label: 'Sigma Mode' },
  { value: 'conspiracy', label: 'Conspiracy Mode' }
];

export const ModeSelector = () => {
  const { mode, setMode } = useChatStore();

  return (
    <div className="flex justify-center p-4 bg-white border-b">
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value as ResponseMode)}
        className="px-4 py-2 rounded-lg border"
      >
        {modes.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>
    </div>
  );
};