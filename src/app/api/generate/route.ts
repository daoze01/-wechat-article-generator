import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';
import { rewritePrompts } from '../../lib/rewritePrompts';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

if (!DEEPSEEK_API_KEY) {
  console.error('环境变量 DEEPSEEK_API_KEY 未设置');
}

// 清理Markdown标记的函数
function cleanMarkdown(text: string): string {
  return text
    .replace(/^#+\s*/gm, '') // 移除标题标记
    .replace(/\*\*/g, '') // 移除加粗标记
    .replace(/\*/g, '') // 移除斜体标记
    .replace(/^\s*[-*+]\s+/gm, '') // 移除列表标记
    .replace(/^\s*\d+\.\s+/gm, '') // 移除有序列表标记
    .replace(/`{1,3}/g, '') // 移除代码标记
    .replace(/_{1,2}/g, '') // 移除下划线标记
    .replace(/\[\[.*?\]\]/g, '') // 移除双括号链接
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // 保留链接文本，移除URL
    .trim();
}

// 备用的文章模板
const ARTICLE_TEMPLATE = {
  sections: [
    "引言：描述当前现象和背景",
    "现状分析：列举具体数据和案例",
    "原因分析：深入探讨背后的原因",
    "影响：分析这种现象的利弊",
    "建议：给读者的实用建议",
    "总结：对未来的展望"
  ]
};

// 使用模板生成文章（作为备用方案）
function generateFromTemplate(field: string, title: string) {
  const keywords = title.replace(/为什么|现在|如何|怎么|的|了|吗|\?|？/g, '').split(/\s+/);
  
  const content = ARTICLE_TEMPLATE.sections.map((section: string) => {
    const [sectionTitle, sectionDesc] = section.split('：');
    return `${sectionTitle}：\n${sectionDesc}与"${keywords.join(', ')}"相关的分析。\n\n`;
  }).join('');

  return {
    title: title,
    content: content + "\n\n注：本文由AI助手生成，仅供参考。欢迎在评论区分享您的观点。\n\n[当前处于备用模式生成]"
  };
}

export async function POST(request: NextRequest) {
  try {
    const { field, title } = await request.json();

    if (!field || !title) {
      return NextResponse.json(
        { error: '请提供文章领域和标题' },
        { status: 400 }
      );
    }

    if (!DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { error: 'API密钥未配置' },
        { status: 500 }
      );
    }

    try {
      const domainKey = field || '全部';
      const rewriteConfig = rewritePrompts[domainKey] || rewritePrompts['全部'];
      const { style, humanize_tips } = rewriteConfig;
      const prompt = `\n${style}\n请根据以下要求写一篇公众号原创爆文：\n- 主题：【${title}】\n- 领域：【${field}】\n- ${(humanize_tips as string[]).map((tip: string, idx: number) => `${idx + 1}. ${tip}`).join('\\n- ')}\n- 语言自然、真诚、富有情绪感染力，适当使用第一人称、细节、真实经历、生活化场景和个人感悟。\n- 字数控制在1200-1500字，风格参考该领域近期10万+阅读的优质文章。\n- 请确保内容原创、自然、流畅，能通过AI检测工具的原创性检测。`;
      const response = await axios.post(
        DEEPSEEK_API_URL,
        {
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: `