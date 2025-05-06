import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';
import { rewritePrompts } from '@/lib/rewritePrompts';

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
              content: `你是一位专业的公众号写手，擅长写${field}领域的文章。`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2500,
          top_p: 0.85,
          presence_penalty: 0.3,
          frequency_penalty: 0.3,
        },
        {
          headers: {
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.data?.choices?.[0]?.message?.content) {
        throw new Error('API 返回的数据格式不正确');
      }

      // 清理返回的文本中的Markdown标记
      let cleanedContent = cleanMarkdown(response.data.choices[0].message.content);
      
      // 确保文章末尾有适当的标点符号
      cleanedContent = cleanedContent.replace(/([^。！？\n])\s*$/, '$1。');

      return NextResponse.json({
        title: title,
        content: cleanedContent
      });

    } catch (error) {
      console.error('DeepSeek API调用失败:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 402) {
          return NextResponse.json(
            { error: 'API余额不足，请联系管理员' },
            { status: 402 }
          );
        }
        
        if (error.response?.status === 401) {
          return NextResponse.json(
            { error: 'API密钥无效' },
            { status: 401 }
          );
        }
        
        if (error.response?.status === 429) {
          return NextResponse.json(
            { error: 'API调用次数超限，请稍后再试' },
            { status: 429 }
          );
        }
      }
      
      return NextResponse.json(
        { error: '生成文章失败，请稍后重试' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('请求处理失败:', error);
    return NextResponse.json(
      { error: '生成文章失败，请稍后重试' },
      { status: 500 }
    );
  }
} 