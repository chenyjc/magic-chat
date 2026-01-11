"use client"

import { useState, useRef, useEffect } from "react"
import { EChart } from "@kbox-labs/react-echarts"
import { Download, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChartRendererProps {
  chartData: any
}

export function ChartRenderer({ chartData }: ChartRendererProps) {
  const [renderError, setRenderError] = useState(false)
  const echartsRef = useRef<any>(null)
  
  // 获取 echarts 实例的函数
  const getEchartsInstance = () => {
    return echartsRef.current?.echartsInstance
  }

  // 导出图表为图片
  const handleExport = () => {
    const echartsInstance = getEchartsInstance()
    if (echartsInstance) {
      try {
        const dataURL = echartsInstance.getDataURL({
          type: 'png',
          pixelRatio: 2,
          backgroundColor: '#ffffff'
        })
        
        // 创建下载链接
        const link = document.createElement('a')
        link.download = `${safeChartData.title || 'chart'}.png`
        link.href = dataURL
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (error) {
        console.error('导出图表失败:', error)
      }
    }
  }

  // 切换全屏
  const handleFullscreen = () => {
    const echartsInstance = getEchartsInstance()
    if (echartsInstance) {
      try {
        if (document.fullscreenElement) {
          document.exitFullscreen()
        } else {
          const chartDom = echartsInstance.getDom()
          if (chartDom.requestFullscreen) {
            chartDom.requestFullscreen()
          }
        }
      } catch (error) {
        console.error('全屏切换失败:', error)
      }
    }
  }
  
  // 验证 chartData 是否是有效的对象
  if (!chartData || typeof chartData !== 'object' || Array.isArray(chartData)) {
    return (
      <div className="my-4 rounded-xl border bg-card p-4 shadow-md">
        <div className="text-sm text-muted-foreground">
          无效的图表数据格式
        </div>
        <pre className="text-xs font-mono mt-2 whitespace-pre-wrap break-all">
          {JSON.stringify(chartData, null, 2)}
        </pre>
      </div>
    )
  }
  
  // 确保 chartData 的属性是正确的类型
  const safeChartData = {
    ...chartData,
    title: typeof chartData.title === 'string' ? chartData.title : (chartData.title && typeof chartData.title === 'object' ? chartData.title : undefined),
    description: typeof chartData.description === 'string' ? chartData.description : (chartData.description && typeof chartData.description === 'string' ? chartData.description : ''),
  }

  const getChartProps = () => {
    try {
      // 确保数据有效
      if (!safeChartData || typeof safeChartData !== 'object') {
        return {
          backgroundColor: 'transparent',
        }
      }

      // 如果传入的是完整的 ECharts option，直接返回清理后的配置
      if (safeChartData.series || (safeChartData.xAxis && safeChartData.yAxis)) {
        // 清理可能导致问题的属性
        const cleanedOption = { ...safeChartData }
        
        // 确保 series 是数组
        if (cleanedOption.series && !Array.isArray(cleanedOption.series)) {
          delete cleanedOption.series
        }
        
        // 确保 axis 配置正确
        if (cleanedOption.xAxis && typeof cleanedOption.xAxis !== 'object') {
          delete cleanedOption.xAxis
        }
        if (cleanedOption.yAxis && typeof cleanedOption.yAxis !== 'object') {
          delete cleanedOption.yAxis
        }
        
        return {
          ...cleanedOption,
          backgroundColor: 'transparent', // 确保背景透明
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

      switch (safeChartData.type) {
        case 'line':
          if (!Array.isArray(safeChartData.data) || !Array.isArray(safeChartData.labels)) {
            return baseOption
          }
          return {
            ...baseOption,
            xAxis: {
              type: 'category',
              data: safeChartData.labels,
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
                data: safeChartData.data,
                type: 'line',
                smooth: true,
                lineStyle: {
                  width: 3,
                  color: '#3b82f6',
                },
                areaStyle: {
                  color: 'rgba(59, 130, 246, 0.1)',
                },
              },
            ],
          }

        case 'area':
          if (!Array.isArray(safeChartData.data) || !Array.isArray(safeChartData.labels)) {
            return baseOption
          }
          return {
            ...baseOption,
            xAxis: {
              type: 'category',
              data: safeChartData.labels,
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
                data: safeChartData.data,
                type: 'line',
                smooth: true,
                lineStyle: {
                  width: 2,
                  color: '#10b981',
                },
                areaStyle: {
                  color: 'rgba(16, 185, 129, 0.3)',
                },
                symbol: 'none',
              },
            ],
          }

        case 'bar':
          if (!Array.isArray(safeChartData.data) || !Array.isArray(safeChartData.labels)) {
            return baseOption
          }
          return {
            ...baseOption,
            xAxis: {
              type: 'category',
              data: safeChartData.labels,
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
                data: safeChartData.data,
                type: 'bar',
                itemStyle: {
                  color: '#3b82f6',
                  borderRadius: [4, 4, 0, 0],
                },
              },
            ],
          }

        case 'histogram':
          if (!Array.isArray(safeChartData.data)) {
            return baseOption
          }
          return {
            ...baseOption,
            xAxis: {
              type: 'category',
              data: safeChartData.labels || safeChartData.data.map((_: any, i: number) => `区间${i + 1}`),
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
                data: safeChartData.data,
                type: 'bar',
                barWidth: '80%',
                itemStyle: {
                  color: '#f59e0b',
                  borderRadius: [2, 2, 0, 0],
                },
              },
            ],
          }

        case 'pie':
          if (!Array.isArray(safeChartData.data)) {
            return baseOption
          }
          return {
            ...baseOption,
            tooltip: {
              trigger: 'item',
            },
            series: [
              {
                name: safeChartData.name || '数据',
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
                data: safeChartData.data,
              },
            ],
          }

        case 'scatter':
          if (!Array.isArray(safeChartData.data)) {
            return baseOption
          }
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
                data: safeChartData.data,
                type: 'scatter',
                symbolSize: 8,
                itemStyle: {
                  color: '#3b82f6',
                },
              },
            ],
          }

        case 'radar':
          if (!Array.isArray(safeChartData.data)) {
            return baseOption
          }
          return {
            ...baseOption,
            radar: {
              indicator: safeChartData.indicator || safeChartData.data.map((_: any, i: number) => ({ name: `指标${i + 1}`, max: 100 })),
              shape: 'polygon',
              splitNumber: 4,
              axisLine: { lineStyle: { color: '#ddd' } },
              splitLine: { lineStyle: { color: '#ddd' } },
              splitArea: { areaStyle: { color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'] } },
            },
            series: [
              {
                type: 'radar',
                data: [
                  {
                    value: safeChartData.data,
                    name: safeChartData.name || '数据',
                    areaStyle: {
                      color: 'rgba(59, 130, 246, 0.3)',
                    },
                    lineStyle: {
                      color: '#3b82f6',
                      width: 2,
                    },
                  },
                ],
              },
            ],
          }

        case 'funnel':
          if (!Array.isArray(safeChartData.data)) {
            return baseOption
          }
          return {
            ...baseOption,
            series: [
              {
                name: safeChartData.name || '漏斗',
                type: 'funnel',
                left: '10%',
                top: 60,
                bottom: 60,
                width: '80%',
                min: 0,
                max: Math.max(...safeChartData.data.map((item: any) => typeof item === 'object' ? item.value : item)),
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: {
                  show: true,
                  position: 'inside',
                },
                labelLine: {
                  length: 10,
                  lineStyle: {
                    width: 1,
                    type: 'solid',
                  },
                },
                itemStyle: {
                  borderColor: '#fff',
                  borderWidth: 1,
                },
                emphasis: {
                  label: {
                    fontSize: 20,
                  },
                },
                data: safeChartData.data,
              },
            ],
          }

        default:
          return baseOption
      }
    } catch (error) {
      console.error('图表配置生成失败:', error)
      return {
        backgroundColor: 'transparent',
        title: {
          text: '图表配置错误',
          left: 'center',
          top: 'middle',
          textStyle: {
            color: '#666',
            fontSize: 14,
          },
        },
      }
    }
  }

  return (
    <div className="my-4 rounded-xl border bg-card p-4 shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-foreground">
          {typeof safeChartData.title === 'string' ? safeChartData.title : 
           (safeChartData.title && typeof safeChartData.title === 'object' && safeChartData.title.text) ? safeChartData.title.text :
           '数据图表'}
        </h3>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon-sm" onClick={handleExport} title="导出为PNG">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={handleFullscreen} title="全屏显示">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {renderError ? (
        <div className="h-80 overflow-auto rounded-lg bg-muted/50 p-4">
          <div className="mb-2 text-sm text-muted-foreground">
            图表渲染失败，以下是原始数据：
          </div>
          <pre className="text-xs font-mono whitespace-pre-wrap break-all">
            {JSON.stringify(chartData, null, 2)}
          </pre>
        </div>
      ) : (
        <div className="h-80">
          {(() => {
            try {
              const chartProps = getChartProps()
              return (
                <EChart
                  ref={echartsRef}
                  style={{ height: '100%', width: '100%' }}
                  {...chartProps}
                />
              )
            } catch (error) {
              console.error('图表组件渲染失败:', error)
              setRenderError(true)
              return (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  图表渲染出错
                </div>
              )
            }
          })()}
        </div>
      )}
      
      {safeChartData.description && typeof safeChartData.description === 'string' && (
        <p className="mt-3 text-sm text-muted-foreground">
          {safeChartData.description}
        </p>
      )}
    </div>
  )
}
