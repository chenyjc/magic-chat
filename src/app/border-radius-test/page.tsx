'use client';

import React from 'react';
import { GradientBorderCard } from '@/components/ui/gradient-border-card';

export default function BorderRadiusTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">圆角边框修复测试</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 测试1: 正常情况 - 边框宽度小于圆角 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">正常情况</h3>
            <p className="text-sm text-gray-600">边框2px，圆角16px (1rem)</p>
            <GradientBorderCard
              borderWidth={2}
              borderRadius="1rem"
              className="h-32"
            >
              <div className="flex items-center justify-center h-full">
                <span>正常圆角</span>
              </div>
            </GradientBorderCard>
          </div>

          {/* 测试2: 边界情况 - 边框宽度接近圆角 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">边界情况</h3>
            <p className="text-sm text-gray-600">边框8px，圆角16px (1rem)</p>
            <GradientBorderCard
              borderWidth={8}
              borderRadius="1rem"
              className="h-32"
            >
              <div className="flex items-center justify-center h-full">
                <span>边界圆角</span>
              </div>
            </GradientBorderCard>
          </div>

          {/* 测试3: 极端情况 - 边框宽度大于圆角 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">极端情况</h3>
            <p className="text-sm text-gray-600">边框20px，圆角16px (1rem)</p>
            <GradientBorderCard
              borderWidth={20}
              borderRadius="1rem"
              className="h-32"
            >
              <div className="flex items-center justify-center h-full">
                <span>极端圆角</span>
              </div>
            </GradientBorderCard>
          </div>

          {/* 测试4: 小圆角 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">小圆角</h3>
            <p className="text-sm text-gray-600">边框3px，圆角8px (0.5rem)</p>
            <GradientBorderCard
              borderWidth={3}
              borderRadius="0.5rem"
              className="h-32"
            >
              <div className="flex items-center justify-center h-full">
                <span>小圆角</span>
              </div>
            </GradientBorderCard>
          </div>

          {/* 测试5: 大圆角 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">大圆角</h3>
            <p className="text-sm text-gray-600">边框4px，圆角32px (2rem)</p>
            <GradientBorderCard
              borderWidth={4}
              borderRadius="2rem"
              className="h-32"
            >
              <div className="flex items-center justify-center h-full">
                <span>大圆角</span>
              </div>
            </GradientBorderCard>
          </div>

          {/* 测试6: 圆形 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">圆形</h3>
            <p className="text-sm text-gray-600">边框5px，圆角50%</p>
            <GradientBorderCard
              borderWidth={5}
              borderRadius="50%"
              className="w-32 h-32 mx-auto"
            >
              <div className="flex items-center justify-center h-full">
                <span className="text-sm text-center">圆形</span>
              </div>
            </GradientBorderCard>
          </div>

          {/* 测试7: 像素单位 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">像素单位</h3>
            <p className="text-sm text-gray-600">边框6px，圆角20px</p>
            <GradientBorderCard
              borderWidth={6}
              borderRadius="20px"
              className="h-32"
            >
              <div className="flex items-center justify-center h-full">
                <span>像素圆角</span>
              </div>
            </GradientBorderCard>
          </div>

          {/* 测试8: 零圆角 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">零圆角</h3>
            <p className="text-sm text-gray-600">边框3px，圆角0</p>
            <GradientBorderCard
              borderWidth={3}
              borderRadius="0"
              className="h-32"
            >
              <div className="flex items-center justify-center h-full">
                <span>方形</span>
              </div>
            </GradientBorderCard>
          </div>

          {/* 测试9: 非常厚的边框 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">厚边框</h3>
            <p className="text-sm text-gray-600">边框15px，圆角24px (1.5rem)</p>
            <GradientBorderCard
              borderWidth={15}
              borderRadius="1.5rem"
              className="h-32"
            >
              <div className="flex items-center justify-center h-full">
                <span>厚边框</span>
              </div>
            </GradientBorderCard>
          </div>
        </div>

        <div className="mt-8 p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">测试说明</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>所有卡片的内部白色区域都应该保持与外边框相同的圆角形状</li>
            <li>即使边框很厚，内部也不应该变成方形</li>
            <li>圆形卡片（50%圆角）应该保持完美的圆形</li>
            <li>当边框宽度大于圆角半径时，内部应该保持最小的圆角效果</li>
          </ul>
        </div>
      </div>
    </div>
  );
}