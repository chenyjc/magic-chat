"use client"

import { MarkdownRenderer } from "@/components/chat/markdown-renderer"

export default function MarkdownTestPage() {
  const markdownContent = `# 图表渲染测试

## 折线图
\`\`\`echarts
{
  "type": "line",
  "title": "销售趋势",
  "description": "月度销售数据",
  "labels": ["1月", "2月", "3月", "4月", "5月", "6月"],
  "data": [120, 132, 101, 134, 90, 230]
}
\`\`\`

## 面积图
\`\`\`echarts
{
  "type": "area",
  "title": "访问量趋势",
  "description": "每日访问量",
  "labels": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  "data": [120, 132, 101, 134, 90, 230, 210]
}
\`\`\`

## 饼图
\`\`\`echarts
{
  "type": "pie",
  "title": "市场份额",
  "description": "各产品市场份额",
  "data": [
    {"name": "产品A", "value": 335},
    {"name": "产品B", "value": 310},
    {"name": "产品C", "value": 234},
    {"name": "产品D", "value": 135}
  ]
}
\`\`\`

## 雷达图
\`\`\`echarts
{
  "type": "radar",
  "title": "能力评估",
  "description": "各项能力评分",
  "indicator": [
    {"name": "技术", "max": 100},
    {"name": "沟通", "max": 100},
    {"name": "领导力", "max": 100},
    {"name": "创新", "max": 100},
    {"name": "执行力", "max": 100}
  ],
  "data": [85, 75, 90, 80, 95]
}
\`\`\`

## 无效的图表配置（测试错误处理）
\`\`\`echarts
这不是有效的JSON
\`\`\`
`

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Markdown 图表渲染测试</h1>
      <div className="prose prose-lg max-w-none">
        <MarkdownRenderer content={markdownContent} />
      </div>
    </div>
  )
}