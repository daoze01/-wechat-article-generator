'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { LoaderCircle, Image as ImageIcon, Download, Sparkles } from 'lucide-react';

type ImageSize = 'cover' | 'inline';

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [imageSize, setImageSize] = useState<ImageSize>('cover');
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('请输入图片描述。');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedImageUrl('');

    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, size: imageSize })
      });
      
      if (res.ok) {
        const data = await res.json();
        setGeneratedImageUrl(data.imageUrl);
      } else {
        let errorMessage = '图片生成失败，请稍后重试。';
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          // The error response wasn't JSON. Use a generic error.
          errorMessage = `服务器错误，状态码: ${res.status}`;
        }
        throw new Error(errorMessage);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : '发生未知错误');
    } finally {
      setLoading(false);
    }
  };

  const getImageDimensions = () => {
    return imageSize === 'cover' 
      ? { width: 900, height: 383, aspectRatio: '900 / 383' }
      : { width: 400, height: 400, aspectRatio: '1 / 1' };
  };

  const dimensions = getImageDimensions();

  return (
    <main className="flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">AI 图片生成器</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            输入文字描述，选择图片尺寸，即可生成高质量的公众号配图。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left Side: Controls */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>生成设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="prompt" className="font-semibold">图片描述 (Prompt)</Label>
                <Textarea
                  id="prompt"
                  placeholder="例如：一只可爱的宇航员小猫，漂浮在绚丽的星云中，数字艺术风格，色彩鲜艳"
                  className="min-h-[150px] text-base"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label className="font-semibold">图片尺寸</Label>
                <RadioGroup
                  value={imageSize}
                  onValueChange={(value: ImageSize) => setImageSize(value)}
                  className="flex items-center space-x-6 pt-2"
                  disabled={loading}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cover" id="cover" />
                    <Label htmlFor="cover">封面图 (2.35:1)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inline" id="inline" />
                    <Label htmlFor="inline">文章内图 (1:1)</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                size="lg"
                className="w-full py-6 text-lg font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="mr-2 h-5 w-5 animate-spin" /> 正在生成...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    立即生成图片
                  </>
                )}
              </Button>
              {error && <p className="text-sm text-center text-red-600 pt-2">{error}</p>}
            </CardContent>
          </Card>

          {/* Right Side: Image Preview */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>图片预览</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="flex items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 transition-all duration-300"
                style={{ aspectRatio: dimensions.aspectRatio }}
              >
                {loading ? (
                  <div className="flex flex-col items-center text-muted-foreground">
                    <LoaderCircle className="h-10 w-10 animate-spin" />
                    <p className="mt-2 text-sm">正在召唤灵感...</p>
                  </div>
                ) : generatedImageUrl ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={generatedImageUrl}
                      alt={prompt || '生成的图片'}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center p-8 text-center text-muted-foreground">
                    <ImageIcon className="h-12 w-12" />
                    <p className="mt-2 text-sm">在这里预览您生成的图片</p>
                  </div>
                )}
              </div>
              {generatedImageUrl && !loading && (
                 <Button asChild variant="default" className="w-full mt-4">
                    <a href={generatedImageUrl} download={`ai_image_${Date.now()}.png`}>
                        <Download className="mr-2 h-4 w-4" />
                        下载图片
                    </a>
                 </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
} 