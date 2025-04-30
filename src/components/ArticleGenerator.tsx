'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';

// 定义所有可选的文章领域
const ARTICLE_FIELDS = [
  '全部',
  '小绿书',
  '科技',
  '职场',
  '情感',
  '影视',
  '军事国际',
  '星座命理',
  '娱乐',
  '财经',
  '资讯热点',
  '文化',
  '美食',
  '汽车',
  '文案',
  '民生',
  '教育',
  '体育健身',
  '游戏',
  '科学',
  '房产',
  '育儿',
  '文摘',
  '动漫',
  '历史',
  '体制',
  '美妆时尚',
  '旅游',
  '法律',
  '壁纸头像',
  '个人成长',
  '商业营销',
  '健康养生',
  '搞笑',
  '三农',
  '宠物',
  '数码',
  '生活',
  '开发者',
  '摄影',
  '家居',
  '校园',
  '宗教',
] as const;

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

      const result = await response.json();
      setArticle(result.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成文章时出错');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">AI 文章生成器</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label htmlFor="field" className="block text-sm font-medium mb-1">
            文章领域
          </label>
          <select
            id="field"
            value={field}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setField(e.target.value as ArticleField)}
            className="w-full p-2 border rounded"
            required
          >
            {ARTICLE_FIELDS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            文章标题
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="输入文章标题"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 text-white rounded ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? '生成中...' : '生成文章'}
        </button>
      </form>

      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">
          API 调用失败: {error}
        </div>
      )}

      {article && (
        <div className="prose max-w-none">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <div className="whitespace-pre-wrap">{article}</div>
        </div>
      )}
    </div>
  );
} 