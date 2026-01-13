"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { Bot, User, ArrowDown } from "lucide-react"
import { MessageBubble } from "./message-bubble"
import { GradientBorderCard } from "@/components/ui/gradient-border-card"
import { cn } from "@/lib/utils"

interface ChatContainerProps {
  messages: any[]
  status: 'submitted' | 'streaming' | 'ready' | 'error'
  isThinking: boolean
  onSuggestionClick?: (suggestion: string) => void
}

export function ChatContainer({ messages, status, isThinking, onSuggestionClick }: ChatContainerProps) {
  const isLoading = status === 'submitted' || status === 'streaming'
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)

  const SUGGESTIONS = [
    "生成一个销售趋势图表",
    "解释一下机器学习",
    "写一个Python爬虫",
  ]

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [])

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 100
      setShowScrollButton(!isAtBottom && messages.length > 0)
    }
  }, [messages.length])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      setShowScrollButton(false)
    }
  }, [messages, isLoading, isThinking])

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScroll)
      return () => scrollElement.removeEventListener('scroll', checkScroll)
    }
  }, [checkScroll])

  const hasMessages = messages.length > 0

  return (
    <div className="flex-1 overflow-y-auto" ref={scrollRef}>
      <div className="container mx-auto max-w-4xl px-4 py-6 pb-48">
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
                <GradientBorderCard
                  key={index}
                  gradientFrom="#6366f1"
                  gradientTo="#8b5cf6"
                  borderWidth={1}
                  borderRadius="0.75rem"
                  padding="1rem"
                  background="hsl(var(--card))"
                  shadow="small"
                  animated="scale"
                  interactive={true}
                  onClick={() => onSuggestionClick?.(suggestion)}
                  className="cursor-pointer group"
                  role="button"
                  tabIndex={0}
                  aria-label={`建议: ${suggestion}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-card-foreground group-hover:text-foreground">
                      {suggestion}
                    </span>
                    <div className="opacity-0 transition-opacity group-hover:opacity-100">
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
                  </div>
                </GradientBorderCard>
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

      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-24 right-1/2 translate-x-32 z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-background shadow-lg transition-all hover:scale-110 hover:bg-accent"
          aria-label="滚动到底部"
        >
          <ArrowDown className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
