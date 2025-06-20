import { TitleGenerator } from '@/components/TitleGenerator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI爆文标题生成器 - 一键生成吸睛10W+标题 | 公众号爆文网',
  description: '专业的AI爆文标题生成工具，输入关键词即可生成5个高质量爆款标题。提升文章点击率，打造10W+爆文必备工具。',
  keywords: 'AI标题生成器,爆文标题,公众号标题,10W+标题,文章标题优化,标题党生成器',
};

export default function TitleGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          公众号爆文标题生成器
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          选择一个领域，输入核心关键词，AI 将为您创作 5 个极具吸引力的爆款标题。
        </p>
      </div>
      <TitleGenerator />
    </div>
  );
} 