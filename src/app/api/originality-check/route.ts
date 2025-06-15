import { deepseek } from '@ai-sdk/deepseek';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    if (!content) {
      return new Response(JSON.stringify({ error: 'Content is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { text } = await generateText({
      model: deepseek('deepseek-chat'),
      prompt: content,
    });

    return new Response(JSON.stringify({ result: text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in originality check API:', error);
    return new Response(JSON.stringify({ result: '检测调用失败，请检查您的网络或联系管理员。' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 