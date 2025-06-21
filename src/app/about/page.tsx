import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于我们 - 专业AI内容创作服务商 | 公众号爆文网',
  description: '公众号爆文网是专业的AI内容创作平台，致力于为自媒体创作者提供高效的AI爆文生成器、AI改写器、AI检测工具、原创检测工具、AI图片生成工具等服务。',
  keywords: '关于我们,AI爆文生成器,公众号爆文网,自媒体工具,AI写作平台,内容创作服务,AI检测工具,原创检测,AI图片生成',
};

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            关于我们
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            公众号爆文网（https://www.gongzhonghaobaowen.com/）是一个专注于AI内容创作的工具平台，致力于为自媒体创作者、公众号运营者、内容创作者提供高效的AI爆文生成器、AI内容改写器、AI检测工具、原创检测工具、AI图片生成工具等服务，帮助用户提升创作效率、优化内容质量，打造高阅读量、高传播度的精品内容。
          </p>
        </div>

        <div className="mt-20">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">我们的使命</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              通过AI技术赋能内容创作，助力创作者轻松打造10W+爆款内容
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              我们的目标是通过领先的AI技术，赋能内容创作，助力创作者轻松打造10W+爆款内容。
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <p className="text-lg leading-6 font-medium text-gray-900">AI爆文生成器</p>
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  基于先进的AI大模型技术，根据关键词或主题快速生成高质量爆文内容，为自媒体创作者提供创作灵感和效率提升。
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <p className="text-lg leading-6 font-medium text-gray-900">AI内容改写器</p>
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  智能分析文章内容，支持多种写作风格（如小红书风格、知乎风格等），一键生成高质量改写版本。
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <p className="text-lg leading-6 font-medium text-gray-900">AI检测与原创检测</p>
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  提供AI内容检测和原创性检测服务，帮助创作者确保内容质量和原创性，规避风险。
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <p className="text-lg leading-6 font-medium text-gray-900">AI图片生成工具</p>
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  基于文字描述智能生成配图，为内容创作提供丰富的视觉元素支持，提升内容吸引力。
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-16 text-center">
            <p className="text-base text-gray-500">
              如有任何建议或合作意向，欢迎联系邮箱（contact@gongzhonghaobaowen.com）。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 