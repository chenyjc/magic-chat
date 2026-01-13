'use client';

import React, { useState } from 'react';
import { GradientBorderCard, SHADOW_PRESETS } from '@/components/ui/gradient-border-card';

export default function ShadowTestPage() {
  const [selectedShadow, setSelectedShadow] = useState<string | boolean>('large');
  const [customShadow, setCustomShadow] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">阴影效果配置测试</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 控制面板 */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">阴影控制</h2>
              
              <div className="space-y-4">
                {/* 预设阴影选择 */}
                <div>
                  <label className="block text-sm font-medium mb-2">预设阴影效果</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedShadow(false)}
                      className={`px-3 py-2 text-sm border rounded ${
                        selectedShadow === false 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      无阴影 (false)
                    </button>
                    
                    <button
                      onClick={() => setSelectedShadow('none')}
                      className={`px-3 py-2 text-sm border rounded ${
                        selectedShadow === 'none' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      无阴影 ('none')
                    </button>

                    {Object.keys(SHADOW_PRESETS).filter(key => key !== 'none').map((shadowKey) => (
                      <button
                        key={shadowKey}
                        onClick={() => setSelectedShadow(shadowKey)}
                        className={`px-3 py-2 text-sm border rounded ${
                          selectedShadow === shadowKey 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-white hover:bg-gray-50'
                        }`}
                      >
                        {shadowKey.replace('_', ' ')}
                      </button>
                    ))}

                    <button
                      onClick={() => setSelectedShadow(true)}
                      className={`px-3 py-2 text-sm border rounded ${
                        selectedShadow === true 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      默认 (true)
                    </button>
                  </div>
                </div>

                {/* 自定义阴影 */}
                <div>
                  <label className="block text-sm font-medium mb-2">自定义阴影</label>
                  <textarea
                    value={customShadow}
                    onChange={(e) => setCustomShadow(e.target.value)}
                    placeholder="例如: 0 4px 8px rgba(0, 0, 0, 0.1)"
                    className="w-full p-2 border rounded h-20 text-sm"
                  />
                  <button
                    onClick={() => setSelectedShadow(customShadow)}
                    className="mt-2 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                    disabled={!customShadow.trim()}
                  >
                    应用自定义阴影
                  </button>
                </div>

                {/* 当前阴影信息 */}
                <div className="p-3 bg-gray-50 rounded">
                  <h3 className="text-sm font-medium mb-1">当前阴影配置:</h3>
                  <code className="text-xs text-gray-600 break-all">
                    {typeof selectedShadow === 'boolean' 
                      ? `boolean: ${selectedShadow}` 
                      : `string: "${selectedShadow}"`
                    }
                  </code>
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
                    shadow={selectedShadow}
                    className="w-64"
                  >
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2">阴影测试</h3>
                      <p className="text-gray-600 mb-4">
                        当前阴影效果预览
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
                    <GradientBorderCard shadow={selectedShadow} className="h-20">
                      <div className="flex items-center justify-center h-full text-sm">
                        小卡片
                      </div>
                    </GradientBorderCard>

                    <GradientBorderCard shadow={selectedShadow} className="h-24">
                      <div className="flex items-center justify-center h-full text-sm">
                        中卡片
                      </div>
                    </GradientBorderCard>

                    <GradientBorderCard shadow={selectedShadow} className="h-28">
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

        {/* 所有阴影效果对比 */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">所有阴影效果对比</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 无阴影 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">无阴影 (false)</h3>
              <GradientBorderCard shadow={false}>
                <div className="text-center p-4">
                  <p className="text-sm">没有阴影效果</p>
                </div>
              </GradientBorderCard>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">无阴影 ('none')</h3>
              <GradientBorderCard shadow="none">
                <div className="text-center p-4">
                  <p className="text-sm">字符串方式无阴影</p>
                </div>
              </GradientBorderCard>
            </div>

            {/* 预设阴影 */}
            {Object.entries(SHADOW_PRESETS).filter(([key]) => key !== 'none').map(([key, value]) => (
              <div key={key} className="space-y-2">
                <h3 className="text-sm font-medium capitalize">
                  {key.replace('_', ' ')} 阴影
                </h3>
                <GradientBorderCard shadow={key as any}>
                  <div className="text-center p-4">
                    <p className="text-sm">{key.replace('_', ' ')} 效果</p>
                  </div>
                </GradientBorderCard>
              </div>
            ))}

            {/* 默认阴影 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">默认阴影 (true)</h3>
              <GradientBorderCard shadow={true}>
                <div className="text-center p-4">
                  <p className="text-sm">默认阴影效果</p>
                </div>
              </GradientBorderCard>
            </div>
          </div>
        </div>

        {/* 自定义阴影示例 */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">自定义阴影示例</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 彩色阴影 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">彩色阴影</h3>
              <GradientBorderCard shadow="0 8px 16px rgba(255, 110, 199, 0.3)">
                <div className="text-center p-4">
                  <p className="text-sm">粉色阴影</p>
                </div>
              </GradientBorderCard>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">蓝色阴影</h3>
              <GradientBorderCard shadow="0 8px 16px rgba(79, 172, 254, 0.3)">
                <div className="text-center p-4">
                  <p className="text-sm">蓝色阴影</p>
                </div>
              </GradientBorderCard>
            </div>

            {/* 多层阴影 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">多层阴影</h3>
              <GradientBorderCard shadow="0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1), 0 16px 32px rgba(0,0,0,0.1)">
                <div className="text-center p-4">
                  <p className="text-sm">三层阴影</p>
                </div>
              </GradientBorderCard>
            </div>

            {/* 内阴影效果 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">内阴影</h3>
              <GradientBorderCard shadow="inset 0 2px 4px rgba(0,0,0,0.1)">
                <div className="text-center p-4">
                  <p className="text-sm">内阴影效果</p>
                </div>
              </GradientBorderCard>
            </div>

            {/* 偏移阴影 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">偏移阴影</h3>
              <GradientBorderCard shadow="5px 5px 10px rgba(0,0,0,0.2)">
                <div className="text-center p-4">
                  <p className="text-sm">右下偏移</p>
                </div>
              </GradientBorderCard>
            </div>

            {/* 发光效果 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">发光效果</h3>
              <GradientBorderCard shadow="0 0 20px rgba(255, 110, 199, 0.5)">
                <div className="text-center p-4">
                  <p className="text-sm">发光效果</p>
                </div>
              </GradientBorderCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}