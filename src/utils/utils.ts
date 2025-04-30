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
    ...(field === '民生' ? ['民生政策', '社会保障'] : []),
    ...(field === '科技' ? ['科技创新', '数字化转型'] : []),
    ...(field === '教育' ? ['教育改革', '素质教育'] : []),
  ];
} 