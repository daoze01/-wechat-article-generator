'use client';

import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ARTICLE_FIELDS } from '../config/constants';
import { cn } from '../utils/utils';
import ArticlePreview from './ArticlePreview';
import { message } from 'antd';

type ArticleField = typeof ARTICLE_FIELDS[number];

function ArticleGeneratorInternal() {
  const searchParams = useSearchParams();
  const [field, setField] = useState<ArticleField>(ARTICLE_FIELDS[0]);
  const [title, setTitle] = useState('');
  const [article, setArticle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 对标生成相关状态
  const [refUrl, setRefUrl] = useState('');
  const [refContent, setRefContent] = useState('');
  const [refTheme, setRefTheme] = useState('');
  const [refLoading, setRefLoading] = useState(false);
  const [refError, setRefError] = useState('');
  const [refResult, setRefResult] = useState<{ refTitle: string; refContent: string; theme: string; generated: string } | null>(null);

  useEffect(() => {
    const titleFromUrl = searchParams.get('title');
    if (titleFromUrl) {
      setTitle(titleFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setArticle('');
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ field, title }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '生成文章失败');
      }

      const data = await response.json();
      // 处理换行符并设置文章内容
      setArticle(data.content.replace(/\\n/g, '\n'));
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成文章时出错');
    } finally {
      setLoading(false);
    }
  };

  // 对标生成提交
  const handleRefSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRefLoading(true);
    setRefError('');
    setRefResult(null);
    try {
      const response = await fetch('/api/fetchAndAnalyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: refContent, theme: refTheme }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '分析生成失败');
      }
      const data = await response.json();
      setRefResult(data);
    } catch (err) {
      setRefError(err instanceof Error ? err.message : '分析生成时出错');
    } finally {
      setRefLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#007AFF] mb-4">
          公众号爆文 - AI文章生成器
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          专业的AI驱动内容创作助手，为您快速生成高质量原创文章
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        {/* 直接生成 */}
        <div className="flex-1 card mb-10 md:mb-0">
          <h2 className="text-xl font-bold mb-4">直接生成</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="field" className="block text-sm font-medium text-gray-700">
                文章领域
              </label>
              <select
                id="field"
                value={field}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setField(e.target.value as ArticleField)}
                className="input"
                required
              >
                {ARTICLE_FIELDS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                文章标题
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                className="input"
                placeholder="输入文章标题"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "btn btn-primary w-full",
                loading && "opacity-70 cursor-not-allowed"
              )}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  正在生成...
                </span>
              ) : '生成文章'}
            </button>
          </form>
          {error && (
            <div className="p-4 mt-6 rounded-xl bg-red-50 border border-red-200">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          {article && (
            <div className="mt-6">
              <ArticlePreview title={title} content={article} />
            </div>
          )}
        </div>
        {/* 对标生成 */}
        <div className="flex-1 card">
          <h2 className="text-xl font-bold mb-4">对标生成</h2>
          <form className="space-y-6" onSubmit={handleRefSubmit}>
            <div className="space-y-2">
              <label htmlFor="ref-content" className="block text-sm font-medium text-gray-700">
                参考文章内容（请直接粘贴公众号文章正文）
              </label>
              <textarea
                id="ref-content"
                className="input min-h-[120px]"
                placeholder="请粘贴公众号文章正文内容"
                value={refContent}
                onChange={e => setRefContent(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="ref-theme" className="block text-sm font-medium text-gray-700">
                新文章主题/关键词
              </label>
              <input
                type="text"
                id="ref-theme"
                className="input"
                placeholder="请输入新文章主题或关键词"
                value={refTheme}
                onChange={e => setRefTheme(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={cn("btn btn-primary w-full", refLoading && "opacity-70 cursor-not-allowed")}
              disabled={refLoading}
            >
              {refLoading ? '分析生成中...' : '分析生成'}
            </button>
          </form>
          {refError && (
            <div className="p-4 mt-6 rounded-xl bg-red-50 border border-red-200">
              <p className="text-red-700">{refError}</p>
            </div>
          )}
          {refResult && (
            <div className="mt-6 relative">
              <h3 className="text-lg font-semibold mb-2">生成结果</h3>
              <button
                className="btn btn-primary absolute top-0 right-0"
                onClick={async () => {
                  await navigator.clipboard.writeText(refResult.generated || '');
                  message.success('文章内容已复制，可直接粘贴到公众号！');
                }}
              >
                复制全文
              </button>
              <div className="whitespace-pre-line bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-800 text-base leading-7 mt-8">
                {refResult.generated}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ArticleGenerator() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ArticleGeneratorInternal />
    </React.Suspense>
  )
} 