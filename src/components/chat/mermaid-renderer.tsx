"use client"

import { useEffect, useRef, useState } from "react"
import mermaid from "mermaid"

interface MermaidRendererProps {
  chart: string
}

export function MermaidRenderer({ chart }: MermaidRendererProps) {
  const [renderError, setRenderError] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [svgContent, setSvgContent] = useState<string>("")

  useEffect(() => {
    // 初始化 mermaid 配置
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    })

    const renderChart = async () => {
      if (!containerRef.current || !chart.trim()) return

      try {
        setRenderError(false)
        // 生成唯一的图表 ID
        const chartId = `mermaid-${Math.random().toString(36).substr(2, 9)}`

        // 渲染 mermaid 图表
        const { svg } = await mermaid.render(chartId, chart.trim())
        setSvgContent(svg)
      } catch (error) {
        console.error('Mermaid 渲染失败:', error)
        setRenderError(true)
      }
    }

    renderChart()
  }, [chart])

  if (renderError) {
    return (
      <div className="my-4 rounded-xl border bg-card p-4 shadow-md">
        <div className="text-sm text-muted-foreground mb-2">
          Mermaid 图表渲染失败，以下是原始代码：
        </div>
        <pre className="text-xs font-mono whitespace-pre-wrap break-all bg-muted/50 p-3 rounded">
          {chart}
        </pre>
      </div>
    )
  }

  return (
    <div className="my-4 rounded-xl border bg-card p-4 shadow-md">
      <div className="mb-3">
        <h3 className="font-semibold text-foreground">Mermaid 图表</h3>
      </div>
      <div
        ref={containerRef}
        className="overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  )
}