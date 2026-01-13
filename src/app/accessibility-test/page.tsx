'use client';

import React, { useState } from 'react';
import { GradientBorderCard, GradientBorderCardErrorBoundary } from '@/components/ui/gradient-border-card';

export default function AccessibilityTestPage() {
  const [focusedCard, setFocusedCard] = useState<string | null>(null);
  const [clickedCard, setClickedCard] = useState<string | null>(null);
  const [keyboardEvents, setKeyboardEvents] = useState<string[]>([]);

  const addKeyboardEvent = (event: string) => {
    setKeyboardEvents(prev => [...prev.slice(-4), event]);
  };

  const handleCardClick = (cardId: string) => {
    setClickedCard(cardId);
    setTimeout(() => setClickedCard(null), 1000);
  };

  const handleKeyDown = (event: React.KeyboardEvent, cardId: string) => {
    addKeyboardEvent(`${cardId}: ${event.key}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">可访问性功能测试</h1>
        
        {/* 键盘事件监控 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">键盘事件监控</h2>
          <div className="bg-black text-green-400 p-4 rounded font-mono text-sm">
            <div className="mb-2">最近的键盘事件：</div>
            {keyboardEvents.length === 0 ? (
              <div className="text-gray-500">暂无键盘事件</div>
            ) : (
              keyboardEvents.map((event, index) => (
                <div key={index}>{event}</div>
              ))
            )}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            使用Tab键导航到交互式卡片，然后按Enter或Space键激活
          </p>
        </div>

        {/* 基本可访问性测试 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">基本可访问性属性</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 默认ARIA标签 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">默认ARIA标签</h3>
              <p className="text-xs text-gray-600">
                role="region", aria-label="渐变边框卡片"
              </p>
              <GradientBorderCard>
                <div className="text-center p-3 text-sm">
                  默认可访问性设置
                </div>
              </GradientBorderCard>
            </div>

            {/* 自定义ARIA标签 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">自定义ARIA标签</h3>
              <p className="text-xs text-gray-600">
                aria-label="产品展示卡片"
              </p>
              <GradientBorderCard aria-label="产品展示卡片">
                <div className="text-center p-3 text-sm">
                  自定义ARIA标签
                </div>
              </GradientBorderCard>
            </div>

            {/* 自定义角色 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">自定义角色</h3>
              <p className="text-xs text-gray-600">
                role="article"
              </p>
              <GradientBorderCard role="article">
                <div className="text-center p-3 text-sm">
                  文章角色卡片
                </div>
              </GradientBorderCard>
            </div>

            {/* ARIA描述 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">ARIA描述</h3>
              <p className="text-xs text-gray-600">
                aria-describedby="card-description"
              </p>
              <GradientBorderCard aria-describedby="card-description">
                <div className="text-center p-3 text-sm">
                  带描述的卡片
                </div>
              </GradientBorderCard>
              <div id="card-description" className="text-xs text-gray-500">
                这是一个带有详细描述的渐变边框卡片
              </div>
            </div>
          </div>
        </div>

        {/* 交互式卡片测试 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">交互式卡片测试</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 可点击卡片 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">可点击卡片</h3>
              <p className="text-xs text-gray-600">
                interactive={true}, onClick处理器
              </p>
              <GradientBorderCard
                interactive={true}
                onClick={() => handleCardClick('clickable')}
                onKeyDown={(e) => handleKeyDown(e, 'clickable')}
                onFocus={() => setFocusedCard('clickable')}
                onBlur={() => setFocusedCard(null)}
              >
                <div className="text-center p-3 text-sm">
                  {clickedCard === 'clickable' ? '已点击!' : '点击我或按Enter/Space'}
                  {focusedCard === 'clickable' && (
                    <div className="text-blue-600 text-xs mt-1">已聚焦</div>
                  )}
                </div>
              </GradientBorderCard>
            </div>

            {/* 自定义tabIndex */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">自定义tabIndex</h3>
              <p className="text-xs text-gray-600">
                tabIndex={1}, 优先获得焦点
              </p>
              <GradientBorderCard
                interactive={true}
                tabIndex={1}
                onClick={() => handleCardClick('priority')}
                onKeyDown={(e) => handleKeyDown(e, 'priority')}
                onFocus={() => setFocusedCard('priority')}
                onBlur={() => setFocusedCard(null)}
              >
                <div className="text-center p-3 text-sm">
                  优先级焦点卡片
                  {focusedCard === 'priority' && (
                    <div className="text-blue-600 text-xs mt-1">已聚焦</div>
                  )}
                </div>
              </GradientBorderCard>
            </div>

            {/* 键盘导航卡片 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">键盘导航卡片</h3>
              <p className="text-xs text-gray-600">
                支持所有键盘事件
              </p>
              <GradientBorderCard
                interactive={true}
                onClick={() => handleCardClick('keyboard')}
                onKeyDown={(e) => handleKeyDown(e, 'keyboard')}
                onFocus={() => setFocusedCard('keyboard')}
                onBlur={() => setFocusedCard(null)}
              >
                <div className="text-center p-3 text-sm">
                  键盘导航测试
                  {focusedCard === 'keyboard' && (
                    <div className="text-blue-600 text-xs mt-1">已聚焦</div>
                  )}
                </div>
              </GradientBorderCard>
            </div>

            {/* 禁用交互 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">禁用交互</h3>
              <p className="text-xs text-gray-600">
                tabIndex={-1}, 不可聚焦
              </p>
              <GradientBorderCard tabIndex={-1}>
                <div className="text-center p-3 text-sm text-gray-500">
                  不可聚焦的卡片
                </div>
              </GradientBorderCard>
            </div>
          </div>
        </div>

        {/* 颜色对比度测试 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">颜色对比度测试</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 高对比度 - 白底黑字 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">高对比度 (白底)</h3>
              <p className="text-xs text-gray-600">
                background="white" - 应该通过WCAG AAA
              </p>
              <GradientBorderCard background="white">
                <div className="text-center p-3 text-sm text-black">
                  黑色文字，白色背景
                </div>
              </GradientBorderCard>
            </div>

            {/* 中等对比度 - 浅灰底 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">中等对比度 (浅灰底)</h3>
              <p className="text-xs text-gray-600">
                background="#f5f5f5" - 应该通过WCAG AA
              </p>
              <GradientBorderCard background="#f5f5f5">
                <div className="text-center p-3 text-sm text-black">
                  黑色文字，浅灰背景
                </div>
              </GradientBorderCard>
            </div>

            {/* 低对比度 - 浅黄底 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">低对比度 (浅黄底)</h3>
              <p className="text-xs text-gray-600">
                background="#ffffcc" - 可能不通过WCAG
              </p>
              <GradientBorderCard background="#ffffcc">
                <div className="text-center p-3 text-sm text-black">
                  黑色文字，浅黄背景
                </div>
              </GradientBorderCard>
            </div>

            {/* 极低对比度 - 浅灰底浅灰字 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">极低对比度</h3>
              <p className="text-xs text-gray-600">
                background="#e0e0e0" - 不通过WCAG
              </p>
              <GradientBorderCard background="#e0e0e0">
                <div className="text-center p-3 text-sm text-gray-400">
                  浅灰文字，浅灰背景
                </div>
              </GradientBorderCard>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-yellow-50 rounded">
            <h3 className="text-sm font-medium mb-2">对比度检查说明</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 打开浏览器开发者工具查看控制台警告</li>
              <li>• WCAG AA标准要求对比度至少4.5:1</li>
              <li>• WCAG AAA标准要求对比度至少7:1</li>
              <li>• 组件会自动检测并警告低对比度情况</li>
            </ul>
          </div>
        </div>

        {/* 屏幕阅读器测试 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">屏幕阅读器测试</h2>
          
          <div className="space-y-6">
            {/* 语义化结构 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">语义化结构测试</h3>
              <GradientBorderCard role="article" aria-label="新闻文章卡片">
                <article>
                  <header>
                    <h4 className="text-lg font-semibold mb-2">文章标题</h4>
                  </header>
                  <p className="text-sm text-gray-600 mb-2">
                    这是一篇示例文章的内容摘要，展示了如何在渐变边框卡片中使用语义化HTML结构。
                  </p>
                  <footer className="text-xs text-gray-500">
                    发布时间: 2024年1月1日
                  </footer>
                </article>
              </GradientBorderCard>
            </div>

            {/* 表单卡片 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">表单卡片测试</h3>
              <GradientBorderCard role="form" aria-label="用户信息表单">
                <form>
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium mb-1">
                        用户名
                      </label>
                      <input
                        id="username"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        aria-describedby="username-help"
                      />
                      <div id="username-help" className="text-xs text-gray-500 mt-1">
                        请输入您的用户名
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                    >
                      提交
                    </button>
                  </div>
                </form>
              </GradientBorderCard>
            </div>

            {/* 状态更新卡片 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">动态内容测试</h3>
              <GradientBorderCard aria-label="状态更新卡片">
                <div>
                  <div className="text-sm font-medium mb-2">系统状态</div>
                  <div role="status" aria-live="polite" className="text-sm text-green-600">
                    ✅ 所有系统正常运行
                  </div>
                  <div role="alert" aria-live="assertive" className="text-sm text-red-600 mt-1">
                    {/* 这里可以显示紧急警告 */}
                  </div>
                </div>
              </GradientBorderCard>
            </div>
          </div>
        </div>

        {/* 可访问性检查清单 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">可访问性检查清单</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-3">WCAG 2.1 合规性</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✅</span>
                  语义化HTML结构
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✅</span>
                  适当的ARIA标签和角色
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✅</span>
                  键盘导航支持
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✅</span>
                  焦点管理
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✅</span>
                  颜色对比度检查
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✅</span>
                  屏幕阅读器兼容
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">测试建议</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 使用Tab键测试键盘导航</li>
                <li>• 使用屏幕阅读器测试内容朗读</li>
                <li>• 检查高对比度模式下的显示效果</li>
                <li>• 验证缩放到200%时的可用性</li>
                <li>• 测试不同设备和浏览器的兼容性</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}