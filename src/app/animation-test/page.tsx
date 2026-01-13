'use client';

import React, { useState } from 'react';
import { GradientBorderCard, ANIMATION_PRESETS } from '@/components/ui/gradient-border-card';

export default function AnimationTestPage() {
  const [selectedAnimation, setSelectedAnimation] = useState<string | boolean>('scale');
  const [customAnimation, setCustomAnimation] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">动画和悬停效果测试</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 控制面板 */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">动画控制</h2>
              
              <div className="space-y-4">
                {/* 预设动画选择 */}
                <div>
                  <label className="block text-sm font-medium mb-2">预设动画效果</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedAnimation(false)}
                      className={`px-3 py-2 text-sm border rounded ${
                        selectedAnimation === false 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      无动画 (false)
                    </button>
                    
                    <button
                      onClick={() => setSelectedAnimation('none')}
                      className={`px-3 py-2 text-sm border rounded ${
                        selectedAnimation === 'none' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      无动画 ('none')
                    </button>

                    {Object.keys(ANIMATION_PRESETS).filter(key => key !== 'none').map((animationKey) => (
                      <button
                        key={animationKey}
                        onClick={() => setSelectedAnimation(animationKey)}
                        className={`px-3 py-2 text-sm border rounded ${
                          selectedAnimation === animationKey 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-white hover:bg-gray-50'
                        }`}
                      >
                        {animationKey}
                      </button>
                    ))}

                    <button
                      onClick={() => setSelectedAnimation(true)}
                      className={`px-3 py-2 text-sm border rounded ${
                        selectedAnimation === true 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      默认 (true)
                    </button>
                  </div>
                </div>

                {/* 自定义动画 */}
                <div>
                  <label className="block text-sm font-medium mb-2">自定义动画类名</label>
                  <textarea
                    value={customAnimation}
                    onChange={(e) => setCustomAnimation(e.target.value)}
                    placeholder="例如: transition-all duration-500 hover:rotate-12 hover:scale-110"
                    className="w-full p-2 border rounded h-20 text-sm"
                  />
                  <button
                    onClick={() => setSelectedAnimation(customAnimation)}
                    className="mt-2 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                    disabled={!customAnimation.trim()}
                  >
                    应用自定义动画
                  </button>
                </div>

                {/* 当前动画信息 */}
                <div className="p-3 bg-gray-50 rounded">
                  <h3 className="text-sm font-medium mb-1">当前动画配置:</h3>
                  <code className="text-xs text-gray-600 break-all">
                    {typeof selectedAnimation === 'boolean' 
                      ? `boolean: ${selectedAnimation}` 
                      : `string: "${selectedAnimation}"`
                    }
                  </code>
                </div>

                {/* 使用说明 */}
                <div className="p-3 bg-blue-50 rounded">
                  <h3 className="text-sm font-medium mb-1">使用说明:</h3>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• 将鼠标悬停在卡片上查看动画效果</li>
                    <li>• scale: 悬停时放大</li>
                    <li>• lift: 悬停时上升并增加阴影</li>
                    <li>• glow: 悬停时发光效果</li>
                    <li>• rotate: 悬停时轻微旋转</li>
                    <li>• pulse: 悬停时脉冲效果</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 预览区域 */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">实时预览</h2>
              
              <div className="space-y-6">
                {/* 主预览 */}
                <div className="flex justify-center">
                  <GradientBorderCard
                    animated={selectedAnimation}
                    className="w-64"
                  >
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2">动画测试</h3>
                      <p className="text-gray-600 mb-4">
                        悬停查看动画效果
                      </p>
                      <div className="px-4 py-2 bg-blue-500 text-white rounded inline-block">
                        测试按钮
                      </div>
                    </div>
                  </GradientBorderCard>
                </div>

                {/* 不同尺寸对比 */}
                <div>
                  <h3 className="text-lg font-medium mb-3">不同尺寸对比</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <GradientBorderCard animated={selectedAnimation} className="h-20">
                      <div className="flex items-center justify-center h-full text-sm">
                        小卡片
                      </div>
                    </GradientBorderCard>

                    <GradientBorderCard animated={selectedAnimation} className="h-24">
                      <div className="flex items-center justify-center h-full text-sm">
                        中卡片
                      </div>
                    </GradientBorderCard>

                    <GradientBorderCard animated={selectedAnimation} className="h-28">
                      <div className="flex items-center justify-center h-full text-sm">
                        大卡片
                      </div>
                    </GradientBorderCard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 所有动画效果对比 */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">所有动画效果对比</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 无动画 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">无动画 (false)</h3>
              <GradientBorderCard animated={false}>
                <div className="text-center p-4">
                  <p className="text-sm">没有动画效果</p>
                </div>
              </GradientBorderCard>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">无动画 ('none')</h3>
              <GradientBorderCard animated="none">
                <div className="text-center p-4">
                  <p className="text-sm">字符串方式无动画</p>
                </div>
              </GradientBorderCard>
            </div>

            {/* 预设动画 */}
            {Object.entries(ANIMATION_PRESETS).filter(([key]) => key !== 'none').map(([key, value]) => (
              <div key={key} className="space-y-2">
                <h3 className="text-sm font-medium capitalize">
                  {key} 动画
                </h3>
                <GradientBorderCard animated={key as any}>
                  <div className="text-center p-4">
                    <p className="text-sm">悬停查看 {key} 效果</p>
                  </div>
                </GradientBorderCard>
              </div>
            ))}

            {/* 默认动画 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">默认动画 (true)</h3>
              <GradientBorderCard animated={true}>
                <div className="text-center p-4">
                  <p className="text-sm">默认缩放效果</p>
                </div>
              </GradientBorderCard>
            </div>
          </div>
        </div>

        {/* 组合效果测试 */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">组合效果测试</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 动画 + 大阴影 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Scale + 大阴影</h3>
              <GradientBorderCard animated="scale" shadow="extra_large">
                <div className="text-center p-4">
                  <p className="text-sm">缩放 + 大阴影</p>
                </div>
              </GradientBorderCard>
            </div>

            {/* 动画 + 圆形 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Lift + 圆形</h3>
              <GradientBorderCard 
                animated="lift" 
                borderRadius="50%" 
                className="w-24 h-24 mx-auto"
              >
                <div className="flex items-center justify-center h-full text-sm">
                  圆形上升
                </div>
              </GradientBorderCard>
            </div>

            {/* 动画 + 厚边框 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Glow + 厚边框</h3>
              <GradientBorderCard animated="glow" borderWidth={5}>
                <div className="text-center p-4">
                  <p className="text-sm">发光 + 厚边框</p>
                </div>
              </GradientBorderCard>
            </div>

            {/* 动画 + 渐变主题 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Rotate + Ocean主题</h3>
              <GradientBorderCard 
                animated="rotate" 
                gradientFrom="#667eea" 
                gradientTo="#764ba2"
              >
                <div className="text-center p-4">
                  <p className="text-sm">旋转 + 海洋主题</p>
                </div>
              </GradientBorderCard>
            </div>

            {/* 动画 + 无阴影 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Pulse + 无阴影</h3>
              <GradientBorderCard animated="pulse" shadow={false}>
                <div className="text-center p-4">
                  <p className="text-sm">脉冲 + 无阴影</p>
                </div>
              </GradientBorderCard>
            </div>

            {/* 自定义组合 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">自定义组合</h3>
              <GradientBorderCard 
                animated="transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-2xl"
                gradientFrom="#ff9a9e" 
                gradientTo="#fecfef"
              >
                <div className="text-center p-4">
                  <p className="text-sm">复合动画效果</p>
                </div>
              </GradientBorderCard>
            </div>
          </div>
        </div>

        {/* 性能测试 */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">性能测试 - 多个动画卡片</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }, (_, index) => {
              const animations = Object.keys(ANIMATION_PRESETS).filter(key => key !== 'none');
              const animation = animations[index % animations.length];
              
              return (
                <GradientBorderCard
                  key={index}
                  animated={animation as any}
                  className="h-16"
                >
                  <div className="flex items-center justify-center h-full text-xs">
                    卡片 {index + 1}
                  </div>
                </GradientBorderCard>
              );
            })}
          </div>
          
          <p className="text-sm text-gray-600 mt-4">
            测试多个动画卡片的性能表现，确保流畅的动画效果。
          </p>
        </div>
      </div>
    </div>
  );
}