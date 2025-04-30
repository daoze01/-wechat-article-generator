'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { ARTICLE_FIELDS } from '../config/constants';
import { cn } from '../utils/utils';
import ArticlePreview from './ArticlePreview';

type ArticleField = typeof ARTICLE_FIELDS[number];

export default function ArticleGenerator() {
  const [field, setField] = useState<ArticleField>(ARTICLE_FIELDS[0]);
  const [title, setTitle] = useState('');
  const [article, setArticle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#007AFF] mb-4">
          公众号爆文 - AI文章生成器
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          专业的AI驱动内容创作助手，为您快速生成高质量原创文章
        </p>
      </div>
      
      <div className="card">
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
      </div>

      {error && (
        <div className="p-4 mt-6 rounded-xl bg-red-50 border border-red-200">
          <p className="text-red-700">
            {error}
          </p>
        </div>
      )}

      {article && (
        <div className="mt-6">
          <ArticlePreview title={title} content={article} />
        </div>
      )}
    </div>
  );
} 