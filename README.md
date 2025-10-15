# 云寻 - 多网盘资源聚合搜索引擎

一个现代化的网盘资源搜索前端应用，基于 Next.js 15 构建。

> **后端 API 说明**：本项目使用开源项目 [pansou](https://github.com/fish2018/pansou) 作为后端 API 服务。感谢原作者的贡献！

## ✨ 功能特性

- 🔍 **多网盘聚合搜索** - 一次搜索，聚合12+主流网盘平台资源
- 🎨 **现代化UI设计** - 渐变色设计，优雅的交互动效
- 📱 **完美响应式布局** - 移动端、平板、桌面端完美适配
- 🔐 **安全的API代理** - 隐藏后端地址，保护服务器信息
- ⚡ **智能搜索限流** - 防止频繁请求，Token自动缓存
- 🏷️ **网盘类型筛选** - 按网盘类型快速筛选结果
- 📋 **一键复制** - 快速复制分享链接和提取码
- 🎯 **来源标识** - 清晰显示资源来自哪个Telegram频道或插件
- 💾 **详细资源信息** - 资源名称、时间、图片预览等
- 🔄 **API健康监控** - 实时显示后端服务状态

## 支持的网盘类型

- 百度网盘
- 阿里云盘
- 夸克网盘
- 天翼云盘
- UC网盘
- 移动云盘
- 115网盘
- PikPak
- 迅雷云盘
- 123云盘
- 磁力链接
- ED2K链接

## 📦 后端部署

本项目需要先部署后端 API 服务：

1. 克隆后端项目：
```bash
git clone https://github.com/fish2018/pansou.git
```

2. 按照 [pansou 项目文档](https://github.com/fish2018/pansou) 部署后端服务

3. 记录后端 API 地址（如：`http://your-server-ip:8888`）

## ⚙️ 前端配置

1. 复制环境变量示例文件：

```bash
cp .env.example .env.local
```

2. 编辑 `.env.local` 文件，配置后端API地址：

```env
# 后端API地址（必填，服务端使用，不会暴露到前端）
API_URL=http://your-server-ip:8888

# 认证配置（可选，如果API启用了认证则必填）
# 配置用户名密码后，应用启动时会自动登录获取Token
NEXT_PUBLIC_API_USERNAME=admin
NEXT_PUBLIC_API_PASSWORD=admin123
```

> ⚠️ **安全提示**：`API_URL` 不带 `NEXT_PUBLIC_` 前缀，只在服务端使用，不会暴露到浏览器。前端通过 `/api/proxy` 代理访问后端，保护真实API地址。

## 🚀 本地开发

1. 安装依赖：

```bash
npm install
# 或
pnpm install
```

2. 启动开发服务器：

```bash
npm run dev
# 或
pnpm dev
```

3. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 📦 构建生产版本

```bash
npm run build
npm run start
```

## 🌐 部署到 Vercel

### 方式一：通过 Vercel Dashboard

1. 将代码推送到 GitHub
2. 在 [Vercel Dashboard](https://vercel.com/new) 导入项目
3. 配置环境变量：
   - `API_URL` - 你的后端API地址（必填）
   - `NEXT_PUBLIC_API_USERNAME` - API认证用户名（可选）
   - `NEXT_PUBLIC_API_PASSWORD` - API认证密码（可选）
4. 点击 Deploy

### 方式二：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 设置环境变量
vercel env add API_URL
vercel env add NEXT_PUBLIC_API_USERNAME
vercel env add NEXT_PUBLIC_API_PASSWORD
```

### 其他部署平台

本项目是标准的 Next.js 应用，可以部署到任何支持 Next.js 的平台：
- Netlify
- Railway
- 自建服务器（使用 Docker 或直接运行）

## 📁 项目结构

```
pansou_web/
├── src/
│   ├── app/
│   │   ├── api/proxy/         # API代理路由
│   │   ├── globals.css        # 全局样式
│   │   ├── layout.tsx         # 根布局
│   │   └── page.tsx           # 主页面
│   ├── components/            # React组件
│   │   ├── SearchBar.tsx      # 搜索栏
│   │   ├── SearchStats.tsx    # 搜索统计
│   │   ├── CloudTypeFilter.tsx # 网盘类型筛选
│   │   ├── SearchResults.tsx  # 搜索结果
│   │   └── ApiHealthModal.tsx # API健康状态弹窗
│   ├── constants/             # 常量配置
│   │   └── cloudTypes.ts      # 网盘类型配置
│   └── types/                 # TypeScript类型定义
│       └── index.ts
├── public/
│   └── icon.svg              # 网站图标
├── .env.local                # 本地环境变量（不提交到git）
├── .env.example              # 环境变量示例
└── README.md                 # 项目文档
```

## 🛠️ 技术栈

- **框架**: [Next.js 15.5.5](https://nextjs.org/) - React 服务端渲染框架
- **语言**: [TypeScript](https://www.typescriptlang.org/) - 类型安全的 JavaScript
- **样式**: [Tailwind CSS 4](https://tailwindcss.com/) - 实用优先的 CSS 框架
- **UI库**: [React 19.1.0](https://react.dev/) - 声明式UI库
- **部署**: [Vercel](https://vercel.com/) - 一键部署平台

## 🔗 相关项目

- **后端API**: [pansou](https://github.com/fish2018/pansou) - 网盘资源搜索后端服务

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

MIT License

Copyright (c) 2025

感谢 [pansou](https://github.com/fish2018/pansou) 项目提供的后端支持。
