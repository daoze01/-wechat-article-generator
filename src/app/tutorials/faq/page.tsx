import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI爆文生成器常见问题解答 - 公众号爆文生成器教程',
  description: '解答AI爆文生成器使用过程中的常见问题，包括原创性、平台审核、内容优化等用户关心的问题',
  keywords: 'AI爆文生成器FAQ,常见问题,原创检测,平台审核,AI写作问题',
};

interface FAQItem {
  question: string;
  answer: string;
  tips?: string[];
}

const faqData: FAQItem[] = [
  {
    question: "AI生成文章是否100%原创？",
    answer: "AI生成内容是基于大量数据训练后的全新组合生成，具有一定的原创性。但为了确保更高的原创度，建议结合我们提供的原创检测工具进行优化，防止重复率偏高的情况出现。",
    tips: [
      "使用原创检测工具检查重复率",
      "对检测结果较高的段落进行人工改写",
      "添加个人观点和案例增加独特性"
    ]
  },
  {
    question: "AI生成内容是否能通过公众号平台审核？",
    answer: "目前多数平台对AI内容暂无明确限制政策，AI生成的内容在合规的前提下可以正常发布。建议生成后进行人工优化排版、增加配图，并确保内容符合平台社区规范，效果会更佳。",
    tips: [
      "检查内容是否符合平台社区规范",
      "添加合适的配图和排版优化",
      "避免敏感词汇和违规表达",
      "定期关注平台政策更新"
    ]
  },
  {
    question: "如何提升AI生成文章的'人味'？",
    answer: "增加第一人称叙述、个人经验分享、真实故事性段落，能显著提升AI内容的亲和度与用户粘性。让读者感受到真实的人格魅力是关键。",
    tips: [
      "使用第一人称表达，如'我认为'、'我的经验'",
      "分享真实的个人故事和感悟",
      "表达独特的观点和价值观",
      "增加情感化的语言表达"
    ]
  },
  {
    question: "是否支持不同类型的文案？",
    answer: "目前支持小绿书、知乎风格等多平台内容风格，以及情感、职场、教育、娱乐、科技等40+内容领域，功能持续更新中。您可以根据目标受众和内容定位选择最合适的风格类型。",
    tips: [
      "小绿书风格：种草内容、产品推荐、生活分享",
      "知乎风格：深度分析、逻辑清晰、专业干货",
      "情感类：适合引起共鸣的内容",
      "职场类：适合专业人群的干货分享", 
      "教育类：适合知识科普和经验分享"
    ]
  }
];

export default function FAQTutorial() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600">首页</Link>
          <span>/</span>
          <Link href="/tutorials" className="hover:text-blue-600">教程</Link>
          <span>/</span>
          <span className="text-gray-800">常见问题解答</span>
        </nav>

        {/* Article Header */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="text-center mb-8">
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">问题解答</span>
            <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-4">
              AI爆文生成器常见问题解答
            </h1>
            <div className="flex items-center justify-center space-x-6 text-gray-600">
              <span>📅 更新时间：2025年1月</span>
              <span>⏱️ 阅读时间：4分钟</span>
              <span>👀 适合人群：所有用户</span>
            </div>
          </div>

          <div className="prose max-w-none">
            {/* Introduction */}
            <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                在使用AI爆文生成器的过程中，您可能会遇到一些疑问。我们整理了用户最关心的问题，
                并提供详细的解答和实用建议，帮助您更好地使用我们的工具。
              </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-8 mb-8">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-start mb-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0">
                      Q{index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        {faq.question}
                      </h3>
                      <div className="bg-blue-50 p-4 rounded-lg mb-4">
                        <p className="text-gray-700 leading-relaxed">
                          <strong>答：</strong>{faq.answer}
                        </p>
                      </div>
                      {faq.tips && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-3">💡 实用建议：</h4>
                          <ul className="space-y-2">
                            {faq.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="text-gray-700 flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🎯 使用建议总结</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">✅ 推荐做法</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 使用具体关键词，避免太过泛化</li>
                    <li>• 生成后进行原创检测和AI检测</li>
                    <li>• 人工添加个人观点和经验</li>
                    <li>• 选择合适的内容风格和调性</li>
                    <li>• 发布前检查平台规范要求</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">❌ 避免问题</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 直接发布未经优化的AI内容</li>
                    <li>• 忽略原创性和重复率检查</li>
                    <li>• 使用过于宽泛的关键词</li>
                    <li>• 不考虑目标受众和平台特点</li>
                    <li>• 忽视内容的情感化表达</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                🤝 需要更多帮助？
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                如果您遇到其他问题或需要技术支持，可以通过以下方式联系我们：
              </p>
              <div className="space-y-2 text-gray-700">
                <p>• 📧 邮箱：contact@gongzhonghaobaowen.com</p>
                <p>• 💬 在线留言：访问我们的<Link href="/guestbook" className="text-blue-600 hover:underline">留言板</Link></p>
                <p>• 📱 关注我们的公众号获取最新使用技巧</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center space-x-4 mb-8">
              <Link 
                href="/generate" 
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium inline-block"
              >
                🚀 开始使用工具
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
                <Link href="/tutorials/how-to-create-viral-articles" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h4 className="font-medium text-gray-800 mb-2">如何用AI爆文生成器打造10W+爆款文章？</h4>
                  <p className="text-sm text-gray-600">完整的AI爆文创作流程指南</p>
                </Link>
                <Link href="/tutorials/5-tips-for-ai-writing" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h4 className="font-medium text-gray-800 mb-2">AI爆文生成器的5个使用技巧</h4>
                  <p className="text-sm text-gray-600">掌握更多实用技巧，提升AI写作效果</p>
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