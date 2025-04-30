# AI文章生成器 v1.0

一个基于Next.js和DeepSeek API开发的公众号文章生成工具。

## 功能特点

- 支持多个文章领域的内容生成
- 智能分析标题，生成相关内容
- 结构化的文章输出
- 响应式设计，支持移动端访问

## 技术栈

- Next.js 14
- React 18
- Tailwind CSS
- DeepSeek API

## 环境要求

- Node.js 18+
- DeepSeek API Key

## 本地开发

1. 克隆项目
```bash
git clone [项目地址]
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
创建 `.env.local` 文件并添加：
```
NEXT_PUBLIC_DEEPSEEK_API_KEY=your_api_key_here
```

4. 启动开发服务器
```bash
npm run dev
```

## 部署

项目可以直接部署到Vercel平台：

1. 在Vercel上导入项目
2. 配置环境变量
3. 部署

## 版本历史

### v1.0 (2024-03-21)
- 初始版本发布
- 支持基本的文章生成功能
- 多领域支持
- 响应式UI设计

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
