import { Metadata } from 'next';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
  title: '更新日志 - 公众号爆文生成器',
  description: '查看公众号爆文生成器的最新功能更新、bug修复和优化改进记录',
};

interface UpdateRecord {
  date: string;
  version?: string;
  updates: string[];
}

const updateHistory: UpdateRecord[] = [
  {
    date: '2025年6月',
    version: 'v2.1.0',
    updates: [
      '优化爆文生成算法，提升情感类文案质量',
      '新增 AI检测链接，支持腾讯Matrix AI检测',
      '改进用户界面，增强使用体验',
      '修复部分浏览器兼容性问题'
    ]
  },
  {
    date: '2025年5月',
    version: 'v2.0.0',
    updates: [
      '增加原创检测功能，确保内容原创性',
      '修复图片生成Bug，提升生成成功率',
      '新增多种内容风格模板',
      '优化标题生成算法，提高点击率'
    ]
  },
  {
    date: '2025年4月',
    version: 'v1.9.0',
    updates: [
      '上线图片生成功能，支持AI配图',
      '增加留言板功能，收集用户反馈',
      '优化移动端适配',
      '提升系统稳定性和响应速度'
    ]
  },
  {
    date: '2025年3月',
    version: 'v1.8.0',
    updates: [
      '新增爆文标题生成器',
      '支持多领域内容生成（情感、职场、教育等）',
      '优化AI模型，提升内容质量',
      '增加内容预览功能'
    ]
  }
];

function UpdateCard({ record }: { record: UpdateRecord }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">{record.date}</h3>
        {record.version && (
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
            {record.version}
          </span>
        )}
      </div>
      <ul className="space-y-2">
        {record.updates.map((update, index) => (
          <li key={index} className="flex items-start space-x-3">
            <span className="text-green-500 mt-1">✓</span>
            <span className="text-gray-700">{update}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ChangelogPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* 顶部广告位 */}
        <div className="mb-8">
          <AdBanner 
            slot="1234567894" 
            className="text-center"
            style={{ display: 'block', minHeight: '90px' }}
          />
        </div>
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">📋 更新日志</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            跟踪我们的最新功能更新、性能优化和Bug修复，了解公众号爆文生成器的持续改进。
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">功能更新</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">99%</div>
            <div className="text-gray-600">系统稳定性</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-gray-600">服务可用性</div>
          </div>
        </div>

        {/* 中部广告位 */}
        <div className="mb-12">
          <AdBanner 
            slot="1234567895" 
            className="text-center"
            style={{ display: 'block', minHeight: '250px' }}
            format="rectangle"
          />
        </div>

        {/* Update History */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🚀 版本更新历史</h2>
          {updateHistory.map((record, index) => (
            <UpdateCard key={index} record={record} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="bg-blue-50 rounded-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">💡 有建议或问题？</h3>
            <p className="text-gray-600 mb-6">
              我们持续改进产品功能，欢迎通过留言板分享您的使用体验和改进建议。
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="/guestbook" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                💬 反馈建议
              </a>
              <a 
                href="/generate" 
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                🚀 开始使用
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 