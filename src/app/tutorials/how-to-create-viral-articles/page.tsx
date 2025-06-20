import { Metadata } from 'next';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
  title: '如何用AI爆文生成器打造10W+爆款文章？ - 公众号爆文生成器教程',
  description: '完整的AI爆文创作流程指南，从关键词输入到发布，让您快速掌握打造10W+爆款文章的技巧和方法',
  keywords: '10W+爆款文章,AI爆文生成,公众号写作,爆文技巧,AI写作教程',
};

export default function ViralArticleTutorial() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* 顶部广告位 */}
        <div className="mb-8">
          <AdBanner 
            slot="1234567897" 
            className="text-center"
            style={{ display: 'block', minHeight: '90px' }}
          />
        </div>
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600">首页</Link>
          <span>/</span>
          <Link href="/tutorials" className="hover:text-blue-600">教程</Link>
          <span>/</span>
          <span className="text-gray-800">如何打造10W+爆款文章</span>
        </nav>

        {/* Article Header */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="text-center mb-8">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">基础教程</span>
            <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-4">
              如何用AI爆文生成器打造10W+爆款文章？
            </h1>
            <div className="flex items-center justify-center space-x-6 text-gray-600">
              <span>📅 更新时间：2025年1月</span>
              <span>⏱️ 阅读时间：5分钟</span>
              <span>👀 适合人群：公众号运营者</span>
            </div>
          </div>

          {/* Introduction */}
          <div className="prose max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">🚀 工具简介</h2>
              <p className="text-gray-700 leading-relaxed">
                AI爆文生成器，基于最新AI大模型技术，能够快速生成符合公众号平台风格的高质量文章，
                帮助创作者提升创作效率，打造更多10W+爆款内容。通过智能算法分析热门话题和用户喜好，
                为您量身定制吸引眼球的爆款文案。
              </p>
            </div>

            {/* Steps */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 使用步骤说明</h2>
            
            <div className="space-y-6 mb-8">
              <div className="bg-white border-l-4 border-green-400 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-3">1</div>
                  <h3 className="text-lg font-semibold text-gray-800">打开首页，进入【AI爆文生成】</h3>
                </div>
                <p className="text-gray-600 ml-11">
                  访问网站首页，点击左侧导航栏的"爆文生成"按钮，或直接点击首页的"立即开始创作"按钮进入生成页面。
                </p>
              </div>

              <div className="bg-white border-l-4 border-blue-400 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">2</div>
                  <h3 className="text-lg font-semibold text-gray-800">输入关键词或主题，例如"职场沟通"</h3>
                </div>
                <p className="text-gray-600 ml-11">
                  在输入框中填写您想要创作的主题或关键词。建议使用具体、有针对性的关键词，如"职场沟通技巧"、"亲子教育方法"等，
                  这样生成的内容会更加精准和实用。
                </p>
              </div>

              <div className="bg-white border-l-4 border-purple-400 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-3">3</div>
                  <h3 className="text-lg font-semibold text-gray-800">选择风格（情感 / 职场 / 教育 / 娱乐等）</h3>
                </div>
                <p className="text-gray-600 ml-11">
                  根据您的目标受众和内容定位，选择合适的文章风格。情感类文章容易引起共鸣，职场类适合专业人群，
                  教育类受众广泛，娱乐类传播性强。
                </p>
              </div>

              <div className="bg-white border-l-4 border-orange-400 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-3">4</div>
                  <h3 className="text-lg font-semibold text-gray-800">点击【立即生成】，等待AI完成文章生成</h3>
                </div>
                <p className="text-gray-600 ml-11">
                  确认信息无误后，点击生成按钮。AI将根据您的输入智能创作文章，通常在30秒内完成。
                  生成过程中请耐心等待，不要刷新页面。
                </p>
              </div>

              <div className="bg-white border-l-4 border-red-400 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-3">5</div>
                  <h3 className="text-lg font-semibold text-gray-800">进行原创检测、AI检测，优化文章质量</h3>
                </div>
                <p className="text-gray-600 ml-11">
                  使用我们提供的原创检测和AI检测工具，确保文章的原创性和自然度。根据检测结果对内容进行适当调整。
                </p>
              </div>

              <div className="bg-white border-l-4 border-indigo-400 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mr-3">6</div>
                  <h3 className="text-lg font-semibold text-gray-800">手动润色，发布到公众号</h3>
                </div>
                <p className="text-gray-600 ml-11">
                  根据您的个人风格和品牌调性，对文章进行最后的润色和优化。添加个人观点、案例或经验，
                  然后发布到您的公众号平台。
                </p>
              </div>
            </div>

            {/* 中部广告位 */}
            <div className="mb-8">
              <AdBanner 
                slot="1234567898" 
                className="text-center"
                style={{ display: 'block', minHeight: '250px' }}
                format="rectangle"
              />
            </div>

            {/* Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                💡 温馨提示
              </h3>
              <p className="text-gray-700 leading-relaxed">
                AI生成内容建议人工二次优化，提升原创性与人设风格，效果更佳。建议在生成的基础上加入个人经验、
                具体案例和独特观点，这样能让文章更具个人特色和可信度，更容易获得读者认可。
              </p>
            </div>

            {/* Action Buttons */}
            <div className="text-center space-x-4 mb-8">
              <Link 
                href="/generate" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-block"
              >
                🚀 立即体验生成
              </Link>
              <Link 
                href="/tutorials" 
                className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium inline-block"
              >
                📚 查看更多教程
              </Link>
            </div>

            {/* Related Tutorials */}
            <div className="border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">🔗 相关教程推荐</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/tutorials/5-tips-for-ai-writing" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h4 className="font-medium text-gray-800 mb-2">AI爆文生成器的5个使用技巧</h4>
                  <p className="text-sm text-gray-600">掌握更多实用技巧，提升AI写作效果</p>
                </Link>
                <Link href="/tutorials/faq" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h4 className="font-medium text-gray-800 mb-2">AI爆文生成器常见问题解答</h4>
                  <p className="text-sm text-gray-600">解决使用过程中的常见疑问</p>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">⚠️ 免责声明</h3>
          <p className="text-gray-700 leading-relaxed">
            本教程所述内容为AI爆文生成器使用参考建议，生成结果仅供用户参考与学习，最终发布内容需用户自行判断并承担相应法律责任。
            请合理使用AI工具，避免侵权、违法用途。
          </p>
        </div>
      </div>
    </div>
  );
} 