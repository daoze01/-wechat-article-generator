'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ARTICLE_FIELDS } from '../config/constants';

const domains = ARTICLE_FIELDS;

export function TitleGenerator() {
  const [domain, setDomain] = useState(domains[0]);
  const [keywords, setKeywords] = useState('');
  const [titles, setTitles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keywords.trim()) {
      setError('请输入关键词。');
      return;
    }

    setIsLoading(true);
    setError(null);
    setTitles([]);

    try {
      const response = await fetch('/api/generate-titles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain, keywords }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || '请求失败，请稍后再试。');
      }

      const data = await response.json();
      setTitles(data.titles);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Domain Selection */}
          <div>
            <label htmlFor="domain-select" className="block text-sm font-medium text-gray-700 mb-2">
              选择领域
            </label>
            <select
              id="domain-select"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            >
              {domains.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          
          {/* Keywords Input */}
          <div>
            <label htmlFor="keywords-input" className="block text-sm font-medium text-gray-700 mb-2">
              输入核心关键词
            </label>
            <input
              id="keywords-input"
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="例如：人工智能、减肥、情绪价值"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              生成中...
            </>
          ) : '🚀 立即生成爆款标题'}
        </button>
      </form>

      {error && (
        <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
          <strong className="font-bold">出错了：</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {titles.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-center mb-2">为你生成了 5 个爆款标题：</h3>
          <p className="text-center text-gray-500 mb-6">点击选中的题目，立即生成爆款文章 👇</p>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="space-y-4">
              {titles.map((title, index) => (
                <Link
                  key={index}
                  href={{
                    pathname: '/generate',
                    query: { title: title },
                  }}
                  className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 cursor-pointer"
                >
                  <span className="font-semibold text-lg text-gray-800">{index + 1}. {title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 