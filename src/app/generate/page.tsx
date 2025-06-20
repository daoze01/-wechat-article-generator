import { Metadata } from 'next';
import ArticleGenerator from '@/components/ArticleGenerator';

export const metadata: Metadata = {
  title: 'AI爆文生成器 - 一键生成公众号10W+爆款文章 | 公众号爆文网',
  description: '专业的AI爆文生成工具，一键生成高质量公众号文章。支持情感、职场、教育等40+领域，快速打造10W+爆款内容。',
  keywords: 'AI爆文生成器,公众号文章生成,10W+爆款文章,AI写作工具,自媒体创作,智能文案生成',
};

export default function GeneratePage() {
  return (
    <main className="min-h-screen p-4">
      <ArticleGenerator />
    </main>
  );
} 