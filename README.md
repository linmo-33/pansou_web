# 盘搜 - 网盘资源搜索引擎

一个现代化的网盘资源搜索前端应用，基于 Next.js 15 构建。

## 功能特性

- 🔍 **强大的搜索功能** - 支持多种网盘资源搜索
- 🎨 **现代化UI设计** - 简洁美观的用户界面
- 📱 **响应式布局** - 完美适配移动端和桌面端
- 🔐 **认证支持** - 支持API Token认证
- ⚡ **实时搜索** - 快速响应，显示搜索耗时
- 🏷️ **网盘类型筛选** - 支持12种网盘类型分类展示
- 📋 **一键复制** - 快速复制链接和提取码
- 🌓 **高级选项** - 数据来源选择、强制刷新等

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

## 环境配置

1. 复制环境变量示例文件：

```bash
cp .env.example .env.local
```

2. 编辑 `.env.local` 文件，配置API地址和认证信息：

```env
# API地址（必填）
NEXT_PUBLIC_API_URL=http://localhost:8888

# 认证配置（可选，如果API启用了认证则必填）
# 配置用户名密码后，应用启动时会自动登录获取Token
NEXT_PUBLIC_API_USERNAME=admin
NEXT_PUBLIC_API_PASSWORD=admin123
```

## 本地开发

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

## 部署到 Vercel

### 方式一：通过 Vercel Dashboard

1. 将代码推送到 GitHub
2. 在 [Vercel Dashboard](https://vercel.com/new) 导入项目
3. 配置环境变量：
   - `NEXT_PUBLIC_API_URL` - 你的后端API地址
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
vercel env add NEXT_PUBLIC_API_URL
vercel env add NEXT_PUBLIC_API_USERNAME
vercel env add NEXT_PUBLIC_API_PASSWORD
```

## 项目结构

```
pansou_web/
├── src/
│   └── app/
│       ├── globals.css      # 全局样式
│       ├── layout.tsx        # 根布局
│       └── page.tsx          # 主页面（搜索界面）
├── .env.local               # 本地环境变量（不提交到git）
├── .env.example             # 环境变量示例
└── api_doc.md               # API文档
```

## 技术栈

- **框架**: Next.js 15
- **语言**: TypeScript
- **样式**: Tailwind CSS 4
- **部署**: Vercel

## API 接口

本项目需要配合后端API使用，详细API文档请查看 [api_doc.md](./api_doc.md)。

主要接口：
- `GET/POST /api/search` - 搜索网盘资源
- `POST /api/auth/login` - 用户登录（可选）
- `GET /api/health` - 健康检查

## License

MIT
