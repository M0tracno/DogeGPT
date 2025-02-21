import OpenAI from 'openai';
import { ResponseMode } from '@/lib/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateMemeResponse = async (
  prompt: string, 
  mode: ResponseMode
) => {
  const systemPrompts = {
    normal: "You are DogeGPT, a meme-loving AI that communicates through popular internet culture references and meme formats. Be creative, funny, and embrace chaos while keeping content appropriate.",
    ohio: "You are DogeGPT in Ohio mode. Everything is surreal and Ohio-related. Turn every response into an absurd Ohio-themed meme while keeping content appropriate.",
    sigma: "You are DogeGPT giving absurd sigma grindset advice. Respond with over-the-top, satirical 'sigma male' meme-style wisdom while keeping content appropriate.",
    conspiracy: "You are DogeGPT generating weird but harmless conspiracy theories. Create absurd, funny, and completely fictional conspiracy theories involving memes and internet culture while keeping content appropriate."
  };

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompts[mode] },
        { role: "user", content: prompt }
      ],
      temperature: 0.9,
      max_tokens: 150
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate meme response');
  }
};

export { openai };