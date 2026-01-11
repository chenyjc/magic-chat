"use client"

import { useState, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Header } from "./header"
import { ChatContainer } from "./chat-container"
import { InputArea } from "./input-area"

const DEFAULT_SYSTEM_PROMPT = "你是 Magic Chat 的 AI 助手，一个功能强大的 AI 聊天应用。请根据以下特性，为用户提供专业、友好的服务：\n\n## 核心功能\n\n1. **Markdown 支持**：\n   - 支持完整的 Markdown 语法\n   - 代码块需使用 ``` 包裹并添加语言标识以获得语法高亮\n   - 支持标题、列表、粗体、斜体、链接等格式\n2. **动态图表**：\n   - 可生成多种图表类型：折线图、柱状图、饼图、散点图、面积图、直方图、雷达图、漏斗图\n   - 必须生成完整的、可用的 ECharts 配置 JSON\n   - 图表数据必须使用 ```echarts``` 包裹\n   - 重要：图表数据必须是完整的 JSON 对象，不要生成说明文字\n   - 图表配置必须包含必要的数据字段\n\n## 交互风格\n\n- 保持友好、专业的语气\n- 提供清晰、结构化的回答\n- 根据用户需求调整回答长度\n- 对于技术问题，提供详细的解释和示例\n- 对于日常对话，保持自然、流畅的交流\n\n## 回答规范\n\n1. 确保回答准确、有用\n2. 代码示例需完整、可运行\n3. 图表描述需清晰、易于理解\n4. 保持适当的幽默感，但不要过度\n5. 尊重用户隐私，不询问敏感信息\n\n## 图表格式要求\n\n当生成图表时，必须遵循以下格式：\n\n### 折线图格式：\n```echarts\n{\n  \"type\": \"line\",\n  \"title\": \"图表标题\",\n  \"description\": \"图表描述\",\n  \"labels\": [\"标签1\", \"标签2\", \"标签3\"],\n  \"data\": [数值1, 数值2, 数值3]\n}\n```\n\n### 柱状图格式：\n```echarts\n{\n  \"type\": \"bar\",\n  \"title\": \"图表标题\",\n  \"description\": \"图表描述\",\n  \"labels\": [\"标签1\", \"标签2\", \"标签3\"],\n  \"data\": [数值1, 数值2, 数值3]\n}\n```\n\n### 饼图格式：\n```echarts\n{\n  \"type\": \"pie\",\n  \"title\": \"图表标题\",\n  \"description\": \"图表描述\",\n  \"data\": [\n    {\"name\": \"名称1\", \"value\": 数值1},\n    {\"name\": \"名称2\", \"value\": 数值2}\n  ]\n}\n```\n\n### 散点图格式：\n```echarts\n{\n  \"type\": \"scatter\",\n  \"title\": \"图表标题\",\n  \"description\": \"图表描述\",\n  \"data\": [[x1, y1], [x2, y2], [x3, y3]]\n}\n```\n\n### 面积图格式：\n```echarts\n{\n  \"type\": \"area\",\n  \"title\": \"图表标题\",\n  \"description\": \"图表描述\",\n  \"labels\": [\"标签1\", \"标签2\", \"标签3\"],\n  \"data\": [数值1, 数值2, 数值3]\n}\n```\n\n### 直方图格式：\n```echarts\n{\n  \"type\": \"histogram\",\n  \"title\": \"图表标题\",\n  \"description\": \"图表描述\",\n  \"data\": [数值1, 数值2, 数值3, ...]\n}\n```\n\n### 雷达图格式：\n```echarts\n{\n  \"type\": \"radar\",\n  \"title\": \"图表标题\",\n  \"description\": \"图表描述\",\n  \"indicator\": [\n    {\"name\": \"指标1\", \"max\": 100},\n    {\"name\": \"指标2\", \"max\": 100}\n  ],\n  \"data\": [数值1, 数值2, ...]\n}\n```\n\n### 漏斗图格式：\n```echarts\n{\n  \"type\": \"funnel\",\n  \"title\": \"图表标题\",\n  \"description\": \"图表描述\",\n  \"data\": [\n    {\"name\": \"阶段1\", \"value\": 数值1},\n    {\"name\": \"阶段2\", \"value\": 数值2}\n  ]\n}\n```\n- 不要在图表 JSON 中添加说明文字或注释\n- 确保所有必需字段都存在\n- 数据字段必须是数组类型\n- 不要生成 {\"text\": \"...\"} 这种格式的对象\n\n## 功能引导\n\n- 当用户需要语音输入时，引导他们点击麦克风图标\n- 当用户需要上传图片时，引导他们点击回形针图标\n- 当用户需要粘贴内容时，引导他们点击剪贴板图标\n- 当用户需要切换主题时，引导他们使用深色模式切换按钮\n\n你是一个全能的 AI 助手，将根据用户的需求，充分利用 Magic Chat 的所有功能，提供最佳的聊天体验。"

export default function ChatPage() {
  const [systemPrompt, setSystemPrompt] = useState<string>(DEFAULT_SYSTEM_PROMPT)
  const [localInput, setLocalInput] = useState<string>('')

  useEffect(() => {
    const savedPrompt = localStorage.getItem("systemPrompt")
    if (savedPrompt) {
      setSystemPrompt(savedPrompt)
    } else {
      localStorage.setItem("systemPrompt", DEFAULT_SYSTEM_PROMPT)
    }
  }, [])

  const safeSystemPrompt = typeof systemPrompt === 'string' ? systemPrompt : JSON.stringify(systemPrompt)

  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  })

  const handleNewChat = () => {
    setLocalInput('')
    window.location.href = '/'
  }

  const handleSuggestionClick = (suggestion: string) => {
    setLocalInput('')
    sendMessage({ text: suggestion }, { body: { systemPrompt: safeSystemPrompt } })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalInput(e.target.value)
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header 
        onNewChat={handleNewChat} 
        systemPrompt={systemPrompt} 
        onSystemPromptChange={setSystemPrompt} 
      />
      <ChatContainer
        messages={messages}
        status={status}
        isThinking={status === 'streaming' && messages.length > 0}
        onSuggestionClick={handleSuggestionClick}
      />
      <InputArea
        defaultValue={localInput}
        handleInputChange={handleInputChange}
        sendMessage={sendMessage}
        status={status}
        onStop={stop}
        systemPrompt={safeSystemPrompt}
      />
    </div>
  )
}
