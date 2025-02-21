import { NextResponse } from 'next/server';
import { generateMemeResponse } from '@/lib/utils/openai';
import { generateMemeImage } from '@/lib/utils/replicate';
import { rateLimiter } from '@/lib/utils/rate-limit';

export async function POST(req: Request) {
  try {
    const { prompt, mode } = await req.json();
    
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for');
    const { success } = await rateLimiter.limit(ip ?? 'anonymous');
    
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    // Generate response
    const [textResponse, memeImage] = await Promise.all([
      generateMemeResponse(prompt, mode),
      generateMemeImage(prompt)
    ]);

    return NextResponse.json({
      content: textResponse,
      memeImage
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
  
}