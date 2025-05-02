import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function generateMetaDescription(text: string): string {
  return truncateText(text, 160);
}

export function getArticleKeywords(field: string): string[] {
  return [
    'AI写作',
    '智能创作',
    '文章生成',
    field,
    ...(field === '养老金' ? ['养老政策', '社会保障'] : []),
    ...(field === '美食' ? ['美食文化', '烹饪技巧'] : []),
    ...(field === '民生' ? ['民生政策', '社会保障'] : []),
    ...(field === '人工智能' ? ['AI技术', '智能应用'] : []),
    ...(field === '情感' ? ['情感话题', '心理分析'] : []),
    ...(field === '教育' ? ['教育改革', '素质教育'] : []),
    ...(field === '财经' ? ['投资理财', '市场分析'] : []),
    ...(field === '健康' ? ['健康科普', '养生保健'] : []),
    ...(field === '职场' ? ['职业发展', '职场技巧'] : []),
    ...(field === '科技' ? ['科技创新', '数字化转型'] : []),
    ...(field === '文化' ? ['文化传承', '艺术鉴赏'] : []),
    ...(field === '旅游' ? ['旅行攻略', '景点推荐'] : []),
    ...(field === '体育' ? ['体育赛事', '运动健康'] : []),
    ...(field === '娱乐' ? ['娱乐资讯', '明星动态'] : []),
    ...(field === '社会' ? ['社会热点', '民生关注'] : []),
  ];
} 