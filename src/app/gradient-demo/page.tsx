'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GradientBorderCard, GRADIENT_PRESETS } from '@/components/ui/gradient-border-card';
import { AllTests } from '@/components/ui/gradient-border-card-manual-test';

export default function GradientDemoPage() {
  const [showTests, setShowTests] = useState(false);
  const [gradientFrom, setGradientFrom] = useState('#ff6ec7');
  const [gradientTo, setGradientTo] = useState('#4facfe');
  const [borderWidth, setBorderWidth] = useState(2);
  const [borderRadius, setBorderRadius] = useState('1rem');
  const [padding, setPadding] = useState('1.5rem');
  const [background, setBackground] = useState('white');
  const [shadow, setShadow] = useState(true);
  const [animated, setAnimated] = useState(false);

  if (showTests) {
    return <AllTests />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">渐变边框卡片组件演示</h1>
          <div className="flex space-x-2">
            <Link
              href="/test-summary"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              测试总结
            </Link>
            <button
              onClick={() => setShowTests(!showTests)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {showTests ? '返回演示' : '查看测试'}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 控制面板 */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">属性控制</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">渐变起始颜色</label>
                  <input
                    type="color"
                    value={gradientFrom}
                    onChange={(e) => setGradientFrom(e.target.value)}
                    className="w-full h-10 rounded border"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">渐变结束颜色</label>
                  <input
                    type="color"
                    value={gradientTo}
                    onChange={(e) => setGradientTo(e.target.value)}
                    className="w-full h-10 rounded border"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">边框宽度: {borderWidth}px</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={borderWidth}
                    onChange={(e) => setBorderWidth(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">圆角半径</label>
                  <select
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="0">无圆角</option>
                    <option value="0.5rem">小圆角</option>
                    <option value="1rem">中等圆角</option>
                    <option value="1.5rem">大圆角</option>
                    <option value="50%">圆形</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">内边距</label>
                  <select
                    value={padding}
                    onChange={(e) => setPadding(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="0.5rem">小</option>
                    <option value="1rem">中</option>
                    <option value="1.5rem">大</option>
                    <option value="2rem">特大</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">背景颜色</label>
                  <input
                    type="color"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="w-full h-10 rounded border"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={shadow}
                      onChange={(e) => setShadow(e.target.checked)}
                      className="mr-2"
                    />
                    阴影效果
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={animated}
                      onChange={(e) => setAnimated(e.target.checked)}
                      className="mr-2"
                    />
                    动画效果
                  </label>
                </div>
              </div>
            </div>
            
            {/* 预设主题 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">预设主题</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(GRADIENT_PRESETS).map(([name, preset]) => (
                  <button
                    key={name}
                    onClick={() => {
                      setGradientFrom(preset.from);
                      setGradientTo(preset.to);
                    }}
                    className="p-2 text-sm border rounded hover:bg-gray-50 capitalize"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* 预览区域 */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">实时预览</h2>
              
              <GradientBorderCard
                gradientFrom={gradientFrom}
                gradientTo={gradientTo}
                borderWidth={borderWidth}
                borderRadius={borderRadius}
                padding={padding}
                background={background}
                shadow={shadow}
                animated={animated}
                className="max-w-sm mx-auto"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Kiro 文档</h3>
                  <p className="text-gray-600 mb-4">
                    这是一个带有渐变边框效果的卡片组件示例。
                  </p>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    了解详情 →
                  </button>
                </div>
              </GradientBorderCard>
            </div>
            
            {/* 多个示例 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">更多示例</h3>
              <div className="grid grid-cols-1 gap-4">
                <GradientBorderCard
                  gradientFrom="#667eea"
                  gradientTo="#764ba2"
                  borderWidth={3}
                  animated
                >
                  <p className="text-center">海洋主题卡片</p>
                </GradientBorderCard>
                
                <GradientBorderCard
                  gradientFrom="#11998e"
                  gradientTo="#38ef7d"
                  borderRadius="0.5rem"
                  shadow={false}
                >
                  <p className="text-center">森林主题卡片（无阴影）</p>
                </GradientBorderCard>
                
                <GradientBorderCard
                  gradientFrom="#ff9a9e"
                  gradientTo="#fecfef"
                  borderWidth={1}
                  borderRadius="50%"
                  padding="2rem"
                  className="w-32 h-32 mx-auto"
                >
                  <div className="flex items-center justify-center h-full">
                    <span className="text-sm text-center">圆形卡片</span>
                  </div>
                </GradientBorderCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}