import React from "react";

const FIELDS = [
  "养老金",
  "美食",
  "民生",
  "人工智能",
  "情感",
  "教育",
  "财经",
  "健康",
  "职场",
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="w-full bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">📰</span>
          <span className="text-xl font-semibold tracking-wide">公众号爆文生成器</span>
        </div>
        {/* 预留菜单 */}
        {/* <nav className="hidden md:flex gap-6 text-gray-500 text-sm">
          <a href="#" className="hover:text-blue-600">关于</a>
          <a href="#" className="hover:text-blue-600">联系我们</a>
        </nav> */}
      </header>

      {/* 主功能区 */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl bg-white rounded-xl shadow p-8 flex flex-col gap-6">
          {/* 领域选择 */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">请选择文章领域</label>
            <select className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">请选择</option>
              {FIELDS.map((field) => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
          </div>
          {/* 标题输入 */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">请输入对标文章标题</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="如：为什么越来越多人开始裸辞？"
            />
          </div>
          {/* 生成按钮 */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition">生成爆文</button>
        </div>

        {/* 结果展示区（预留） */}
        <div className="w-full max-w-xl mt-8 hidden">
          {/* 这里将来展示生成的新标题和文章 */}
        </div>
      </main>

      {/* 页脚 */}
      <footer className="w-full text-center text-xs text-gray-400 py-4 border-t bg-white mt-auto">
        <div>© {new Date().getFullYear()} 公众号爆文自动生成器 | 仅供学习与交流，内容生成不代表平台立场</div>
      </footer>
    </div>
  );
}
