'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// 模板数据配置
const templateConfigs = {
  emotion: {
    icon: "💔",
    title: "情感爆文模板",
    description: "爱而不得：如何写出让人心碎的爆款情感文？",
    color: "rose",
    placeholder: "请输入情感话题，如：异地恋、单恋、分手等",
    sampleTopics: ["异地恋的心酸", "暗恋不敢表白", "分手后的挽回", "婚姻中的背叛"],
    contentTemplate: `
# {title}

## 引言
在这个快节奏的时代，每个人都在寻找属于自己的爱情。然而，爱情的路上总是充满了坎坷和不确定性。今天，我们来聊聊{topic}，这个触动无数人心弦的话题。

## 现象分析
### 普遍存在的问题
{topic}在现代社会中越来越常见，它不仅影响着当事人的情感状态，更是对整个人生观和价值观的挑战。

### 深层次的原因
- 社会环境的变化
- 个人成长经历的影响  
- 沟通方式的缺失
- 期待与现实的落差

## 情感共鸣
### 那些说不出的痛
你是否也曾经历过{topic}？那种心痛的感觉，就像是心脏被人狠狠地攥住，让人难以呼吸。

### 午夜时分的独白
"为什么偏偏是我？为什么爱情总是这么残酷？"这样的疑问，在无数个失眠的夜晚里，反复地折磨着我们的内心。

## 走出困境的建议
### 接受现实
首先要学会接受现实，承认{topic}确实给我们带来了痛苦，但这并不意味着我们要一直沉浸在这种痛苦中。

### 重新审视自己
利用这个机会，重新审视自己的感情观和人生观，思考什么才是真正适合自己的。

### 寻求支持
不要独自承受所有的痛苦，向朋友、家人或专业人士寻求帮助和支持。

## 成长与蜕变
### 痛苦是成长的催化剂
经历{topic}虽然痛苦，但它也是我们成长路上不可或缺的一课。它教会我们坚强，教会我们珍惜。

### 更好的自己
走过这段艰难的路程，我们会发现自己变得更加成熟，更加懂得如何去爱和被爱。

## 写在最后
{topic}或许是人生中最难熬的一段时光，但请相信，黑暗过后必定是黎明。每一段感情的结束，都是为了迎接更好的开始。

愿每一个正在经历{topic}的人，都能够勇敢地面对，坚强地走过，最终找到属于自己的幸福。

---
**互动话题：你对{topic}有什么看法？欢迎在评论区分享你的故事。**
    `
  },
  health: {
    icon: "🧓",
    title: "养生爆文模板", 
    description: "60岁后如何科学养生，让身体年轻10岁？",
    color: "green",
    placeholder: "请输入养生话题，如：血压控制、饮食调理、运动保健等",
    sampleTopics: ["高血压预防", "糖尿病饮食", "老年人运动", "睡眠质量提升"],
    contentTemplate: `
# {title}

## 前言：健康是最大的财富
人到中年，我们开始真正理解"健康是最大的财富"这句话的含义。关于{topic}，这不仅是一个健康话题，更是关乎我们生活质量的重要议题。

## 现状分析
### 普遍存在的问题
据最新统计数据显示，{topic}已经成为影响国人健康的重要因素之一。很多人由于缺乏正确的认知，往往在这个问题上走了不少弯路。

### 常见误区
- 盲目相信偏方
- 忽视科学依据
- 缺乏系统性的调理方案
- 急于求成的心态

## 科学解读
### 医学原理
从现代医学的角度来看，{topic}需要我们从多个维度来理解和应对：

1. **生理机制**：了解身体的基本运作原理
2. **影响因素**：分析导致问题的根本原因
3. **干预方法**：制定科学有效的应对策略

### 专家观点
知名健康专家指出："{topic}需要个体化的解决方案，不能一概而论。"

## 实用建议
### 日常调理方案
#### 饮食篇
- **早餐**：营养均衡，避免过油过甜
- **午餐**：荤素搭配，控制分量
- **晚餐**：清淡为主，七分饱即可

#### 运动篇
- **有氧运动**：每天30分钟中等强度运动
- **力量训练**：每周2-3次适度的肌肉训练
- **柔韧性练习**：太极、瑜伽等舒缓运动

#### 作息篇
- **规律作息**：固定的睡眠时间
- **充足睡眠**：保证7-8小时优质睡眠
- **午休习惯**：适当的午间休息

### 注意事项
1. 循序渐进，避免急躁
2. 个体差异，因人而异
3. 定期检查，及时调整
4. 心态平和，持之以恒

## 成功案例分享
### 案例一：张阿姨的康复之路
60岁的张阿姨通过科学的{topic}管理，成功改善了自己的健康状况...

### 案例二：李大爷的养生心得
65岁的李大爷坚持科学养生两年，各项指标都有了显著改善...

## 专业建议
### 什么情况下需要就医？
- 症状持续不缓解
- 出现新的不适症状
- 指标异常波动
- 影响正常生活

### 如何选择专业医生？
- 选择正规医疗机构
- 了解医生的专业背景
- 多听取专业意见
- 建立长期的医患关系

## 写在最后
{topic}是一个需要长期关注和管理的话题。希望通过今天的分享，能够帮助大家树立正确的健康观念，采用科学的方法来维护自己的身体健康。

记住：健康不是一蹴而就的，而是需要我们在日常生活中点点滴滴的积累。让我们一起努力，为了更健康、更美好的明天！

---
**健康提醒：本文内容仅供参考，具体问题请咨询专业医生。**
**互动话题：你在{topic}方面有什么经验分享？欢迎在评论区交流。**
    `
  },
  trending: {
    icon: "🌍",
    title: "热点话题模板",
    description: "某地高考满分作文引发热议，你怎么看？",
    color: "blue",
    placeholder: "请输入热点话题，如：教育改革、社会现象、时事新闻等",
    sampleTopics: ["高考改革", "网络暴力", "职场内卷", "老龄化社会"],
    contentTemplate: `
# {title}

## 事件背景
近日，关于{topic}的讨论在网络上引起了广泛关注。这个话题不仅涉及到个人利益，更是反映了当前社会的深层次问题。

## 多角度分析
### 支持方观点
支持者认为，{topic}体现了社会的进步和发展：
- 观点一：符合时代发展趋势
- 观点二：有利于社会公平正义
- 观点三：促进了相关领域的改革

### 反对方观点
反对者则提出了不同的看法：
- 观点一：可能带来负面影响
- 观点二：实施过程中存在困难
- 观点三：需要更多时间来验证效果

### 中立方观点
理性的观察者认为：
- 需要客观看待这个问题
- 任何事物都有两面性
- 关键在于如何平衡各方利益

## 深度思考
### 问题的本质
{topic}表面上看是一个具体问题，但实际上它反映的是更深层次的社会议题：

#### 社会变迁的体现
在快速发展的时代背景下，各种新问题、新矛盾不断涌现，{topic}正是这种变迁的一个缩影。

#### 价值观的碰撞
不同世代、不同背景的人对{topic}有着截然不同的看法，这反映了当前社会价值观的多元化。

#### 制度的完善
{topic}的出现也暴露了现有制度和机制中的一些不足，需要我们进一步完善和改进。

## 国际视野
### 海外经验
让我们看看其他国家是如何处理类似{topic}的问题的：
- **欧美模式**：注重个人权利与社会责任的平衡
- **亚洲模式**：强调集体利益与传统文化的传承
- **北欧模式**：通过高福利制度来缓解社会矛盾

### 可借鉴的做法
1. 建立完善的法律法规体系
2. 加强公众教育和宣传
3. 建立多方参与的协商机制
4. 注重政策的渐进式实施

## 个人思考
### 我们应该如何看待{topic}？
作为普通民众，我们应该：

#### 保持理性
不被情绪左右，用理性的眼光看待问题

#### 多元思考
尝试从不同角度理解问题，避免非黑即白的思维

#### 积极参与
通过合法途径表达自己的观点和建议

#### 持续关注
关注事态发展，为社会进步贡献自己的力量

## 未来展望
### 可能的发展趋势
基于当前的讨论热度和社会关注度，{topic}在未来可能会：
- 推动相关政策的调整和完善
- 引发更深层次的社会讨论
- 催生新的解决方案和创新模式

### 我们的期待
希望通过理性的讨论和建设性的建议，{topic}能够得到妥善的解决，为社会的和谐发展贡献力量。

## 写在最后
{topic}作为一个社会话题，它的意义不仅在于问题本身，更在于它引发的思考和讨论。在这个信息爆炸的时代，我们更需要保持冷静的头脑和理性的思考。

让我们以开放的心态，建设性的态度，共同参与到这个话题的讨论中来，为建设更美好的社会贡献自己的智慧和力量。

---
**理性讨论：每个人都有表达观点的权利，但请保持理性和尊重。**
**互动话题：对于{topic}，你有什么看法？欢迎理性讨论。**
    `
  }
};

