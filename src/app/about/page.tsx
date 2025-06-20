import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于我们 - 专业AI内容创作服务商 | 公众号爆文网',
  description: '公众号爆文网是专业的AI内容创作平台，致力于为自媒体创作者提供高效的AI写作工具，包括爆文生成、标题优化、图片生成等服务。',
  keywords: '关于我们,AI内容创作,公众号爆文网,自媒体工具,AI写作平台,内容创作服务',
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
            欢迎来到 AI 内容改写工具。我们的目标是帮助您优化和重写您的内容，使其更具吸引力、更清晰、更符合您的风格要求。
          </p>
        </div>

        <div className="mt-20">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">我们的使命</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              让人人都能轻松创作高质量内容
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              我们相信，写作不应该是一件困难的事情。通过先进的 AI 技术，我们致力于为您提供强大而易于使用的工具，激发您的创作灵感，提升内容质量。
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <p className="text-lg leading-6 font-medium text-gray-900">智能改写</p>
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  我们的 AI 模型能够理解上下文，并根据您的要求（如"小红书风格"、"知乎风格"等）生成高质量的改写版本。
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <p className="text-lg leading-6 font-medium text-gray-900">内容分析</p>
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  我们不仅改写内容，还会分析原文，提取关键信息，确保改写后的内容保留核心思想。
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <p className="text-lg leading-6 font-medium text-gray-900">简单易用</p>
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  只需粘贴您的文章链接或文本，选择您想要的风格，即可一键生成。无需复杂的操作。
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <p className="text-lg leading-6 font-medium text-gray-900">持续进化</p>
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  我们的团队在不断地优化算法和模型，致力于为您提供越来越好的服务。
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 