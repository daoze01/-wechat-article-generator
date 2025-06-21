import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '联系我们 - 公众号爆文生成器',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">联系我们</h1>
      <div className="bg-white p-8 rounded-lg shadow-md text-lg">
        <p className="mb-4">
          我们很高兴收到您的来信！如果您对我们的服务有任何疑问、建议或合作意向，请通过以下方式与我们联系。
        </p>
        <p>
          <strong>联系邮箱：</strong>
                      <a href="mailto:contact@gongzhonghaobaowen.com" className="text-blue-600 hover:underline">
              contact@gongzhonghaobaowen.com
          </a>
        </p>
        <p className="mt-6">
          我们会在收到邮件后的 1-2 个工作日内回复您。感谢您对公众号爆文生成器的支持！
        </p>
      </div>
    </div>
  );
} 