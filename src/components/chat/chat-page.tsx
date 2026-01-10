"use client"

import { useChat } from "ai/react"
import { Header } from "./header"
import { ChatContainer } from "./chat-container"
import { InputArea } from "./input-area"

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput, stop } = useChat({
    api: "/api/chat",
  })

  const handleNewChat = () => {
    setInput('')
    window.location.href = '/'
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    handleSubmit({ preventDefault: () => {} } as React.FormEvent)
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header onNewChat={handleNewChat} />
      <ChatContainer
        messages={messages}
        isLoading={isLoading}
        isThinking={isLoading && messages.length > 0}
        onSuggestionClick={handleSuggestionClick}
      />
      <InputArea
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        onStop={stop}
      />
    </div>
  )
}
