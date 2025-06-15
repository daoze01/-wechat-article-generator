import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const apiKey = process.env.SILICONFLOW_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: '后台未配置 SiliconFlow API 密钥。' },
      { status: 500 }
    );
  }

  try {
    const { prompt, size } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: '图片描述 (prompt) 不能为空。' }, { status: 400 });
    }

    // 根据前端传来的尺寸标识，映射为 API 需要的尺寸字符串
    // 1:1 尺寸使用 1024x1024
    // 封面图 (2.35:1) 使用一个接近该比例且常见的尺寸，如 1344x576
    const imageSize = size === 'cover' ? '1344x576' : '1024x1024';

    const response = await fetch('https://api.siliconflow.cn/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'Kwai-Kolors/Kolors',
        prompt: prompt,
        image_size: imageSize,
        num_inference_steps: 25, // 默认参数，可根据需要调整
        guidance_scale: 6,       // 默认参数，可根据需要调整
      }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('SiliconFlow API Error:', errorData);
        throw new Error(errorData.message || `API 请求失败，状态码: ${response.status}`);
    }

    const data = await response.json();

    if (!data.images || data.images.length === 0 || !data.images[0].url) {
        throw new Error('API 返回的数据格式不正确，缺少图片 URL。');
    }

    return NextResponse.json({ imageUrl: data.images[0].url });

  } catch (error) {
    console.error('调用 SiliconFlow API 时出错:', error);
    const errorMessage = error instanceof Error ? error.message : '发生未知错误';
    return NextResponse.json({ error: `图片生成失败: ${errorMessage}` }, { status: 500 });
  }
} 