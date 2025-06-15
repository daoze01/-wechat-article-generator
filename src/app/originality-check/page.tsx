'use client';

import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LoaderCircle } from 'lucide-react';

export default function OriginalityCheckerPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const checkOriginality = async () => {
    setLoading(true);
    setResult('');

    const prompt = `你是微信公众号平台的原创审核系统，请模拟判断以下文章是否适合"声明原创"，并说明理由。

文章如下：\n${input}

请从以下五个维度打分（每项0-5）：
1. 是否有独立观点表达
2. 是否有原创素材或个人经历
3. 是否语气自然、人称一致
4. 是否存在AI模板痕迹
5. 内容结构是否完整、饱满

请输出：
- 推荐声明原创：是/否
- 总分（0-25）：
- 理由：
- 优化建议（用于提升原创性）：`;

    try {
      const res = await fetch('/api/originality-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: prompt }),
      });

      const responseText = await res.text();

      if (!res.ok) {
        throw new Error(responseText || 'API 请求失败，且未返回具体错误信息。');
      }
      
      if (!responseText) {
        setResult('检测失败：API 返回了空响应。请稍后重试。');
        return;
      }

      try {
        const data = JSON.parse(responseText);
        setResult(data.result || '检测成功，但未返回有效结果。');
      } catch (e) {
        // The response was not valid JSON. It might be a plain text response from the AI or an error.
        // We can display it directly.
        setResult(responseText);
      }
    } catch (error) {
      console.error(error);
      setResult(`检测失败，发生网络或服务器错误：\n${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-3xl space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">公众号文章原创度检测</h1>
            <p className="mt-3 text-lg text-muted-foreground">
              模拟微信官方审核机制，从多个维度评估您的文章原创性，并提供优化建议。
            </p>
          </div>
          <Card>
            <CardContent className="p-6">
                <Textarea
                    placeholder="在这里粘贴您的公众号文章全文..."
                    className="min-h-[250px] text-base"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={loading}
                />
            </CardContent>
          </Card>
          <div className="text-center">
              <Button onClick={checkOriginality} disabled={loading || !input.trim()} size="lg">
                {loading ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> 正在检测...
                  </>
                ) : (
                  '开始原创检测'
                )}
              </Button>
          </div>
          {result && (
            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">检测结果</h2>
                <div className="whitespace-pre-wrap rounded-lg border border-blue-200 bg-blue-50 p-4 font-sans text-base text-gray-800">
                    {result}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
    </main>
  );
} 