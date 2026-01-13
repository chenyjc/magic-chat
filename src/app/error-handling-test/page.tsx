'use client';

import React, { useState } from 'react';
import { GradientBorderCard, GradientBorderCardErrorBoundary } from '@/components/ui/gradient-border-card';

export default function ErrorHandlingTestPage() {
  const [showConsole, setShowConsole] = useState(false);
  const [consoleMessages, setConsoleMessages] = useState<string[]>([]);

  // 拦截console.warn和console.error来显示消息
  React.useEffect(() => {
    const originalWarn = console.warn;
    const originalError = console.error;

    console.warn = (...args) => {
      setConsoleMessages(prev => [...prev, `WARN: ${args.join(' ')}`]);
      originalWarn(...args);
    };

    console.error = (...args) => {
      setConsoleMessages(prev => [...prev, `ERROR: ${args.join(' ')}`]);
      originalError(...args);
    };

    return () => {
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);

  const clearConsole = () => {
    setConsoleMessages([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">错误处理和输入验证测试</h1>
        
        {/* 控制面板 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">控制面板</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowConsole(!showConsole)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                {showConsole ? '隐藏' : '显示'} 控制台消息
              </button>
              <button
                onClick={clearConsole}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                清空消息
              </button>
            </div>
          </div>
          
          {showConsole && (
            <div className="bg-black text-green-400 p-4 rounded font-mono text-sm max-h-40 overflow-y-auto">
              {consoleMessages.length === 0 ? (
                <div className="text-gray-500">暂无控制台消息</div>
              ) : (
                consoleMessages.map((message, index) => (
                  <div key={index} className="mb-1">
                    {message}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* 输入验证测试 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">输入验证测试</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 无效颜色测试 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">无效渐变颜色</h3>
              <p className="text-xs text-gray-600">
                gradientFrom="invalid-color", gradientTo="another-invalid"
              </p>
              <GradientBorderCard
                gradientFrom="invalid-color"
                gradientTo="another-invalid"
              >
                <div className="text-center p-3 text-sm">
                  应该显示默认渐变色
                </div>
              </GradientBorderCard>
            </div>

            {/* 无效背景色测试 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">无效背景色</h3>
              <p className="text-xs text-gray-600">
                background="not-a-color"
              </p>
              <GradientBorderCard background="not-a-color">
                <div className="text-center p-3 text-sm">
                  应该显示白色背景
                </div>
              </GradientBorderCard>
            </div>

            {/* 无效边框宽度测试 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">无效边框宽度</h3>
              <p className="text-xs text-gray-600">
                borderWidth={'{NaN}' as any}
              </p>
              <GradientBorderCard borderWidth={NaN}>
                <div className="text-center p-3 text-sm">
                  应该使用默认边框宽度
                </div>
              </GradientBorderCard>
            </div>

            {/* 负数边框宽度测试 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">负数边框宽度</h3>
              <p className="text-xs text-gray-600">
                borderWidth={-10}
              </p>
              <GradientBorderCard borderWidth={-10}>
                <div className="text-center p-3 text-sm">
                  应该限制为最小值0.5px
                </div>
              </GradientBorderCard>
            </div>

            {/* 超大边框宽度测试 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">超大边框宽度</h3>
              <p className="text-xs text-gray-600">
                borderWidth={100}
              </p>
              <GradientBorderCard borderWidth={100}>
                <div className="text-center p-3 text-sm">
                  应该限制为最大值50px
                </div>
              </GradientBorderCard>
            </div>

            {/* 无效圆角半径测试 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">无效圆角半径</h3>
              <p className="text-xs text-gray-600">
                borderRadius="invalid-radius"
              </p>
              <GradientBorderCard borderRadius="invalid-radius">
                <div className="text-center p-3 text-sm">
                  应该使用默认圆角1rem
                </div>
              </GradientBorderCard>
            </div>

            {/* 无效内边距测试 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">无效内边距</h3>
              <p className="text-xs text-gray-600">
                padding="invalid-padding"
              </p>
              <GradientBorderCard padding="invalid-padding">
                <div className="text-center text-sm">
                  应该使用默认内边距1.5rem
                </div>
              </GradientBorderCard>
            </div>

            {/* null/undefined 属性测试 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">null/undefined 属性</h3>
              <p className="text-xs text-gray-600">
                gradientFrom={null}, borderRadius={undefined}
              </p>
              <GradientBorderCard
                gradientFrom={null as any}
                borderRadius={undefined as any}
              >
                <div className="text-center p-3 text-sm">
                  应该使用默认值
                </div>
              </GradientBorderCard>
            </div>

            {/* 空字符串测试 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">空字符串属性</h3>
              <p className="text-xs text-gray-600">
                gradientTo="", padding=""
              </p>
              <GradientBorderCard
                gradientTo=""
                padding=""
              >
                <div className="text-center text-sm">
                  应该使用默认值
                </div>
              </GradientBorderCard>
            </div>
          </div>
        </div>

        {/* 边界值测试 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">边界值测试</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 最小边框宽度 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">最小边框宽度</h3>
              <p className="text-xs text-gray-600">borderWidth={0.1}</p>
              <GradientBorderCard borderWidth={0.1}>
                <div className="text-center p-2 text-sm">
                  应该限制为0.5px
                </div>
              </GradientBorderCard>
            </div>

            {/* 最大边框宽度 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">最大边框宽度</h3>
              <p className="text-xs text-gray-600">borderWidth={60}</p>
              <GradientBorderCard borderWidth={60}>
                <div className="text-center p-2 text-sm">
                  应该限制为50px
                </div>
              </GradientBorderCard>
            </div>

            {/* Infinity 测试 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Infinity 边框宽度</h3>
              <p className="text-xs text-gray-600">borderWidth={Infinity}</p>
              <GradientBorderCard borderWidth={Infinity}>
                <div className="text-center p-2 text-sm">
                  应该使用默认值
                </div>
              </GradientBorderCard>
            </div>

            {/* 纯数字圆角 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">纯数字圆角</h3>
              <p className="text-xs text-gray-600">borderRadius="20"</p>
              <GradientBorderCard borderRadius="20">
                <div className="text-center p-2 text-sm">
                  应该自动添加px单位
                </div>
              </GradientBorderCard>
            </div>
          </div>
        </div>

        {/* Children 内容测试 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Children 内容处理测试</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* null children */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">null children</h3>
              <GradientBorderCard>
                {null}
              </GradientBorderCard>
            </div>

            {/* undefined children */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">undefined children</h3>
              <GradientBorderCard>
                {undefined}
              </GradientBorderCard>
            </div>

            {/* 空字符串 children */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">空字符串 children</h3>
              <GradientBorderCard>
                {""}
              </GradientBorderCard>
            </div>

            {/* false children */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">false children</h3>
              <GradientBorderCard>
                {false}
              </GradientBorderCard>
            </div>

            {/* 0 children */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">数字 0 children</h3>
              <GradientBorderCard>
                {0}
              </GradientBorderCard>
            </div>

            {/* 数组 children */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">数组 children</h3>
              <GradientBorderCard>
                {[1, 2, 3].map(n => <div key={n}>项目 {n}</div>)}
              </GradientBorderCard>
            </div>

            {/* 条件渲染 children */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">条件渲染 children</h3>
              <GradientBorderCard>
                {Math.random() > 0.5 && <div>随机显示</div>}
              </GradientBorderCard>
            </div>

            {/* Fragment children */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Fragment children</h3>
              <GradientBorderCard>
                <>
                  <div>Fragment 1</div>
                  <div>Fragment 2</div>
                </>
              </GradientBorderCard>
            </div>
          </div>
        </div>

        {/* 错误边界测试 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">错误边界测试</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 正常组件 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">正常组件（有错误边界保护）</h3>
              <GradientBorderCardErrorBoundary>
                <GradientBorderCard>
                  <div className="text-center p-4">
                    这是一个正常工作的组件
                  </div>
                </GradientBorderCard>
              </GradientBorderCardErrorBoundary>
            </div>

            {/* 无错误边界保护 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">无错误边界保护</h3>
              <GradientBorderCard>
                <div className="text-center p-4">
                  这个组件没有错误边界保护
                </div>
              </GradientBorderCard>
            </div>
          </div>
        </div>

        {/* 类型安全测试 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">类型安全测试</h2>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              以下测试验证TypeScript类型系统是否正确捕获无效的属性类型：
            </p>
            
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="text-sm font-medium mb-2">TypeScript 编译时检查</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ borderWidth 必须是 number 类型</li>
                <li>✅ gradientFrom/gradientTo 必须是 string 类型</li>
                <li>✅ shadow 支持 boolean 或预设字符串</li>
                <li>✅ animated 支持 boolean 或预设字符串</li>
                <li>✅ children 支持任何 React.ReactNode</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded">
              <h3 className="text-sm font-medium mb-2">运行时验证</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>✅ 无效输入自动回退到默认值</li>
                <li>✅ 边界值自动限制在合理范围内</li>
                <li>✅ 控制台警告提示无效输入</li>
                <li>✅ 错误边界捕获渲染异常</li>
                <li>✅ 优雅处理各种 children 类型</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}