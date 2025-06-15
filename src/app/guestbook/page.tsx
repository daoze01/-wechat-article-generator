'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, MessageSquare, User } from 'lucide-react';

interface Message {
  id: number;
  name: string;
  message: string;
  timestamp: string;
}

export default function GuestbookPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchMessages() {
    try {
      const res = await fetch('/api/guestbook');
      if (!res.ok) throw new Error('Failed to fetch messages');
      const data: Message[] = await res.json();
      setMessages(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError('昵称和留言都不能为空哦！');
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || '提交失败');
      }
      // Reset form and refetch messages
      setName('');
      setMessage('');
      await fetchMessages();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-500 p-3 text-white">
              <MessageSquare className="h-8 w-8" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold tracking-tight text-gray-800">在线留言板</CardTitle>
              <CardDescription className="mt-1 text-lg text-gray-600">
                分享您的使用体验，或提出宝贵的意见和建议！
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium flex items-center gap-2"><User className="h-4 w-4" /> 您的昵称</label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请输入您的昵称"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium flex items-center gap-2"><MessageSquare className="h-4 w-4" /> 留言内容</label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="在这里写下您的想法..."
                rows={4}
                disabled={isLoading}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? '提交中...' : <><Send className="mr-2 h-4 w-4" /> 提交留言</>}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-10 space-y-6">
        <h2 className="text-2xl font-bold text-center">大家的留言</h2>
        {messages.map((msg) => (
          <Card key={msg.id} className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-gray-500" />
                    <CardTitle className="text-lg font-semibold">{msg.name}</CardTitle>
                </div>
                <p className="text-xs text-gray-500">
                    {new Date(msg.timestamp).toLocaleString()}
                </p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{msg.message}</p>
            </CardContent>
          </Card>
        ))}
        {messages.length === 0 && (
            <p className="text-center text-gray-500 py-8">还没有人留言，快来抢占第一个沙发吧！</p>
        )}
      </div>
    </div>
  );
} 