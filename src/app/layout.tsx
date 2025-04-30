import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { COLORS } from "@/config/ui";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "公众号爆文 - AI文章生成器",
  description: "专业的AI文章生成工具，支持多领域智能创作，快速生成高质量原创文章。适用于公众号、自媒体、博客等内容创作场景。",
  keywords: "公众号爆文,AI写作,文章生成器,公众号写作,自媒体助手,智能写作,内容创作,AI助手",
  authors: [{ name: "智能写作助手" }],
  openGraph: {
    title: "公众号爆文 - AI文章生成器",
    description: "专业的AI文章生成工具，支持多领域智能创作，快速生成高质量原创文章。",
    type: "website",
    locale: "zh_CN",
    siteName: "公众号爆文 - AI文章生成器",
  },
  twitter: {
    card: "summary_large_image",
    title: "公众号爆文 - AI文章生成器",
    description: "专业的AI文章生成工具，支持多领域智能创作，快速生成高质量原创文章。",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable}`}>
      <body className="min-h-screen bg-[#F5F5F7]">
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex items-center justify-between">
                <a href="/" className="text-xl font-bold text-[#007AFF]">
                  公众号爆文 - AI文章生成器
                </a>
                <div className="flex items-center space-x-4">
                  <a href="/about" className="text-gray-600 hover:text-[#007AFF]">
                    关于我们
                  </a>
                  <a href="/contact" className="text-gray-600 hover:text-[#007AFF]">
                    联系我们
                  </a>
                </div>
              </nav>
            </div>
          </header>
          
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
          
          <footer className="w-full border-t border-gray-200 bg-white">
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">关于我们</h3>
                  <p className="text-gray-600">
                    专业的AI文章生成工具，为您提供智能创作服务。
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">快速链接</h3>
                  <ul className="space-y-2">
                    <li><a href="/" className="text-gray-600 hover:text-[#007AFF]">首页</a></li>
                    <li><a href="/about" className="text-gray-600 hover:text-[#007AFF]">关于我们</a></li>
                    <li><a href="/contact" className="text-gray-600 hover:text-[#007AFF]">联系我们</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">联系方式</h3>
                  <p className="text-gray-600">
                    邮箱：support@example.com<br />
                    电话：400-123-4567
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
                © {new Date().getFullYear()} AI文章生成器 - 智能创作助手
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
