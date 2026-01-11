"use client"

import { ChartRenderer } from "@/components/chat/chart-renderer"

export default function TestPage() {
  const testData = [
    {
      type: "line",
      title: {
        text: "月度销售趋势分析",
        left: "center"
      },
      description: "测试title对象",
      labels: ["一月", "二月", "三月", "四月", "五月"],
      data: [10, 20, 15, 25, 30]
    },
    {
      type: "bar",
      title: "柱状图测试",
      description: "测试柱状图渲染",
      labels: ["产品A", "产品B", "产品C", "产品D"],
      data: [120, 200, 150, 80]
    },
    {
      type: "pie",
      title: "饼图测试",
      description: "测试饼图渲染",
      data: [
        { name: "分类A", value: 335 },
        { name: "分类B", value: 310 },
        { name: "分类C", value: 234 },
        { name: "分类D", value: 135 }
      ]
    },
    {
      type: "scatter",
      title: "散点图测试",
      description: "测试散点图渲染",
      data: [[10, 20], [15, 25], [20, 30], [25, 35], [30, 40]]
    },
    {
      type: "area",
      title: "面积图测试",
      description: "测试面积图渲染",
      labels: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      type: "histogram",
      title: "直方图测试",
      description: "测试直方图渲染",
      data: [12, 23, 45, 56, 34, 67, 43, 78, 32, 54, 65, 43]
    },
    {
      type: "radar",
      title: "雷达图测试",
      description: "测试雷达图渲染",
      indicator: [
        { name: '销售', max: 100 },
        { name: '管理', max: 100 },
        { name: '技术', max: 100 },
        { name: '客服', max: 100 },
        { name: '研发', max: 100 },
        { name: '市场', max: 100 }
      ],
      data: [85, 75, 90, 80, 95, 70]
    },
    {
      type: "funnel",
      title: "漏斗图测试",
      description: "测试漏斗图渲染",
      data: [
        { name: '访问', value: 100 },
        { name: '咨询', value: 80 },
        { name: '报价', value: 60 },
        { name: '谈判', value: 40 },
        { name: '成交', value: 20 }
      ]
    }
  ]

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold mb-4">图表渲染测试</h1>
      {testData.map((data, index) => (
        <div key={index} className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">{data.title}</h2>
          <ChartRenderer chartData={data} />
        </div>
      ))}
    </div>
  )
}