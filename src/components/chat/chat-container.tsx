"use client"

import { useRef, useEffect } from "react"
import { Bot, User } from "lucide-react"
import { MessageBubble } from "./message-bubble"
import { cn } from "@/lib/utils"

interface ChatContainerProps {
  messages: any[]
  isLoading: boolean
  isThinking: boolean
  onSuggestionClick?: (suggestion: string) => void
}

const SUGGESTIONS = [
  "帮我分析这个数据集",
  "生成一个销售趋势图表",
  "解释一下机器学习",
  "写一个Python爬虫",
  "帮我优化这段代码",
]

export function ChatContainer({ messages, isLoading, isThinking, onSuggestionClick }: ChatContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading, isThinking])

  const hasMessages = messages.length > 0

  return (
    <div className="flex-1 overflow-y-auto" ref={scrollRef}>
      <div className="container mx-auto max-w-4xl px-4 py-6">
        {!hasMessages && !isLoading && !isThinking && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
              <Bot className="h-10 w-10 text-blue-500" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-foreground">
              有什么可以帮你的？
            </h2>
            <p className="mt-2 text-center text-muted-foreground">
              尝试以下示例，或直接输入你的问题
            </p>
            <div className="mt-8 grid w-full max-w-lg gap-3">
              {SUGGESTIONS.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => onSuggestionClick?.(suggestion)}
                  className={cn(
                    "group relative rounded-xl border bg-card p-4 text-left transition-all",
                    "hover:border-primary hover:bg-accent hover:shadow-md",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  )}
                >
                  <span className="text-sm font-medium text-card-foreground group-hover:text-foreground">
                    {suggestion}
                  </span>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                    <svg
                      className="h-4 w-4 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 显示所有消息，loading和thinking状态集成到消息气泡中 */}
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            message={message}
            isLoading={isLoading}
            isThinking={isThinking}
            isLastMessage={index === messages.length - 1}
          />
        ))}
      </div>
    </div>
  )
}
