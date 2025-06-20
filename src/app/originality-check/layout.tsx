import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI原创检测工具 - 提升文章原创度专家评估 | 公众号爆文网',
  description: '专业的文章原创度检测工具，模拟微信公众号审核机制，多维度评估文章原创性，提供专业优化建议，提升内容质量。',
  keywords: 'AI原创检测,文章原创度,公众号原创,内容查重,原创性评估,文章质量检测',
};

export default function OriginalityCheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 