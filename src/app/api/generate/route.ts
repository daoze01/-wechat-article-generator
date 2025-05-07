import fs from 'fs';
console.log('Trying to import rewritePrompts from path');


import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';
import { rewritePrompts } from '../../../lib/rewritePrompts';

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
      const prompt = `\n${style}\n请根据以下要求写一篇公众号原创爆文：
- 主题：【${title}】
- 领域：【${field}】
- ${(humanize_tips as string[]).map((tip: string, idx: number) => `${idx + 1}. ${tip}`).join('\n- ')}
- 写作要求：
  1. 语言要自然、真诚、富有情绪感染力
  2. 大量使用第一人称叙述，加入个人真实经历和感悟
  3. 运用具体的生活场景和细节描写
  4. 适当使用口语化表达，避免过于正式和机械的语言
  5. 加入一些独特的观点和思考
  6. 使用生动的比喻和类比
  7. 适当加入一些网络流行语或热点话题
  8. 在合适的地方加入一些反问或互动性的表达
- 字数控制在1200-1500字，风格参考该领域近期10万+阅读的优质文章
- 请确保内容原创、自然、流畅，能通过AI检测工具的原创性检测
- 避免使用过于完美的结构或过于工整的句式
- 适当加入一些口语化的转折词和连接词
- 在文章中加入一些个人化的表达，如"我觉得"、"在我看来"等`;
      const response = await axios.post(
        DEEPSEEK_API_URL,
        {
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: '你是一个专业的公众号文章写作助手，擅长创作原创、有深度、有温度的文章。请根据用户提供的主题和领域，创作一篇符合公众号风格的优质文章。'
            },
            {
              role: 'user',
              content: prompt
            }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return NextResponse.json(response.data);
    } catch (error) {
      console.error('DeepSeek API请求失败', error);
      return NextResponse.json(
        { error: 'DeepSeek API请求失败' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('请求处理失败', error);
    return NextResponse.json(
      { error: '请求处理失败' },
      { status: 500 }
    );
  }
}