import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable}`}>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PRTZ0KZK09"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PRTZ0KZK09');
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-800">
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <nav className="flex h-16 items-center justify-between">
                <Link href="/" className="text-xl font-bold">
                  公众号爆文生成器
                </Link>
                <div className="hidden items-center space-x-4 md:flex">
                  <Link href="/" className="text-gray-600 hover:text-blue-600">首页</Link>
                  <Link href="/title-generator" className="text-gray-600 hover:text-blue-600">爆文题目生成</Link>
                  <Link href="/generate" className="text-gray-600 hover:text-blue-600">爆文生成</Link>
                  <Link href="/" className="text-gray-600 hover:text-blue-600">图片生成</Link>
                  <Link href="/originality-check" className="text-gray-600 hover:text-blue-600">原创检测</Link>
                  <Link href="https://matrix.tencent.com/ai-detect/ai_gen_txt" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">AI检测</Link>
                  <Link href="/guestbook" className="text-gray-600 hover:text-blue-600">留言板</Link>
                  <Link href="/about" className="text-gray-600 hover:text-blue-600">关于我们</Link>
                </div>
              </nav>
            </div>
          </header>
          
          <main className="flex-1">
            {children}
          </main>
          
          <footer className="w-full border-t border-gray-200 bg-white py-8">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <div className="flex justify-center space-x-6 mb-4">
                <Link href="/about" className="hover:text-blue-600">关于我们</Link>
                <Link href="/contact" className="hover:text-blue-600">联系我们</Link>
                <Link href="/privacy" className="hover:text-blue-600">隐私政策</Link>
                <Link href="/disclaimer" className="hover:text-blue-600">免责声明</Link>
              </div>
              <p className="mb-2">
                📧 联系邮箱：
                <a href="mailto:support@gongzhonghaobaowen.com" className="hover:text-blue-600">
                  support@gongzhonghaobaowen.com
                </a>
              </p>
              <p className="text-sm">
                © {new Date().getFullYear()} 公众号爆文生成器 | 本站使用AI大模型驱动，所有内容仅供参考。
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
