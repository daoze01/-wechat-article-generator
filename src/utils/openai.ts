import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateArticleWithAI(field: string, title: string) {
  try {
    const prompt = `请以专业的公众号文章风格，写一篇关于"${title}"的文章。
要求：
1. 文章领域：${field}
2. 结构包含：引言、现状分析、原因分析、影响分析、建议和总结
3. 语言要生动有趣，适合公众号阅读
4. 每个部分要有小标题
5. 增加一些数据支持
6. 文章长度在1500字左右

请直接返回文章内容，不需要其他解释。`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "你是一个专业的公众号文章写手，擅长写作吸引人的文章。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: process.env.OPENAI_API_MODEL || "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = completion.choices[0]?.message?.content || '';
    return {
      title: `${title} - AI深度解析`,
      content
    };
  } catch (error) {
    console.error('调用 AI 接口出错:', error);
    throw error;
  }
} 