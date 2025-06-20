'use client';

import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from 'react';

// Helper component for Feature Cards
function FeatureCard({ icon, title, description, href }: { icon: string; title: string; description: string; href: string; }) {
  return (
    <Link href={href} className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-blue-600 transition-colors">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}

// Helper component for Template Cards
function TemplateCard({ icon, title, description, href }: { icon: string; title: string; description: string; href: string; }) {
  return (
    <Link href={href} className="block border border-gray-200 p-6 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all cursor-pointer">
      <div className="text-3xl mb-3">{icon}</div>
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-gray-500 mt-1">{description}</p>
    </Link>
  );
}

// Helper component for Sidebar buttons
function SidebarButton({ href, icon, text }: { href:string; icon:string; text:string; }) {
  return (
    <Link href={href} className="flex items-center w-full p-4 text-left text-gray-800 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-blue-50 transition-all duration-200 border border-gray-200">
      <span className="mr-4 text-2xl">{icon}</span>
      <span className="font-semibold">{text}</span>
    </Link>
  );
}

export default function HomePage() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Banner */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-6 gap-8 items-stretch">
          
          {/* Left Sidebar (1/6) */}
          <div className="lg:col-span-1 flex flex-col">
            <div className="flex-1 flex flex-col justify-between space-y-3">
                <SidebarButton href="/generate" icon="✍️" text="爆文生成" />
                <SidebarButton href="/title-generator" icon="🏷️" text="爆文标题生成" />
                <SidebarButton href="https://matrix.tencent.com/ai-detect/ai_gen_txt" icon="🤖" text="AI检测" />
                <SidebarButton href="/originality-check" icon="🛡️" text="原创检测" />
                <SidebarButton href="/image-generator" icon="🖼️" text="图片生成" />
                <SidebarButton href="/tutorials" icon="📚" text="使用教程" />
                <SidebarButton href="/guestbook" icon="💬" text="留言板" />
            </div>
          </div>

          {/* Right Content (5/6) */}
          <div className="lg:col-span-5 flex">
            <Carousel 
              className="w-full h-full"
              plugins={[plugin.current]}
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              opts={{ loop: true }}
            >
              <CarouselContent className="h-full">
                {/* Slide 1: Article Generation */}
                <CarouselItem className="h-full">
                  <div className="p-1 h-full">
                    <Card className="bg-blue-100 border-blue-300 h-full flex flex-col">
                      <CardContent className="flex flex-col flex-grow items-center justify-center p-6 text-center">
                        <h2 className="text-4xl font-extrabold mb-4">
                          🎯 一键生成<span className="text-blue-600">10W+</span>爆款文章
                        </h2>
                        <p className="text-lg text-gray-700 mb-6">覆盖情感、职场、教育等30+领域，基于最新AI大模型，极速生成高质量爆文。</p>
                        <Link href="/generate" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105 text-lg">
                          ✍️ 立即开始创作
                        </Link>
                        <p className="text-xl font-semibold text-blue-700 mt-8">AI 内容创作工具，助力公众号、自媒体打造高质量爆文</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                {/* Slide 2: Title Generation */}
                <CarouselItem className="h-full">
                  <div className="p-1 h-full">
                    <Card className="bg-green-100 border-green-300 h-full flex flex-col">
                      <CardContent className="flex flex-col flex-grow items-center justify-center p-6 text-center">
                        <h2 className="text-4xl font-extrabold mb-4">
                          🏷️ AI<span className="text-green-600">爆款标题</span>生成器
                        </h2>
                        <p className="text-lg text-gray-700 mb-6">输入核心关键词，AI 为您创作5个极具吸引力的爆款标题，引爆阅读量。</p>
                        <Link href="/title-generator" className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-transform transform hover:scale-105 text-lg">
                          🚀 生成黄金标题
                        </Link>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                {/* Slide 3: Image Generation */}
                <CarouselItem className="h-full">
                  <div className="p-1 h-full">
                    <Card className="bg-purple-100 border-purple-300 h-full flex flex-col">
                      <CardContent className="flex flex-col flex-grow items-center justify-center p-6 text-center">
                        <h2 className="text-4xl font-extrabold mb-4">
                          🖼️ AI<span className="text-purple-600">智能配图</span>
                        </h2>
                        <p className="text-lg text-gray-700 mb-6">输入文字描述，选择图片尺寸，即可生成高质量、无版权风险的公众号配图。</p>
                        <Link href="/image-generator" className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-transform transform hover:scale-105 text-lg">
                          🎨 设计我的图片
                        </Link>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* 使用说明区 */}
      <section className="bg-gradient-to-r from-indigo-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12 text-gray-800">📖 如何使用本工具？</h2>
            <div className="bg-white rounded-2xl shadow-xl p-12 mx-4">
              <div className="flex flex-col lg:flex-row items-center justify-center space-y-10 lg:space-y-0 lg:space-x-8">
                {/* 步骤1 */}
                <div className="flex flex-col items-center text-center w-60">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-base mb-4">1</div>
                  <h3 className="font-semibold text-gray-800 mb-2 whitespace-nowrap text-lg">输入关键词 / 主题</h3>
                  <p className="text-gray-600 text-base leading-relaxed">输入您想要创作的内容主题或关键词</p>
                </div>
                
                {/* 箭头1 */}
                <div className="hidden lg:block text-blue-400 text-3xl mx-2">→</div>
                
                {/* 步骤2 */}
                <div className="flex flex-col items-center text-center w-60">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-base mb-4">2</div>
                  <h3 className="font-semibold text-gray-800 mb-2 whitespace-nowrap text-lg">选择内容风格</h3>
                  <p className="text-gray-600 text-base leading-relaxed">情感 / 职场 / 教育 / 娱乐 等多种风格可选</p>
                </div>
                
                {/* 箭头2 */}
                <div className="hidden lg:block text-green-400 text-3xl mx-2">→</div>
                
                {/* 步骤3 */}
                <div className="flex flex-col items-center text-center w-60">
                  <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-base mb-4">3</div>
                  <h3 className="font-semibold text-gray-800 mb-2 whitespace-nowrap text-lg">点击生成爆文</h3>
                  <p className="text-gray-600 text-base leading-relaxed">AI 将快速生成高质量爆文内容</p>
                </div>
                
                {/* 箭头3 */}
                <div className="hidden lg:block text-purple-400 text-3xl mx-2">→</div>
                
                {/* 步骤4 */}
                <div className="flex flex-col items-center text-center w-60">
                  <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-base mb-4">4</div>
                  <h3 className="font-semibold text-gray-800 mb-2 whitespace-nowrap text-lg">质量检测优化</h3>
                  <p className="text-gray-600 text-base leading-relaxed">可进行原创检测与 AI 检测，提升内容质量</p>
                </div>
                
                {/* 箭头4 */}
                <div className="hidden lg:block text-orange-400 text-3xl mx-2">→</div>
                
                {/* 立即开始创作按钮 */}
                <div className="flex flex-col items-center text-center w-72">
                  <Link href="/generate" className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-5 px-12 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 whitespace-nowrap text-lg shadow-lg">
                    <span className="mr-3">🚀</span>
                    立即开始创作
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">核心功能 · 为爆文而生</h2>
            <p className="text-gray-600 mt-2">我们不仅仅是内容生成，更是您的智能创作伙伴</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon="🏷️" title="爆款标题工坊" description="输入关键词，AI从海量数据中提炼爆款标题公式，生成5个让用户忍不住点击的黄金标题。" href="/title-generator" />
            <FeatureCard icon="✍️" title="全文智能生成" description="选中一个标题，AI将自动围绕核心主题，构建文章框架、填充论据、优化文笔，一气呵成。" href="/generate" />
            <FeatureCard icon="📚" title="多领域专家模型" description="无论是科技、情感还是养生，我们为不同领域训练专属模型，确保内容深度与专业性。" href="/generate" />
            <FeatureCard icon="🛠️" title="实用工具矩阵" description="集成了AI内容检测、图片素材（即将上线）等辅助工具，覆盖从构思到发布的完整流程。" href="/" />
          </div>
        </div>
      </section>

      {/* Hot Templates */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-2">🔥 本周最受欢迎模板</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-8 text-left">
            <TemplateCard icon="💔" title="情感爆文模板" description="爱而不得：如何写出让人心碎的爆款情感文？" href="/templates/emotion" />
            <TemplateCard icon="🧓" title="养生爆文模板" description="60岁后如何科学养生，让身体年轻10岁？" href="/templates/health" />
            <TemplateCard icon="🌍" title="热点话题模板" description="某地高考满分作文引发热议，你怎么看？" href="/templates/trending" />
          </div>
          <div className="mt-12">
            <Link href="/templates" className="text-blue-600 font-semibold hover:underline">
              查看更多模板 →
            </Link>
          </div>
        </div>
      </section>
      
      {/* How to Use */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">🛠 使用方法 · 仅需3步</h2>
          <div className="max-w-4xl mx-auto mt-10 grid md:grid-cols-3 gap-8 text-lg">
            <div className="p-4">
              <span className="text-5xl font-extrabold text-blue-200">①</span>
              <p className="mt-4 font-semibold">选择一个你感兴趣的写作领域</p>
            </div>
            <div className="p-4">
              <span className="text-5xl font-extrabold text-blue-200">②</span>
              <p className="mt-4 font-semibold">输入标题 / 关键词 / 选题方向</p>
            </div>
            <div className="p-4">
              <span className="text-5xl font-extrabold text-blue-200">③</span>
              <p className="mt-4 font-semibold">点击生成，复制爆文，立即可用！</p>
            </div>
          </div>
          <div className="mt-12">
            <Link href="/generate" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105 text-lg">
              开始使用爆文生成器
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-10">👥 用户好评</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="text-gray-700 italic">"原来写公众号这么简单，一键生成的文章比我写的还流畅！"</p>
              <p className="text-right font-semibold mt-4">— 小王，自媒体作者</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="text-gray-700 italic">"用它发的文章，阅读量明显提升了，标题和开头都非常抓人！"</p>
              <p className="text-right font-semibold mt-4">— 阿静，公众号运营者</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
