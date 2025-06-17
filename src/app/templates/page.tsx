'use client';

import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";

const templates = [
  {
    id: 'emotion',
    icon: "💔",
    title: "情感爆文模板",
    description: "爱而不得：如何写出让人心碎的爆款情感文？",
    color: "rose",
    features: ["情感共鸣", "心理分析", "治愈建议", "成长感悟"]
  },
  {
    id: 'health',
    icon: "🧓",
    title: "养生爆文模板", 
    description: "60岁后如何科学养生，让身体年轻10岁？",
    color: "green",
    features: ["科学依据", "实用建议", "案例分享", "专家观点"]
  },
  {
    id: 'trending',
    icon: "🌍",
    title: "热点话题模板",
    description: "某地高考满分作文引发热议，你怎么看？",
    color: "blue",
    features: ["多角度分析", "深度思考", "国际视野", "理性讨论"]
  }
];

const colorClasses = {
  rose: 'bg-rose-50 border-rose-200 hover:bg-rose-100',
  green: 'bg-green-50 border-green-200 hover:bg-green-100',
  blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
};

export default function TemplatesPage() {
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
      <div className="container mx-auto px-4 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🔥 爆文模板中心</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            选择适合的模板类型，AI 将为您生成专业的爆款文章内容。每个模板都经过精心设计，确保内容质量和用户参与度。
          </p>
        </div>

        {/* 模板网格 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {templates.map((template) => (
            <Link 
              key={template.id}
              href={`/templates/${template.id}`}
              className="block"
            >
              <Card className={`h-full transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 ${
                colorClasses[template.color as keyof typeof colorClasses]
              }`}>
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className="text-6xl mb-4">{template.icon}</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">{template.title}</h2>
                  <p className="text-gray-600 mb-6 flex-grow">{template.description}</p>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">模板特色</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {template.features.map((feature, index) => (
                        <span 
                          key={index}
                          className="text-xs px-2 py-1 bg-white rounded-full text-gray-600 border"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="pt-4">
                      <div className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors">
                        开始使用 →
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* 使用说明 */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-center mb-8">💡 如何使用模板？</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">选择模板</h3>
                <p className="text-sm text-gray-600">根据您的内容需求选择合适的模板类型</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">输入话题</h3>
                <p className="text-sm text-gray-600">输入您想要创作的具体话题或关键词</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">AI生成</h3>
                <p className="text-sm text-gray-600">AI将基于模板结构生成完整的文章内容</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">编辑发布</h3>
                <p className="text-sm text-gray-600">根据需要编辑内容，然后复制发布</p>
              </div>
            </div>
          </div>
        </div>

        {/* 底部CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">还没找到合适的模板？</h2>
          <p className="text-gray-600 mb-6">我们还有更多实用的创作工具等你发现</p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link 
              href="/generate" 
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              自由创作文章
            </Link>
            <Link 
              href="/title-generator" 
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
            >
              生成爆款标题
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 