interface TemplatePageProps {
  params: {
    type: string;
  };
}

export default function TemplatePage() {
  const params = useParams();
  const router = useRouter();
  const [topic, setTopic] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const templateType = params.type as string;
  const config = templateConfigs[templateType as keyof typeof templateConfigs];

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">模板不存在</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const generateContent = () => {
    if (!topic.trim()) {
      alert('请输入话题内容');
      return;
    }

    setIsGenerating(true);
    
    // 模拟API调用延迟
    setTimeout(() => {
      const content = config.contentTemplate
        .replace(/{title}/g, `${config.title.replace('模板', '')}：${topic}`)
        .replace(/{topic}/g, topic);
      
      setGeneratedContent(content);
      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    alert('内容已复制到剪贴板');
  };

  const colorClasses = {
    rose: 'bg-rose-100 border-rose-300 text-rose-800',
    green: 'bg-green-100 border-green-300 text-green-800', 
    blue: 'bg-blue-100 border-blue-300 text-blue-800'
  };

  const buttonColorClasses = {
    rose: 'bg-rose-600 hover:bg-rose-700',
    green: 'bg-green-600 hover:bg-green-700',
    blue: 'bg-blue-600 hover:bg-blue-700'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-800">
              公众号爆文生成器
            </Link>
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← 返回首页
            </Link>
          </div>
        </div>
      </nav>

      {/* 主内容 */}
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{config.icon}</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{config.title}</h1>
          <p className="text-gray-600 text-lg">{config.description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 左侧：输入区域 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ✏️ 输入话题
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    请输入您要创作的具体话题
                  </label>
                  <Input
                    placeholder={config.placeholder}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    热门话题推荐（点击快速填入）
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {config.sampleTopics.map((sampleTopic, index) => (
                      <button
                        key={index}
                        onClick={() => setTopic(sampleTopic)}
                        className={`px-3 py-1 rounded-full text-sm border ${
                          colorClasses[config.color as keyof typeof colorClasses]
                        } hover:opacity-80 transition-opacity`}
                      >
                        {sampleTopic}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={generateContent}
                  disabled={isGenerating || !topic.trim()}
                  className={`w-full ${
                    buttonColorClasses[config.color as keyof typeof buttonColorClasses]
                  } text-white font-semibold py-3 px-6 rounded-lg transition-all`}
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      正在生成内容...
                    </>
                  ) : (
                    <>🚀 生成爆文内容</>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* 使用说明 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  💡 使用说明
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>1. 在上方输入框中输入您想要创作的具体话题</p>
                  <p>2. 或者点击推荐话题快速填入</p>
                  <p>3. 点击"生成爆文内容"按钮</p>
                  <p>4. 等待AI生成完整的文章内容</p>
                  <p>5. 复制生成的内容并根据需要进行修改</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：生成内容区域 */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    📄 生成的文章内容
                  </span>
                  {generatedContent && (
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      size="sm"
                    >
                      📋 复制内容
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!generatedContent ? (
                  <div className="h-96 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <div className="text-4xl mb-4">📝</div>
                      <p>请输入话题并点击生成按钮</p>
                      <p className="text-sm mt-2">AI将为您创作精彩的爆文内容</p>
                    </div>
                  </div>
                ) : (
                  <Textarea
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    className="min-h-96 font-mono text-sm"
                    placeholder="生成的内容将在这里显示..."
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 其他模板推荐 */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">其他热门模板</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(templateConfigs)
              .filter(([key]) => key !== templateType)
              .map(([key, template]) => (
                <Card 
                  key={key} 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => router.push(`/templates/${key}`)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{template.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{template.title}</h3>
                    <p className="text-gray-600 text-sm">{template.description}</p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
} 