'use client';

import React, { useState } from 'react';
import { GradientBorderCard, PADDING_PRESETS } from '@/components/ui/gradient-border-card';

export default function ChildrenTestPage() {
  const [padding, setPadding] = useState('1.5rem');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Children内容渲染测试</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 控制面板 */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">内边距控制</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    当前内边距: {padding}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(PADDING_PRESETS).map(([name, value]) => (
                      <button
                        key={name}
                        onClick={() => setPadding(value)}
                        className={`px-3 py-2 text-sm border rounded ${
                          padding === value 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-white hover:bg-gray-50'
                        }`}
                      >
                        {name.replace('_', ' ')} ({value})
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">自定义内边距</label>
                  <input
                    type="text"
                    value={padding}
                    onChange={(e) => setPadding(e.target.value)}
                    placeholder="例如: 1rem, 20px, 2em"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 测试区域 */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">内容渲染测试</h2>
              
              <div className="space-y-4">
                {/* 基本文本内容 */}
                <div>
                  <h3 className="text-lg font-medium mb-2">基本文本</h3>
                  <GradientBorderCard padding={padding}>
                    <p>这是一段基本的文本内容，用于测试内边距效果。</p>
                  </GradientBorderCard>
                </div>

                {/* 复杂HTML内容 */}
                <div>
                  <h3 className="text-lg font-medium mb-2">复杂HTML内容</h3>
                  <GradientBorderCard padding={padding}>
                    <div>
                      <h4 className="text-lg font-bold mb-2">标题内容</h4>
                      <p className="text-gray-600 mb-3">
                        这是一个包含多种HTML元素的复杂内容示例。
                      </p>
                      <ul className="list-disc list-inside mb-3">
                        <li>列表项目 1</li>
                        <li>列表项目 2</li>
                        <li>列表项目 3</li>
                      </ul>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                          按钮 1
                        </button>
                        <button className="px-3 py-1 bg-green-500 text-white rounded text-sm">
                          按钮 2
                        </button>
                      </div>
                    </div>
                  </GradientBorderCard>
                </div>

                {/* React组件内容 */}
                <div>
                  <h3 className="text-lg font-medium mb-2">React组件内容</h3>
                  <GradientBorderCard padding={padding}>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-3"></div>
                      <h4 className="text-xl font-bold mb-2">用户卡片</h4>
                      <p className="text-gray-600 mb-3">这是一个用户信息卡片示例</p>
                      <div className="flex justify-center gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          标签1
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          标签2
                        </span>
                      </div>
                    </div>
                  </GradientBorderCard>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 特殊情况测试 */}
        <div className="mt-8 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">特殊情况测试</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 空内容 */}
              <div>
                <h3 className="text-sm font-medium mb-2">空内容 (null)</h3>
                <GradientBorderCard padding={padding}>
                  {null}
                </GradientBorderCard>
              </div>

              {/* undefined内容 */}
              <div>
                <h3 className="text-sm font-medium mb-2">未定义内容 (undefined)</h3>
                <GradientBorderCard padding={padding}>
                  {undefined}
                </GradientBorderCard>
              </div>

              {/* 空字符串 */}
              <div>
                <h3 className="text-sm font-medium mb-2">空字符串</h3>
                <GradientBorderCard padding={padding}>
                  {""}
                </GradientBorderCard>
              </div>

              {/* 数字内容 */}
              <div>
                <h3 className="text-sm font-medium mb-2">数字内容</h3>
                <GradientBorderCard padding={padding}>
                  {42}
                </GradientBorderCard>
              </div>

              {/* 布尔值 */}
              <div>
                <h3 className="text-sm font-medium mb-2">布尔值 (true)</h3>
                <GradientBorderCard padding={padding}>
                  {true}
                </GradientBorderCard>
              </div>

              {/* 数组内容 */}
              <div>
                <h3 className="text-sm font-medium mb-2">数组内容</h3>
                <GradientBorderCard padding={padding}>
                  {['项目1', '项目2', '项目3'].map((item, index) => (
                    <div key={index} className="mb-1">{item}</div>
                  ))}
                </GradientBorderCard>
              </div>

              {/* 条件渲染 */}
              <div>
                <h3 className="text-sm font-medium mb-2">条件渲染</h3>
                <GradientBorderCard padding={padding}>
                  {Math.random() > 0.5 ? (
                    <span className="text-green-600">显示内容</span>
                  ) : (
                    <span className="text-red-600">隐藏内容</span>
                  )}
                </GradientBorderCard>
              </div>

              {/* Fragment内容 */}
              <div>
                <h3 className="text-sm font-medium mb-2">Fragment内容</h3>
                <GradientBorderCard padding={padding}>
                  <>
                    <div>Fragment 第一部分</div>
                    <div>Fragment 第二部分</div>
                  </>
                </GradientBorderCard>
              </div>
            </div>
          </div>

          {/* 内边距效果对比 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">内边距效果对比</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(PADDING_PRESETS).map(([name, value]) => (
                <div key={name}>
                  <h3 className="text-sm font-medium mb-2 capitalize">
                    {name.replace('_', ' ')} ({value})
                  </h3>
                  <GradientBorderCard padding={value} borderWidth={2}>
                    <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center text-sm">
                      内容区域
                    </div>
                  </GradientBorderCard>
                </div>
              ))}
            </div>
          </div>

          {/* 无效内边距测试 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">无效内边距处理</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">无效值 (invalid-padding)</h3>
                <GradientBorderCard padding="invalid-padding">
                  <div className="text-center">应该回退到默认内边距</div>
                </GradientBorderCard>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">纯数字 (20)</h3>
                <GradientBorderCard padding="20">
                  <div className="text-center">应该自动添加px单位</div>
                </GradientBorderCard>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">空字符串</h3>
                <GradientBorderCard padding="">
                  <div className="text-center">应该使用默认内边距</div>
                </GradientBorderCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}