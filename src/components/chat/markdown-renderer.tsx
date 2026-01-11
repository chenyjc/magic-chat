"use client"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChartRenderer } from "./chart-renderer"
import { MermaidRenderer } from "./mermaid-renderer"

interface MarkdownRendererProps {
  content: string
  isStreaming?: boolean
}

export function MarkdownRenderer({ content, isStreaming = false }: MarkdownRendererProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const CodeBlock = ({ language, value, isStreaming }: { language: string; value: string; isStreaming: boolean }) => {
    const codeId = `code-${Math.random()}`

    // 检查是否是 echarts 配置数据
    if (!isStreaming && (language === 'echarts' || language === 'json')) {
      if (value && value.trim() && value !== 'undefined') {
        try {
          const jsonData = JSON.parse(value)
          // 必须是对象且不是数组，且包含有效的 echarts 配置
          if (jsonData && typeof jsonData === 'object' && !Array.isArray(jsonData)) {
            // 检查是否包含文本属性（可能是AI生成的无效内容）
            if (jsonData.text && typeof jsonData.text === 'string' && Object.keys(jsonData).length === 1) {
              // 这看起来像是文本内容，不是图表配置，跳过
              console.log('跳过文本内容:', jsonData.text)
            } else {
              // 必须是有效的 echarts 配置：包含 series 或完整的 axis 配置
              const hasSeries = jsonData.series && Array.isArray(jsonData.series)
              const hasCompleteAxis = jsonData.xAxis && jsonData.yAxis
              const hasTypeData = jsonData.type && ['line', 'bar', 'pie', 'scatter', 'area', 'histogram', 'radar', 'funnel'].includes(jsonData.type) && jsonData.data && Array.isArray(jsonData.data)

              if (hasSeries || hasCompleteAxis || hasTypeData) {
                return <ChartRenderer chartData={jsonData} />
              }
            }
          }
        } catch (e) {
          // 解析失败，显示代码块
          console.error('Echarts 图表解析失败:', e)
          // 显示带有错误提示的代码块
          return (
            <div className="my-4 rounded-xl border border-red-200 bg-red-50 p-4 shadow-md">
              <div className="mb-2 text-sm text-red-600 font-medium">
                ⚠️ 图表配置解析失败，请检查JSON格式
              </div>
              <pre className="text-xs font-mono whitespace-pre-wrap break-all text-red-800">
                {value}
              </pre>
              <div className="mt-2 text-xs text-red-500">
                错误: {e instanceof Error ? e.message : '未知错误'}
              </div>
            </div>
          )
        }
      }
    }

    // 检查是否是 mermaid 图表
    if (!isStreaming && language === 'mermaid') {
      if (value && value.trim()) {
        return <MermaidRenderer chart={value} />
      }
    }

    // 非特殊代码块，渲染语法高亮
    return (
      <div className="relative group my-4 overflow-x-auto min-w-0">
        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => {
              navigator.clipboard.writeText(value)
              setCopiedCode(codeId)
              setTimeout(() => setCopiedCode(null), 2000)
            }}
            className="bg-background/80 backdrop-blur-sm"
          >
            {copiedCode === codeId ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="min-w-0">
          <SyntaxHighlighter
            language={language || 'text'}
            style={vscDarkPlus}
            customStyle={{
              borderRadius: '0.75rem',
              fontSize: '0.875rem',
              padding: '1.5rem',
              background: 'linear-gradient(145deg, #1e1e1e, #2d2d2d)',
              minWidth: 'fit-content',
            }}
          >
            {value}
          </SyntaxHighlighter>
        </div>
      </div>
    )
  }

  return (
    <div className="prose prose-slate dark:prose-invert max-w-full overflow-hidden">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '')
            const codeString = String(children).replace(/\n$/, '')

            if (!inline && match && codeString && codeString.trim() && codeString !== 'undefined') {
              return (
                <div className="chart-block">
                  <CodeBlock
                    language={match[1]}
                    value={codeString}
                    isStreaming={isStreaming}
                  />
                </div>
              )
            }

            return (
              <code
                className={cn(
                  "bg-muted px-1.5 py-0.5 rounded text-sm font-mono",
                  inline && "before:content-[''] after:content-['']"
                )}
                {...props}
              >
                {children}
              </code>
            )
          },
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mt-8 mb-4 pb-2 border-b">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mt-6 mb-3">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-medium mt-5 mb-2">
              {children}
            </h4>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside my-4 space-y-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside my-4 space-y-2">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-4 bg-muted/50 rounded-r">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full divide-y divide-border border rounded-lg">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted/50">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-border">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-muted/30">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3">
              {children}
            </td>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {children}
            </a>
          ),
          p: ({ children }) => (
            <p className="leading-relaxed my-3">
              {children}
            </p>
          ),
          hr: () => (
            <hr className="my-6 border-t border-border" />
          ),
          del: ({ children }) => (
            <del className="line-through opacity-70">
              {children}
            </del>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
