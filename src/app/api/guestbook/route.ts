import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// 注意：此实现使用本地JSON文件作为数据库。
// 在Vercel等无服务器环境中，文件系统是临时的，重启后数据会丢失。
// 生产环境应替换为真正的数据库（如 Vercel KV, Supabase, Firebase 等）。

const dataFilePath = path.join(process.cwd(), 'data/messages.json');

interface Message {
  id: number;
  name: string;
  message: string;
  timestamp: string;
}

async function getMessages(): Promise<Message[]> {
  try {
    const fileData = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    // 如果文件不存在或为空，返回空数组
    return [];
  }
}

export async function GET() {
  const messages = await getMessages();
  return NextResponse.json(messages.sort((a, b) => b.id - a.id)); // 按ID倒序，新的在前
}

export async function POST(req: Request) {
  try {
    const { name, message } = await req.json();

    if (!name || !message) {
      return NextResponse.json({ error: '昵称和留言内容不能为空' }, { status: 400 });
    }

    const messages = await getMessages();
    const newMessage: Message = {
      id: Date.now(), // 使用时间戳作为唯一ID
      name: name.slice(0, 50), // 限制长度
      message: message.slice(0, 500), // 限制长度
      timestamp: new Date().toISOString(),
    };

    messages.push(newMessage);
    await fs.writeFile(dataFilePath, JSON.stringify(messages, null, 2));

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/guestbook:', error);
    return NextResponse.json({ error: '处理请求时发生错误' }, { status: 500 });
  }
} 