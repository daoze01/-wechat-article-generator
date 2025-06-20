import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '用户留言板 - 分享体验与建议 | 公众号爆文网',
  description: '在线留言板，分享您对AI爆文生成器的使用体验，提出宝贵意见和建议。我们重视每一位用户的反馈，持续优化产品体验。',
  keywords: '用户留言板,用户反馈,使用体验,产品建议,在线留言,用户社区',
};

export default function GuestbookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 