"use client"

import { useState } from "react"
import { Bot, Copy, Volume2, VolumeX, ThumbsUp, ThumbsDown, Loader2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MarkdownRenderer } from "./markdown-renderer"
import { cn } from "@/lib/utils"
import { useSpeechSynthesis } from "@/hooks/use-speech-synthesis"

interface MessageBubbleProps {
  message: {
    role: "user" | "assistant"
    content: string
  }
  isLoading?: boolean
  isThinking?: boolean
  isLastMessage?: boolean
}

export function MessageBubble({ message, isLoading, isThinking, isLastMessage }: MessageBubbleProps) {
  const isUser = message.role === "user"
  const { isSpeaking, isSupported, speak, stop } = useSpeechSynthesis()
  const [copied, setCopied] = useState(false)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  const handleSpeak = () => {
    if (isSpeaking) {
      stop()
    } else {
      speak(message.content)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  const handleLike = () => {
    if (disliked) {
      setDisliked(false)
    }
    setLiked(!liked)
  }

  const handleDislike = () => {
    if (liked) {
      setLiked(false)
    }
    setDisliked(!disliked)
  }

  const isGenerating = isLoading || isThinking

  if (isUser) {
    return (
      <div className="flex justify-end mb-6 animate-slide-in">
        <div className="max-w-[80%] space-y-2">
          <div className="rounded-2xl rounded-br-sm bg-gradient-to-br from-blue-500 to-purple-600 px-5 py-3 shadow-lg">
            <p className="text-white text-base leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start mb-6 animate-slide-in">
      <div className="max-w-4xl space-y-3">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-blue-500">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 space-y-2 min-w-0">
            <div className="px-5 py-4 min-w-0">
              {/* 显示loading或thinking状态 */}
              {(isLoading || isThinking) && isLastMessage && (
                <div className="flex items-center gap-2 mb-3">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {isThinking ? 'AI正在思考...' : 'AI正在输出...'}
                  </span>
                </div>
              )}
              
              {/* 总是显示消息内容（不只是最后一条） */}
              <MarkdownRenderer content={message.content} />
            </div>
            
            {/* 显示操作按钮 - 只在输出完成后显示 */}
            {!isGenerating && message.content && (
              <div className="flex items-center gap-1 ml-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  title={copied ? "已复制" : "复制"}
                  className="h-7 w-7"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                {isSupported && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSpeak}
                    title={isSpeaking ? "停止" : "朗读"}
                    className={cn("h-7 w-7", isSpeaking && "text-primary")}
                  >
                    {isSpeaking ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLike}
                  title="点赞"
                  className={cn("h-7 w-7", liked && "text-green-600 dark:text-green-400")}
                >
                  <ThumbsUp className={cn("h-4 w-4", liked && "fill-current")} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDislike}
                  title="点踩"
                  className={cn("h-7 w-7", disliked && "text-red-600 dark:text-red-400")}
                >
                  <ThumbsDown className={cn("h-4 w-4", disliked && "fill-current")} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
