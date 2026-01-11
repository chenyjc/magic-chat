# Magic Chat

一个功能强大的 AI 聊天应用，支持流式输出、Markdown 渲染、动态图表展示、语音交互和图片上传。

## 功能特性

- 🚀 **流式输出**：使用 Vercel AI SDK 实现实时流式响应
- 📝 **Markdown 渲染**：支持完整的 Markdown 语法，包括代码高亮
- 📊 **动态图表**：集成 ECharts，支持多种图表类型
- 🎤 **语音输入**：使用 Web Speech API 实现语音识别
- 🔊 **语音输出**：支持文本转语音功能
- 📤 **图片上传**：支持上传图片并预览
- 📋 **粘贴功能**：一键粘贴剪贴板内容
- 🌓 **深色模式**：内置主题切换功能
- 📱 **响应式设计**：完美适配桌面端和移动端

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **AI SDK**: Vercel AI SDK
- **样式**: Tailwind CSS
- **组件库**: shadcn/ui
- **图表**: ECharts

## 快速开始

### 安装依赖

```bash
npm install
```

### 配置环境变量

创建 `.env.local` 文件：

```env
# OpenAI API 配置（可选）
# OPENAI_API_KEY=your_openai_api_key_here

# Ollama 配置（推荐）
OLLAMA_BASE_URL=http://localhost:11434/v1
OLLAMA_MODEL=qwen3-coder:30b
OLLAMA_API_KEY=ollama
```

### 运行开发服务器

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 项目结构

```
src/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # API 路由
│   ├── globals.css               # 全局样式
│   ├── layout.tsx                # 根布局
│   └── page.tsx                  # 首页
├── components/
│   ├── chat/
│   │   ├── chat-page.tsx         # 聊天页面主组件
│   │   ├── chat-container.tsx    # 消息容器
│   │   ├── message-bubble.tsx    # 消息气泡
│   │   ├── markdown-renderer.tsx # Markdown 渲染器
│   │   ├── chart-renderer.tsx    # 图表渲染器
│   │   ├── input-area.tsx        # 输入区域
│   │   └── header.tsx            # 头部组件
│   ├── providers/
│   │   └── theme-provider.tsx   # 主题提供者
│   ├── theme-toggle.tsx          # 主题切换
│   └── ui/                       # UI 组件
└── lib/
    └── utils.ts                  # 工具函数
```

## 使用说明

### 基本聊天

在输入框中输入消息，按 Enter 发送（Shift+Enter 换行）。

### 语音输入

1. 点击麦克风图标开始录音
2. 再次点击停止录音
3. 浏览器会请求麦克风权限，请允许访问

### 图片上传

1. 点击回形针图标选择图片
2. 图片会显示在输入框上方的预览区域
3. 点击图片右上角的 X 可以删除已上传的图片

### 粘贴功能

点击剪贴板图标，自动将剪贴板内容粘贴到输入框。

### Markdown 支持

AI 回复支持完整的 Markdown 语法，包括：

- 标题（#、##、###）
- 代码块（```）
- 列表（-、1.）
- 粗体和斜体
- 链接和图片

### 图表展示

AI 可以生成动态图表，支持以下类型：

- 折线图
- 柱状图
- 饼图
- 散点图

## 开发

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

### 代码检查

```bash
npm run lint
```

## 许可证

MIT License
