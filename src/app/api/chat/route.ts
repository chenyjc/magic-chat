import { createOpenAI } from '@ai-sdk/openai'
import { convertToModelMessages, streamText } from 'ai'

export const runtime = 'edge'

const ollama = createOpenAI({
  baseURL: process.env.OLLAMA_BASE_URL || 'http://localhost:11434/v1',
  apiKey: process.env.OLLAMA_API_KEY || 'ollama',
})

export async function POST(req: Request) {
  const { messages, systemPrompt } = await req.json()

  const result = streamText({
    model: ollama(process.env.OLLAMA_MODEL || 'qwen3-coder:30b'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
