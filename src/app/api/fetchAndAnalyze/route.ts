import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';
import { articleStyles, type ArticleStyle } from '../../../lib/articleStyles';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

interface Section {
  type: 'subtitle' | 'list' | 'divider' | 'paragraph';
  text: string;
  items?: string[];
}

interface Structure {
  title: string;
  sections: Section[];
  formatting: {
    emoji: boolean;
    divider: boolean;
  };
}

function analyzeStructure(content: string): Structure {
  // 提取标题（首行或首个非空行）
  const lines = content.split(/\r?\n/).map(l => l.trim());
  const title = lines.find(l => l.length > 0) || '';
  // 分段
  const paragraphs = content.split(/\n{2,}/).map(p => p.trim()).filter(p => p.length > 0);
  // 小标题、列表、分隔符等结构识别
  const sections: Section[] = paragraphs.map(p => {
    if (/^([（(（【#\d一二三四五六七八九十]+[）)】.、：:])/.test(p)) {
      return { type: 'subtitle', text: p };
    } else if (/^[-•●\d]+[.、\s]/.test(p)) {
      // 列表项
      const items = p.split(/\n|(?<=\s)[-•●\d]+[.、\s]/).map(i => i.trim()).filter(i => i);
      return { type: 'list', text: p, items };
    } else if (/^[-_—=]{3,}$/.test(p)) {
      return { type: 'divider', text: p };
    } else {
      return { type: 'paragraph', text: p };
    }
  });
  // 统计排版特征
  const hasEmoji = /[\uD83C-\uDBFF\uDC00-\uDFFF]+/.test(content);
  const hasDivider = content.match(/[-_—=]{3,}/g)?.length || 0;
  return {
    title,
    sections,
    formatting: {
      emoji: hasEmoji,
      divider: hasDivider > 0
    }
  };
}

export async function POST(request: NextRequest) {
  try {
    const { content, theme } = await request.json();
    if (!content || !theme) {
      return NextResponse.json({ error: '请粘贴参考文章内容并填写新主题' }, { status: 400 });
    }

    // 1. 结构化分析
    const structure = analyzeStructure(content);

    // 2. 拼接prompt，要求AI仿写标题和结构，但内容表达需原创
    let structureDesc = '';
    structure.sections.forEach((sec, idx) => {
      if (sec.type === 'subtitle') structureDesc += `\n小标题：${sec.text}`;
      if (sec.type === 'list') {
        const items = sec.items?.join('；');
        if (items) structureDesc += `\n列表：${items}`;
      }
      if (sec.type === 'divider') structureDesc += `\n分隔符：${sec.text}`;
      if (sec.type === 'paragraph') structureDesc += `\n段落：${sec.text.slice(0, 20)}...`;
    });
    
    // 使用情感领域的配置作为默认配置
    const defaultConfig = articleStyles['情感'];
    const { style, rewrite_instruction, prompt: basePrompt } = defaultConfig;
    
    const finalPrompt = `\n${style}\n${rewrite_instruction}\n${basePrompt}\n请仿照以下对标文章的标题、结构、排版和风格，创作一篇全新公众号原创爆文。要求：\n- 标题风格与对标文章一致，但表达不同。\n- 结构、排版、分段、列表等与对标文章一致，但内容表达必须原创，不能直接复制原文句子。\n- 用不同的语句和用词表达相同意思，适合公众号发布，能通过AI检测工具的原创性检测。\n- 总字数请控制在1400-1500字之间，如未达到字数请继续补充内容。\n\n【对标文章标题】\n${structure.title}\n\n【对标文章结构】${structureDesc}\n\n【新主题】\n${theme}\n\n请严格按照上述要求生成新文章，确保内容自然流畅、富有细节和情感，AI率低于20%。`;

    // 3. 调用Deepseek生成
    if (!DEEPSEEK_API_KEY) {
      return NextResponse.json({ error: 'API密钥未配置' }, { status: 500 });
    }
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: '你是一位专业的公众号写手，善于模仿不同风格。' },
          { role: 'user', content: finalPrompt }
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
    const aiContent = response.data?.choices?.[0]?.message?.content || '';

    return NextResponse.json({
      generated: aiContent,
      structure,
      theme
    });
  } catch (error) {
    return NextResponse.json({ error: '分析或生成失败', detail: String(error) }, { status: 500 });
  }
} 