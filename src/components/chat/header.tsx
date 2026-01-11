"use client"

import { Sparkles, Plus, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { SystemPromptSettings } from "./system-prompt-settings"

interface HeaderProps {
  onNewChat?: () => void
  systemPrompt?: string
  onSystemPromptChange: (prompt: string) => void
}

export function Header({ onNewChat, systemPrompt, onSystemPromptChange }: HeaderProps) {
  const handleSystemPromptChange = (prompt: string) => {
    onSystemPromptChange(prompt)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md dark:bg-gray-900/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
            <Wand2 className="h-5 w-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Magic Chat
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onNewChat}
            className="h-9 w-9"
            title="新建对话"
          >
            <Plus className="h-5 w-5" />
          </Button>
          <SystemPromptSettings 
            initialSystemPrompt={systemPrompt} 
            onSystemPromptChange={handleSystemPromptChange} 
          />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
