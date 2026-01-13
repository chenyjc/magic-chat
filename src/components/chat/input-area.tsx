"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Mic, MicOff, Paperclip, Clipboard, Square, Image, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { GradientBorderCard } from "@/components/ui/gradient-border-card"
import { cn } from "@/lib/utils"

interface InputAreaProps {
  defaultValue?: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  sendMessage: (message: { text: string }, options?: { body?: { systemPrompt?: string } }) => void
  status: 'submitted' | 'streaming' | 'ready' | 'error'
  onStop: () => void
  systemPrompt?: string
}

export function InputArea({ defaultValue, handleInputChange, sendMessage, status, onStop, systemPrompt }: InputAreaProps) {
  const isLoading = status === 'submitted' || status === 'streaming'
  const [input, setInput] = useState(defaultValue || '')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    setInput(defaultValue || '')
  }, [defaultValue])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (input.trim()) {
        sendMessage({ text: input.trim() }, { body: { systemPrompt } })
        setInput('')
      }
    }
  }

  const startRecording = async () => {
    console.log('开始录音...')
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    
    if (!SpeechRecognition) {
      console.error('浏览器不支持语音识别')
      alert('您的浏览器不支持语音识别功能')
      return
    }

    try {
      console.log('请求麦克风权限...')
      await navigator.mediaDevices.getUserMedia({ audio: true })
      console.log('麦克风权限已获取')
    } catch (error) {
      console.error('获取麦克风权限失败:', error)
      alert('无法访问麦克风，请在浏览器设置中允许麦克风权限')
      return
    }

    try {
      const recognition = new SpeechRecognition()
      
      recognition.lang = 'zh-CN'
      recognition.continuous = true
      recognition.interimResults = true

      recognition.onstart = () => {
        console.log('录音已开始')
        setIsRecording(true)
        setRecordingDuration(0)
      }

      recognition.onresult = (event: any) => {
        console.log('收到语音识别结果:', event)
        let interimTranscript = ''
        let finalTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          console.log(`结果 ${i}:`, transcript, '是否最终:', event.results[i].isFinal)
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        if (finalTranscript) {
          console.log('最终文本:', finalTranscript)
          handleInputChange({
            target: { value: input + finalTranscript }
          } as React.ChangeEvent<HTMLTextAreaElement>)
        }
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error, event.message)
        setIsRecording(false)
        
        if (event.error === 'not-allowed') {
          alert('麦克风权限被拒绝，请在浏览器地址栏左侧点击锁图标，允许麦克风权限')
        } else {
          alert(`语音识别错误: ${event.error}`)
        }
      }

      recognition.onend = () => {
        console.log('录音已结束')
        setIsRecording(false)
      }

      recognitionRef.current = recognition
      recognition.start()
    } catch (error) {
      console.error('启动录音失败:', error)
      alert('启动录音失败，请检查浏览器权限')
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsRecording(false)
    setRecordingDuration(0)
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeUploadedImage = () => {
    setUploadedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) {
        handleInputChange({
          target: { value: input + text }
        } as React.ChangeEvent<HTMLTextAreaElement>)
      }
    } catch (err) {
      console.error('粘贴失败:', err)
      alert('无法访问剪贴板，请检查浏览器权限')
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="pointer-events-auto px-4 w-full max-w-4xl mx-auto">
      <GradientBorderCard
        gradientFrom={isFocused ? "#06b6d4" : "#3b82f6"}
        gradientTo={isFocused ? "#d946ef" : "#8b5cf6"}
        borderWidth={isFocused ? 3 : 2}
        borderRadius="0.75rem"
        padding="0"
        background="hsl(var(--background))"
        shadow={isFocused ? "extra_large" : "large"}
        animated="focus"
        className={cn(
          "transition-all duration-500 ease-in-out transform relative",
          isFocused ? "scale-[1.02] shadow-2xl shadow-cyan-500/20" : "scale-100",
          isFocused && "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-cyan-500/20 before:to-pink-500/20 before:animate-pulse before:-z-10 before:blur-sm"
        )}
        style={{
          ...(isFocused && {
            boxShadow: `
              0 0 0 1px rgba(6, 182, 212, 0.3),
              0 0 20px rgba(6, 182, 212, 0.2),
              0 0 40px rgba(217, 70, 239, 0.1),
              0 20px 40px rgba(0, 0, 0, 0.15)
            `
          })
        }}
      >
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {uploadedImage && (
            <div className="relative p-4 pb-2">
              <div className="relative inline-block">
                <img
                  src={uploadedImage}
                  alt="上传的图片"
                  className="max-h-32 rounded-lg border"
                />
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={removeUploadedImage}
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background shadow-md hover:bg-destructive hover:text-destructive-foreground"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              handleInputChange(e)
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="输入消息... (Shift+Enter 换行)"
            className={cn(
              "min-h-[80px] resize-none border-0 bg-transparent px-4 py-3 pr-28 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300",
              isFocused && "placeholder:text-muted-foreground/70"
            )}
            disabled={isLoading}
          />
          
          <div className="absolute left-2 bottom-2 flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={isRecording ? stopRecording : startRecording}
              className={cn(
                "h-9 w-9 rounded-lg transition-all hover:bg-accent",
                isRecording && "bg-red-50 border-red-200 hover:bg-red-100 dark:bg-red-900/20 dark:border-red-800 dark:hover:bg-red-900/30"
              )}
            >
              {isRecording ? (
                <MicOff className="h-4 w-4 text-red-600 dark:text-red-400" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleFileUpload}
              className="h-9 w-9 rounded-lg hover:bg-accent"
              title="上传图片"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handlePaste}
              className="h-9 w-9 rounded-lg hover:bg-accent"
              title="粘贴"
            >
              <Clipboard className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="absolute right-2 bottom-2">
            <Button
              disabled={isLoading ? false : !(input && input.trim())}
              className={cn(
                "rounded-full px-6 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300",
                isLoading
                  ? "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-lg"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl",
                isFocused && "scale-105 shadow-xl"
              )}
              onClick={() => {
                if (isLoading) {
                  onStop()
                } else {
                  sendMessage({ text: input.trim() }, { body: { systemPrompt } })
                  setInput('')
                }
              }}
            >
              {isLoading ? (
                <>
                  <Square className="mr-2 h-4 w-4" />
                  停止
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  发送
                </>
              )}
            </Button>
          </div>
        </div>
      </GradientBorderCard>

      {isRecording && (
        <div className="mt-3">
          <GradientBorderCard
            gradientFrom="#ef4444"
            gradientTo="#f97316"
            borderWidth={2}
            borderRadius="0.5rem"
            padding="0.75rem"
            background="hsl(var(--background))"
            shadow="medium"
            className="bg-red-50/50 dark:bg-red-900/10"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
                <span className="font-medium text-red-600 dark:text-red-400">
                  正在录音...
                </span>
                <span className="font-mono text-sm text-red-500">
                  {formatTime(recordingDuration)}
                </span>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={stopRecording}
              >
                <MicOff className="mr-2 h-4 w-4" />
                停止
              </Button>
            </div>
          </GradientBorderCard>
        </div>
      )}
    </div>
  )
}
