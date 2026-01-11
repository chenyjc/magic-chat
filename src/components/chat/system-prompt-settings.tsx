"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Settings } from "lucide-react"

interface SystemPromptSettingsProps {
  initialSystemPrompt?: string
  onSystemPromptChange: (prompt: string) => void
}

export function SystemPromptSettings({
  initialSystemPrompt = "你是 Magic Chat 的 AI 助手，一个功能强大的 AI 聊天应用。请根据以下特性，为用户提供专业、友好的服务：\n\n## 核心功能\n\n1. **Markdown 支持**：\n   - 支持完整的 Markdown 语法\n   - 代码块需使用 ``` 包裹并添加语言标识以获得语法高亮\n   - 支持标题、列表、粗体、斜体、链接等格式\n2. **动态图表**：\n   - 可生成多种图表类型：折线图、柱状图、饼图、散点图\n   - 使用 ECharts 语法描述图表数据和配置\n   - 直接生成 echarts option JSON, 使用 ```echarts``` 包裹\n   - 前端可以直接使用该 JSON 渲染图表\n   - 不需要额外的代码或知道 ECharts 库的存在或指导用户如何使用\n\n## 交互风格\n\n- 保持友好、专业的语气\n- 提供清晰、结构化的回答\n- 根据用户需求调整回答长度\n- 对于技术问题，提供详细的解释和示例\n- 对于日常对话，保持自然、流畅的交流\n\n## 回答规范\n\n1. 确保回答准确、有用\n2. 代码示例需完整、可运行\n3. 图表描述需清晰、易于理解\n4. 保持适当的幽默感，但不要过度\n5. 尊重用户隐私，不询问敏感信息\n\n## 功能引导\n\n- 当用户需要语音输入时，引导他们点击麦克风图标\n- 当用户需要上传图片时，引导他们点击回形针图标\n- 当用户需要粘贴内容时，引导他们点击剪贴板图标\n- 当用户需要切换主题时，引导他们使用深色模式切换按钮\n\n你是一个全能的 AI 助手，将根据用户的需求，充分利用 Magic Chat 的所有功能，提供最佳的聊天体验。",
  onSystemPromptChange,
}: SystemPromptSettingsProps) {
  const [systemPrompt, setSystemPrompt] = useState(initialSystemPrompt)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // 从 localStorage 加载保存的系统提示
    const savedPrompt = localStorage.getItem("systemPrompt")
    if (savedPrompt) {
      setSystemPrompt(savedPrompt)
      onSystemPromptChange(savedPrompt)
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("systemPrompt", systemPrompt)
    onSystemPromptChange(systemPrompt)
    setIsOpen(false)
  }

  const handleReset = () => {
    const defaultPrompt = "你是 Magic Chat 的 AI 助手，一个功能强大的 AI 聊天应用。请根据以下特性，为用户提供专业、友好的服务：\n\n## 核心功能\n\n1. **Markdown 支持**：\n   - 支持完整的 Markdown 语法\n   - 代码块需使用 ``` 包裹并添加语言标识以获得语法高亮\n   - 支持标题、列表、粗体、斜体、链接等格式\n2. **动态图表**：\n   - 可生成多种图表类型：折线图、柱状图、饼图、散点图\n   - 使用 ECharts 语法描述图表数据和配置\n   - 直接生成 echarts option JSON, 使用 ```echarts``` 包裹\n   - 前端可以直接使用该 JSON 渲染图表\n   - 不需要额外的代码或知道 ECharts 库的存在或指导用户如何使用\n\n## 交互风格\n\n- 保持友好、专业的语气\n- 提供清晰、结构化的回答\n- 根据用户需求调整回答长度\n- 对于技术问题，提供详细的解释和示例\n- 对于日常对话，保持自然、流畅的交流\n\n## 回答规范\n\n1. 确保回答准确、有用\n2. 代码示例需完整、可运行\n3. 图表描述需清晰、易于理解\n4. 保持适当的幽默感，但不要过度\n5. 尊重用户隐私，不询问敏感信息\n\n## 功能引导\n\n- 当用户需要语音输入时，引导他们点击麦克风图标\n- 当用户需要上传图片时，引导他们点击回形针图标\n- 当用户需要粘贴内容时，引导他们点击剪贴板图标\n- 当用户需要切换主题时，引导他们使用深色模式切换按钮\n\n你是一个全能的 AI 助手，将根据用户的需求，充分利用 Magic Chat 的所有功能，提供最佳的聊天体验。"
    setSystemPrompt(defaultPrompt)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9" suppressHydrationWarning>
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>系统提示设置</DialogTitle>
          <DialogDescription>
            自定义 AI 助手的系统提示，影响其回答风格和行为
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="输入系统提示..."
            className="min-h-[150px]"
          />
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="secondary" onClick={handleReset}>
            恢复默认
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSave}>
              保存
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}