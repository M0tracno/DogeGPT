import { render, screen, fireEvent } from '@testing-library/react';
import { ChatWindow } from '../chat-window';

describe('ChatWindow', () => {
  it('renders input field', () => {
    render(<ChatWindow />);
    expect(screen.getByPlaceholderText(/type a message/i)).toBeInTheDocument();
  });

  it('handles message submission', async () => {
    render(<ChatWindow />);
    const input = screen.getByPlaceholderText(/type a message/i);
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(await screen.findByText('Hello')).toBeInTheDocument();
  });
});