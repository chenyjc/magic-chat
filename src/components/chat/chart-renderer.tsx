"use client"

import * as echarts from 'echarts/core'
import { GraphicComponentOption } from 'echarts/components'
import ReactECharts from "echarts-for-react"
import { Download, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChartRendererProps {
  chartData: any
}

export function ChartRenderer({ chartData }: ChartRendererProps) {
  const getChartOption = () => {
    // 如果传入的是完整的 ECharts option，直接使用
    if (chartData && typeof chartData === 'object') {
      // 检查是否是完整的 ECharts option（包含 xAxis/yAxis 或 series）
      if ((chartData.xAxis && chartData.yAxis) || chartData.series) {
        return {
          ...chartData,
          backgroundColor: 'transparent', // 确保背景透明
        }
      }
    }

    // 否则使用默认的图表模板
    const baseOption = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#333',
        textStyle: {
          color: '#fff',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
    }

    switch (chartData.type) {
      case 'line':
        return {
          ...baseOption,
          xAxis: {
            type: 'category',
            data: chartData.labels,
            axisLine: { lineStyle: { color: '#666' } },
            axisLabel: { color: '#666' },
          },
          yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#666' } },
            axisLabel: { color: '#666' },
            splitLine: { lineStyle: { color: '#e5e7eb' } },
          },
          series: [
            {
              data: chartData.data,
              type: 'line',
              smooth: true,
              lineStyle: {
                width: 3,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: '#3b82f6' },
                  { offset: 1, color: '#8b5cf6' },
                ]),
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
                  { offset: 1, color: 'rgba(139, 92, 246, 0.1)' },
                ]),
              },
            },
          ],
        }

      case 'bar':
        return {
          ...baseOption,
          xAxis: {
            type: 'category',
            data: chartData.labels,
            axisLine: { lineStyle: { color: '#666' } },
            axisLabel: { color: '#666' },
          },
          yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#666' } },
            axisLabel: { color: '#666' },
            splitLine: { lineStyle: { color: '#e5e7eb' } },
          },
          series: [
            {
              data: chartData.data,
              type: 'bar',
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#3b82f6' },
                  { offset: 1, color: '#8b5cf6' },
                ]),
                borderRadius: [4, 4, 0, 0],
              },
            },
          ],
        }

      case 'pie':
        return {
          ...baseOption,
          tooltip: {
            trigger: 'item',
          },
          series: [
            {
              name: chartData.name || '数据',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
              },
              label: {
                show: true,
                formatter: '{b}: {d}%',
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 16,
                  fontWeight: 'bold',
                },
              },
              data: chartData.data,
            },
          ],
        }

      case 'scatter':
        return {
          ...baseOption,
          xAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#666' } },
            axisLabel: { color: '#666' },
            splitLine: { lineStyle: { color: '#e5e7eb' } },
          },
          yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#666' } },
            axisLabel: { color: '#666' },
            splitLine: { lineStyle: { color: '#e5e7eb' } },
          },
          series: [
            {
              data: chartData.data,
              type: 'scatter',
              symbolSize: 8,
              itemStyle: {
                color: '#3b82f6',
              },
            },
          ],
        }

      default:
        return baseOption
    }
  }

  return (
    <div className="my-4 rounded-xl border bg-card p-4 shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-foreground">
          {chartData.title || '数据图表'}
        </h3>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon-sm">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon-sm">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="h-80">
        <ReactECharts
          option={getChartOption()}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </div>
      {chartData.description && (
        <p className="mt-3 text-sm text-muted-foreground">
          {chartData.description}
        </p>
      )}
    </div>
  )
}
