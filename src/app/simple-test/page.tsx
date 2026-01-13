'use client';

import React from 'react';
import { GradientBorderCard } from '@/components/ui/gradient-border-card';

export default function SimpleTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">简化圆角测试</h1>
        
        {/* 原始问题重现 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">原始问题测试</h2>
          <GradientBorderCard
            borderWidth={2}
            borderRadius="1rem"
            className="max-w-md mx-auto"
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

        {/* 不同边框宽度测试 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">不同边框宽度</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GradientBorderCard borderWidth={1} borderRadius="1rem">
              <div className="text-center p-4">
                <p>1px 边框</p>
              </div>
            </GradientBorderCard>
            <GradientBorderCard borderWidth={5} borderRadius="1rem">
              <div className="text-center p-4">
                <p>5px 边框</p>
              </div>
            </GradientBorderCard>
            <GradientBorderCard borderWidth={10} borderRadius="1rem">
              <div className="text-center p-4">
                <p>10px 边框</p>
              </div>
            </GradientBorderCard>
          </div>
        </div>

        {/* 圆形测试 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">圆形测试</h2>
          <div className="flex justify-center">
            <GradientBorderCard 
              borderWidth={5} 
              borderRadius="50%" 
              className="w-32 h-32"
            >
              <div className="flex items-center justify-center h-full">
                <span className="text-sm text-center">圆形卡片</span>
              </div>
            </GradientBorderCard>
          </div>
        </div>

        {/* 极端情况测试 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">极端情况</h2>
          <GradientBorderCard borderWidth={20} borderRadius="1rem">
            <div className="text-center p-4">
              <p>20px 超厚边框，1rem 圆角</p>
              <p className="text-sm text-gray-600">内部应该仍然保持圆角</p>
            </div>
          </GradientBorderCard>
        </div>
      </div>
    </div>
  );
}