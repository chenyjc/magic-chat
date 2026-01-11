import { createOpenAI } from '@ai-sdk/openai'
import { convertToModelMessages, streamText } from 'ai'

export const runtime = 'edge'

const chat = createOpenAI({
  baseURL: process.env.CHAT_API_BASE || 'http://localhost:11434/v1',
  apiKey: process.env.CHAT_API_KEY || 'your_api_key_here',
})

export async function POST(req: Request) {
  const { messages, systemPrompt } = await req.json()

  const result = streamText({
    model: chat(process.env.CHAT_MODEL || 'qwen3:4b'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
