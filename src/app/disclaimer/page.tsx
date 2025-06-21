import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '免责声明 - 公众号爆文网',
  description: '公众号爆文网免责声明，包含AI工具使用条款、版权说明、GDPR相关条款等重要法律信息。',
  keywords: '免责声明,AI工具,版权说明,GDPR,隐私保护,公众号爆文网',
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">免责声明</h1>
      <div className="bg-white p-8 rounded-lg shadow-md prose prose-lg max-w-none">
        <p>
          欢迎使用公众号爆文网（https://www.gongzhonghaobaowen.com/，以下简称"本站"）。在使用本站提供的AI工具与服务前，请您务必仔细阅读并理解本声明：
        </p>
        
        <h2>1. 服务内容</h2>
        <p>
          本站基于人工智能（AI）大模型技术，提供AI爆文生成器、AI改写器、AI检测工具、原创检测工具、AI图片生成等功能，旨在为内容创作者、自媒体人提供辅助创作工具与灵感参考。
        </p>

        <h2>2. 内容准确性与版权</h2>
        <p>
          由于AI技术本身存在局限性，本站生成内容可能存在信息不准确、不完整或过时的情况，本站不对生成内容的准确性、合法性、版权归属作任何保证。
        </p>
        <p>
          用户在使用本站生成内容时，须自行判断其合法性、准确性，必要时进行人工校验与修改，确保最终发布内容符合相关法律法规及平台规范。
        </p>
        <p>
          因使用本站生成内容而导致的任何法律责任（包括但不限于版权争议、侵权纠纷），由用户自行承担，本站不承担任何责任。
        </p>

        <h2>3. 使用限制</h2>
        <p>
          用户不得利用本站工具生成、传播任何违反法律法规、侵犯他人合法权益或包含违法、恶意、歧视性、虚假有害信息的内容。
        </p>
        <p>
          对于因用户违规使用而造成的任何后果，本站不承担任何责任。
        </p>

        <h2>4. Cookie 和广告相关说明</h2>
        <p>
          本站使用 Cookie 技术优化用户体验，并可能通过 Google AdSense 等第三方广告服务商展示相关广告。这些服务可能会收集用户的非个人身份信息以实现个性化广告展示。
        </p>
        <p>
          对于来自欧洲经济区（EEA）、英国、瑞士地区的用户，本站已启用符合《通用数据保护条例》（GDPR）要求的同意管理平台（CMP），用户可自主选择是否授权使用相关Cookie和数据处理。
        </p>

        <h2>5. 第三方服务说明</h2>
        <p>
          本站部分功能依托于第三方AI服务提供商，用户输入的数据在处理过程中可能会传递至相关服务提供商。这些第三方服务均有其独立的隐私政策和服务条款，用户可自行查阅了解。
        </p>

        <h2>6. 最终解释权</h2>
        <p>
          在法律允许范围内，本站保留对本免责声明的最终解释权，并有权根据需要随时更新本声明，恕不另行通知。
        </p>

        <div className="mt-8 text-sm text-gray-600">
          <p>如有疑问，请联系：contact@gongzhonghaobaowen.com</p>
        </div>
      </div>
    </div>
  );
} 