'use client';

import React, { useState } from 'react';
import { 
  GradientBorderCard, 
  GRADIENT_PRESETS, 
  BORDER_WIDTH_PRESETS, 
  BORDER_RADIUS_PRESETS 
} from '@/components/ui/gradient-border-card';

export default function ConfigTestPage() {
  const [borderWidth, setBorderWidth] = useState(2);
  const [borderRadius, setBorderRadius] = useState('1rem');
  const [gradientFrom, setGradientFrom] = useState('#ff6ec7');
  const [gradientTo, setGradientTo] = useState('#4facfe');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">边框宽度和圆角半径配置测试</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 控制面板 */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">配置控制</h2>
              
              <div className="space-y-4">
                {/* 边框宽度控制 */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    边框宽度: {borderWidth}px
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="20"
                    step="0.5"
                    value={borderWidth}
                    onChange={(e) => setBorderWidth(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex gap-2 mt-2">
                    {Object.entries(BORDER_WIDTH_PRESETS).map(([name, width]) => (
                      <button
                        key={name}
                        onClick={() => setBorderWidth(width)}
                        className={`px-2 py-1 text-xs border rounded ${
                          borderWidth === width 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-white hover:bg-gray-50'
                        }`}
                      >
                        {name.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 圆角半径控制 */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    圆角半径: {borderRadius}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(BORDER_RADIUS_PRESETS).map(([name, radius]) => (
                      <button
                        key={name}
                        onClick={() => setBorderRadius(radius)}
                        className={`px-3 py-2 text-sm border rounded ${
                          borderRadius === radius 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-white hover:bg-gray-50'
                        }`}
                      >
                        {name.replace('_', ' ')} ({radius})
                      </button>
                    ))}
                  </div>
                </div>

                {/* 自定义圆角输入 */}
                <div>
                  <label className="block text-sm font-medium mb-2">自定义圆角</label>
                  <input
                    type="text"
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(e.target.value)}
                    placeholder="例如: 1rem, 20px, 50%"
                    className="w-full p-2 border rounded"
                  />
                </div>

                {/* 渐变颜色控制 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">起始颜色</label>
                    <input
                      type="color"
                      value={gradientFrom}
                      onChange={(e) => setGradientFrom(e.target.value)}
                      className="w-full h-10 rounded border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">结束颜色</label>
                    <input
                      type="color"
                      value={gradientTo}
                      onChange={(e) => setGradientTo(e.target.value)}
                      className="w-full h-10 rounded border"
                    />
                  </div>
                </div>

                {/* 预设主题 */}
                <div>
                  <label className="block text-sm font-medium mb-2">预设主题</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(GRADIENT_PRESETS).map(([name, preset]) => (
                      <button
                        key={name}
                        onClick={() => {
                          setGradientFrom(preset.from);
                          setGradientTo(preset.to);
                        }}
                        className="px-3 py-2 text-sm border rounded hover:bg-gray-50 capitalize"
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 预览区域 */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">实时预览</h2>
              
              <div className="space-y-4">
                {/* 主预览 */}
                <GradientBorderCard
                  gradientFrom={gradientFrom}
                  gradientTo={gradientTo}
                  borderWidth={borderWidth}
                  borderRadius={borderRadius}
                  className="max-w-sm mx-auto"
                >
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">配置测试</h3>
                    <p className="text-gray-600 mb-2">
                      边框: {borderWidth}px
                    </p>
                    <p className="text-gray-600 mb-4">
                      圆角: {borderRadius}
                    </p>
                    <div className="px-4 py-2 bg-blue-500 text-white rounded inline-block">
                      测试按钮
                    </div>
                  </div>
                </GradientBorderCard>

                {/* 不同尺寸预览 */}
                <div className="grid grid-cols-3 gap-4">
                  <GradientBorderCard
                    gradientFrom={gradientFrom}
                    gradientTo={gradientTo}
                    borderWidth={borderWidth}
                    borderRadius={borderRadius}
                    className="h-20"
                  >
                    <div className="flex items-center justify-center h-full text-sm">
                      小尺寸
                    </div>
                  </GradientBorderCard>

                  <GradientBorderCard
                    gradientFrom={gradientFrom}
                    gradientTo={gradientTo}
                    borderWidth={borderWidth}
                    borderRadius={borderRadius}
                    className="h-24"
                  >
                    <div className="flex items-center justify-center h-full text-sm">
                      中尺寸
                    </div>
                  </GradientBorderCard>

                  <GradientBorderCard
                    gradientFrom={gradientFrom}
                    gradientTo={gradientTo}
                    borderWidth={borderWidth}
                    borderRadius={borderRadius}
                    className="h-28"
                  >
                    <div className="flex items-center justify-center h-full text-sm">
                      大尺寸
                    </div>
                  </GradientBorderCard>
                </div>
              </div>
            </div>

            {/* 极端情况测试 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">极端情况测试</h3>
              <div className="space-y-4">
                {/* 超厚边框 */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">超厚边框 (15px)</p>
                  <GradientBorderCard
                    gradientFrom={gradientFrom}
                    gradientTo={gradientTo}
                    borderWidth={15}
                    borderRadius={borderRadius}
                    className="h-20"
                  >
                    <div className="flex items-center justify-center h-full text-sm">
                      超厚边框测试
                    </div>
                  </GradientBorderCard>
                </div>

                {/* 超细边框 */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">超细边框 (0.5px)</p>
                  <GradientBorderCard
                    gradientFrom={gradientFrom}
                    gradientTo={gradientTo}
                    borderWidth={0.5}
                    borderRadius={borderRadius}
                    className="h-20"
                  >
                    <div className="flex items-center justify-center h-full text-sm">
                      超细边框测试
                    </div>
                  </GradientBorderCard>
                </div>

                {/* 无效值测试 */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">无效值测试 (负数边框，无效圆角)</p>
                  <GradientBorderCard
                    gradientFrom="invalid-color"
                    gradientTo="another-invalid"
                    borderWidth={-5}
                    borderRadius="invalid-radius"
                    className="h-20"
                  >
                    <div className="flex items-center justify-center h-full text-sm">
                      应该回退到默认值
                    </div>
                  </GradientBorderCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}