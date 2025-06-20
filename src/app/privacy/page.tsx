import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '隐私政策 - 公众号爆文网',
  description: '公众号爆文网隐私政策，详细说明Cookie使用、数据处理、GDPR合规等隐私保护措施。',
  keywords: '隐私政策,Cookie,GDPR,数据保护,AI工具,公众号爆文网',
};

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-indigo mx-auto lg:prose-lg max-w-none">
          <h1>隐私政策</h1>
          <p><strong>更新日期：2025年6月21日</strong></p>

          <h2>1. 引言</h2>
          <p>
            公众号爆文网（以下简称"本站"）尊重并保护所有用户的个人隐私权，承诺依法合规处理用户的相关信息。
          </p>

          <h2>2. 收集信息的范围</h2>
          <p>
            在用户使用本站AI工具（包括AI爆文生成器、AI改写器、AI检测、原创检测、AI图片生成）过程中，我们可能会收集以下信息：
          </p>
          <ul>
            <li>用户输入的关键词、文本内容、文章链接等，仅用于即时生成和优化工具服务</li>
            <li>浏览行为数据（如访问时间、IP地址、设备信息、浏览器类型）</li>
            <li>Cookie 信息（见第5条）</li>
          </ul>

          <h2>3. 信息使用目的</h2>
          <ul>
            <li>提供、维护和改进本站AI工具服务</li>
            <li>优化用户体验，提升工具生成质量</li>
            <li>防止恶意攻击、欺诈使用</li>
            <li>依法合规履行相关法律法规要求</li>
          </ul>

          <h2>4. 信息存储与安全</h2>
          <p>
            本站采取合理的技术与管理措施保护用户信息安全，防止未经授权的访问、披露、使用、修改或丢失。
          </p>
          <p>
            本站不会主动将用户输入的内容用于AI模型训练或用于其他商业用途，除非获得用户明确同意。
          </p>

          <h2>5. Cookie 使用</h2>
          <p>
            本站使用 Cookie 优化网站体验，并可能通过 Google AdSense 或其他第三方广告服务商展示广告。
          </p>
          <p>
            Google 及其合作伙伴可能通过 Cookie 收集用户的非个人身份信息，以实现个性化广告展示。
          </p>
          <p>
            用户可通过浏览器设置管理或拒绝 Cookie 使用。
          </p>

          <h2>6. 关于用户同意管理（CMP）</h2>
          <p>
            为符合欧盟《通用数据保护条例》（GDPR）及相关法规要求，本站已启用 Google 提供的同意管理平台（CMP）。
          </p>
          <p>
            来自欧洲经济区（EEA）、英国、瑞士地区的用户访问时，将自动弹出同意管理窗口，供用户选择是否授权使用 Cookie 和处理相关数据。
          </p>
          <p>
            非欧洲用户正常浏览不受影响。
          </p>

          <h2>7. 第三方服务说明</h2>
          <p>
            本站工具部分功能依托于第三方AI大模型服务提供商（如 DeepSeek AI 等），用户输入的数据在处理过程中可能会传递至相关服务提供商。
          </p>
          <p>
            第三方服务提供商均需遵循其隐私政策及数据处理标准，用户可自行查阅相关政策内容。
          </p>

          <h2>8. 政策变更</h2>
          <p>
            本站有权根据服务发展需要，不定期调整本隐私政策，调整内容将通过本页面公告，请用户定期查阅。
          </p>

          <h2>9. 联系方式</h2>
          <p>
            如您对本隐私政策有任何疑问，欢迎通过邮箱（support@gongzhonghaobaowen.com）与我们联系。
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage; 