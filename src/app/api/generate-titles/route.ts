import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { deepseek } from '@ai-sdk/deepseek';

// 确保您的 DeepSeek API 密钥已在环境变量中设置
// DEEPSEEK_API_KEY

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { domain, keywords } = await req.json();

    if (!domain || !keywords) {
      return NextResponse.json({ error: '领域和关键词不能为空' }, { status: 400 });
    }

    // 精心设计的 Prompt，引导大模型按要求生成标题
    const prompt = `你是一个深谙社交媒体传播规律的标题创作大师，尤其擅长为公众号文章撰写爆款标题。
请严格遵循以下步骤：
1. 分析在【${domain}】领域中，那些阅读量最高的文章标题通常具备的框架、风格和核心吸引力（例如：悬念式、利益驱动式、反差式、数字列表式、名人效应式等）。
2. 基于你对该领域爆款标题风格的分析，并结合核心关键词【${keywords}】。
3. 创作 5 个全新的、原创的、风格鲜明且极具吸引力的公众号文章标题。

要求：
- 每个标题都必须是独立的潜在爆款。
- 标题要紧扣关键词【${keywords}】。
- 风格要完全符合【${domain}】领域的读者偏好。
- 严格按照 JSON 数组的格式返回结果，例如：["标题1", "标题2", "标题3", "标题4", "标题5"]。
- 不要返回任何多余的解释、介绍或非 JSON 格式的文本。`;

    const { text } = await generateText({
      model: deepseek('deepseek-chat'),
      prompt: prompt,
    });

    // 尝试解析模型返回的文本为 JSON 数组
    let titles;
    try {
      // 先尝试清理文本，提取JSON部分
      let cleanText = text.trim();
      
      // 如果文本包含代码块标记，提取其中的内容
      const jsonMatch = cleanText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        cleanText = jsonMatch[1].trim();
      }
      
      // 尝试解析JSON
      titles = JSON.parse(cleanText);
      
      // 确保返回的是数组
      if (!Array.isArray(titles)) {
        throw new Error('返回的不是数组格式');
      }
      
    } catch (parseError) {
      console.error('JSON解析失败:', parseError);
      console.error('原始文本:', text);
      
      // 如果JSON解析失败，尝试从文本中提取标题
      const lines = text.split('\n').filter(line => line.trim());
      titles = lines
        .filter(line => line.includes('：') || line.includes(':') || line.match(/^\d+[\.\)]/))
        .map(line => line.replace(/^\d+[\.\)\s]*/, '').replace(/^[：:]\s*/, '').trim())
        .filter(title => title.length > 0)
        .slice(0, 5);
      
      // 如果还是没有有效标题，返回默认标题
      if (titles.length === 0) {
        titles = [
          `${keywords}的深度解析`,
          `关于${keywords}，你需要知道的事`,
          `${keywords}：专家的建议`,
          `${keywords}完全指南`,
          `${keywords}背后的真相`
        ];
      }
    }

    return NextResponse.json({ titles });

  } catch (error) {
    console.error('Error generating titles:', error);
    return NextResponse.json({ error: '生成标题时发生错误，请稍后重试。' }, { status: 500 });
  }
} 