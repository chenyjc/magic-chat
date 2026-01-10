import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'

export const runtime = 'edge'

const ollama = createOpenAI({
  baseURL: process.env.OLLAMA_BASE_URL || 'http://localhost:11434/v1',
  apiKey: process.env.OLLAMA_API_KEY || 'ollama',
})

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: ollama(process.env.OLLAMA_MODEL || 'qwen3:4b'),
    messages,
  })

  return result.toDataStreamResponse()
}
