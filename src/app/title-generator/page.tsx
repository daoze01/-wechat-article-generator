import { TitleGenerator } from '@/components/TitleGenerator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '爆文标题生成器',
  description: '输入领域和关键词，利用AI生成5个高质量的爆款公众号文章标题。',
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