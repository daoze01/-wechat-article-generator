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
function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string; }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
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
            <div className="flex-1 flex flex-col justify-between">
                <SidebarButton href="/title-generator" icon="🏷️" text="爆文题目生成" />
                <SidebarButton href="/generate" icon="✍️" text="爆文生成" />
                <SidebarButton href="/image-generator" icon="🖼️" text="图片生成" />
                <SidebarButton href="/originality-check" icon="🛡️" text="原创检测" />
                <SidebarButton href="https://matrix.tencent.com/ai-detect/ai_gen_txt" icon="🤖" text="AI检测" />
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

      {/* Feature Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">核心功能 · 为爆文而生</h2>
            <p className="text-gray-600 mt-2">我们不仅仅是内容生成，更是您的智能创作伙伴</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon="🏷️" title="爆款标题工坊" description="输入关键词，AI从海量数据中提炼爆款标题公式，生成5个让用户忍不住点击的黄金标题。" />
            <FeatureCard icon="✍️" title="全文智能生成" description="选中一个标题，AI将自动围绕核心主题，构建文章框架、填充论据、优化文笔，一气呵成。" />
            <FeatureCard icon="📚" title="多领域专家模型" description="无论是科技、情感还是养生，我们为不同领域训练专属模型，确保内容深度与专业性。" />
            <FeatureCard icon="🛠️" title="实用工具矩阵" description="集成了AI内容检测、图片素材（即将上线）等辅助工具，覆盖从构思到发布的完整流程。" />
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
