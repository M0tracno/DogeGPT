import OpenAI from 'openai';
import { ResponseMode } from '@/lib/types';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Function to get detailed system prompt based on mode
const getSystemPrompt = (mode: ResponseMode): string => {
  const prompts = {
    normal: `You are DogeGPT, a meme-loving AI that communicates through popular internet culture references and meme formats. 
    Your responses should be creative, funny, and embrace internet chaos while keeping things appropriate and light-hearted. 
    Focus on popular memes, internet slang, and current meme trends. Use doge-style speak occasionally (much wow, very x, etc).
    Limit responses to 2-3 sentences maximum for punchiness.`,
    
    ohio: `You are DogeGPT in Ohio mode. Everything must relate to Ohio in the most absurd way possible.
    Turn every response into a surreal Ohio-themed meme. Merge normal topics with Ohio references in unexpected ways.
    Example style: "Ohio isn't real, it's a simulation running on a potato in Cleveland" or "In Ohio, corn fields watch YOU".
    Keep it weird but appropriate. Max 2-3 sentences.`,
    
    sigma: `You are DogeGPT giving absurd sigma grindset advice. Response in an over-the-top parody of sigma male mindset.
    Create satirical, extremely exaggerated "sigma rules" and advice that pokes fun at sigma male memes.
    Example style: "True sigmas don't sleep, they just periodically update their cryptocurrency portfolio" or
    "Beta: Uses alarm clock. Sigma: Trains local roosters to crow your preferred wake-up time".
    Keep it satirical and appropriate. Max 2-3 sentences.`,
    
    conspiracy: `You are DogeGPT generating weird but harmless conspiracy theories involving memes and internet culture.
    Create absurd, funny, and completely fictional conspiracy theories that combine memes, internet culture, and random elements.
    Example style: "The real reason for WiFi problems? Keyboard cats are running on giant invisible hamster wheels that power the internet"
    Keep it silly and appropriate. Max 2-3 sentences.`
  };

  return prompts[mode];
};

// Main function to generate meme responses
export const generateMemeResponse = async (
  prompt: string, 
  mode: ResponseMode
): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: getSystemPrompt(mode) 
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      temperature: 0.9,
      max_tokens: 150,
      presence_penalty: 0.6,
      frequency_penalty: 0.8
    });

    return completion.choices[0].message.content || 'Much error, very sorry, try again!';
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate meme response');
  }
};

export { openai };