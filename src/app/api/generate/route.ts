import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

if (!DEEPSEEK_API_KEY) {
  console.error('环境变量 DEEPSEEK_API_KEY 未设置');
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
    return `【${sectionTitle}】\n${sectionDesc}与"${keywords.join(', ')}"相关的分析。\n\n`;
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
      const response = await axios.post(
        DEEPSEEK_API_URL,
        {
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: `请以专业公众号作者的口吻，围绕"${field}"领域的主题"${title}"写一篇文章。文章要求：
1. 开头要吸引人，抓住读者眼球
2. 分析当前形势
3. 深入剖析原因
4. 探讨影响
5. 给出实用建议
6. 总结展望
请确保文章逻辑清晰，论述有力，观点独到。` }],
          temperature: 0.7,
          max_tokens: 2000,
          top_p: 0.95,
          presence_penalty: 0.5,
          frequency_penalty: 0.5,
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

      return NextResponse.json({
        title: title,
        content: response.data.choices[0].message.content
      });
    } catch (error) {
      console.error('DeepSeek API调用失败:', error);
      
      if (axios.isAxiosError(error)) {
        // 处理余额不足的情况
        if (error.response?.status === 402) {
          console.log('API余额不足，切换到模板生成模式');
          // 使用模板生成
          return NextResponse.json(generateFromTemplate(field, title));
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
      
      // 其他错误情况下也使用模板生成
      console.log('API调用出错，切换到模板生成模式');
      return NextResponse.json(generateFromTemplate(field, title));
    }
  } catch (error) {
    console.error('请求处理失败:', error);
    return NextResponse.json(
      { error: '生成文章失败，请稍后重试' },
      { status: 500 }
    );
  }
} 