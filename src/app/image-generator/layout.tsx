import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI图片生成器 - 公众号配图一键生成 | 公众号爆文网',
  description: '专业的AI图片生成工具，输入文字描述即可生成高质量公众号配图。支持封面图、文章内图多种尺寸，无版权风险。',
  keywords: 'AI图片生成,公众号配图,AI绘画,智能配图,文章配图生成器,免费图片生成',
};

export default function ImageGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 