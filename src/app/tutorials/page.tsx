import { Metadata } from 'next';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'AI爆文生成器使用教程 - 公众号爆文生成器',
  description: '详细的AI爆文生成器使用教程，教您如何打造10W+爆款文章，掌握AI写作技巧，提升内容创作效率',
  keywords: 'AI爆文生成器教程,公众号写作教程,AI写作技巧,爆文创作指南,内容创作教程',
};

interface Tutorial {
  id: string;
  title: string;
  description: string;
  readTime: string;
  category: string;
  href: string;
}

const tutorials: Tutorial[] = [
  {
    id: '1',
    title: '如何用AI爆文生成器打造10W+爆款文章？',
    description: '从关键词输入到发布，完整的AI爆文创作流程指南，让您快速掌握爆款文章生成技巧。',
    readTime: '5分钟',
    category: '基础教程',
    href: '/tutorials/how-to-create-viral-articles'
  },
  {
    id: '2', 
    title: 'AI爆文生成器的5个使用技巧',
    description: '掌握关键词优化、风格选择、内容检测等实用技巧，让AI生成的内容更具吸引力。',
    readTime: '3分钟',
    category: '进阶技巧',
    href: '/tutorials/5-tips-for-ai-writing'
  },
  {
    id: '3',
    title: 'AI爆文生成器常见问题解答',
    description: '解答用户在使用AI爆文生成器过程中遇到的常见问题，包括原创性、平台审核等。',
    readTime: '4分钟', 
    category: '问题解答',
    href: '/tutorials/faq'
  }
];

function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  return (
    <Link href={tutorial.href} className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 hover:border-blue-300">
      <div className="flex items-start justify-between mb-3">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {tutorial.category}
        </span>
        <span className="text-gray-500 text-sm">{tutorial.readTime}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600">
        {tutorial.title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {tutorial.description}
      </p>
      <div className="mt-4 flex items-center text-blue-600 font-medium">
        <span>阅读教程</span>
        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

export default function TutorialsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* 顶部广告位 */}
        <div className="mb-8">
          <AdBanner 
            slot="1234567892" 
            className="text-center"
            style={{ display: 'block', minHeight: '90px' }}
          />
        </div>
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🚀 AI爆文生成器 使用教程</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            AI爆文生成器基于最新AI大模型技术，能够快速生成符合公众号平台风格的高质量文章，
            帮助创作者提升创作效率，打造更多10W+爆款内容。掌握正确的使用方法，让AI成为您的创作利器。
          </p>
        </div>

        {/* Quick Start Guide */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📋 快速上手指南</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">1</div>
              <h3 className="font-semibold text-gray-800 mb-2">选择生成类型</h3>
              <p className="text-gray-600 text-sm">选择爆文生成或标题生成</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">2</div>
              <h3 className="font-semibold text-gray-800 mb-2">输入关键词</h3>
              <p className="text-gray-600 text-sm">输入具体的主题或关键词</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">3</div>
              <h3 className="font-semibold text-gray-800 mb-2">一键生成</h3>
              <p className="text-gray-600 text-sm">AI快速生成高质量内容</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/generate" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              🚀 立即开始使用
            </Link>
          </div>
        </div>

        {/* Tutorial Articles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">📚 详细教程文章</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutorials.map((tutorial) => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </div>
        </div>

        {/* 中部广告位 */}
        <div className="mb-12">
          <AdBanner 
            slot="1234567893" 
            className="text-center"
            style={{ display: 'block', minHeight: '250px' }}
            format="rectangle"
          />
        </div>

        {/* Usage Tips */}
        <div className="bg-white rounded-xl p-8 shadow-md mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">💡 使用技巧推荐</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">📝 关键词优化</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 使用具体而非泛化的关键词</li>
                <li>• 结合热点话题和时事</li>
                <li>• 关注目标用户的痛点需求</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🎨 内容优化</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 选择情感类风格增加共鸣</li>
                <li>• 进行原创检测和AI检测</li>
                <li>• 人工润色增加个人风格</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">⚠️ 免责声明提醒</h3>
          <p className="text-gray-700 leading-relaxed">
            本教程所述内容为AI爆文生成器使用参考建议，生成结果仅供用户参考与学习，最终发布内容需用户自行判断并承担相应法律责任。
            请合理使用AI工具，避免侵权、违法用途。建议在发布前进行人工审核和优化，确保内容符合平台规范。
          </p>
        </div>
      </div>
    </div>
  );
} 