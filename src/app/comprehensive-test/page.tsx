'use client';

import React, { useState } from 'react';
import { 
  GradientBorderCard, 
  GRADIENT_PRESETS,
  BORDER_WIDTH_PRESETS,
  BORDER_RADIUS_PRESETS,
  PADDING_PRESETS,
  SHADOW_PRESETS
} from '@/components/ui/gradient-border-card';

export default function ComprehensiveTestPage() {
  const [testResults, setTestResults] = useState<{[key: string]: boolean}>({});

  const runTest = (testName: string, testFn: () => boolean) => {
    try {
      const result = testFn();
      setTestResults(prev => ({ ...prev, [testName]: result }));
      return result;
    } catch (error) {
      console.error(`Test ${testName} failed:`, error);
      setTestResults(prev => ({ ...prev, [testName]: false }));
      return false;
    }
  };

  const runAllTests = () => {
    // 测试1: 基本渲染
    runTest('基本渲染', () => {
      return document.querySelector('[data-test="basic-render"]') !== null;
    });

    // 测试2: 自定义颜色
    runTest('自定义颜色', () => {
      const element = document.querySelector('[data-test="custom-colors"]') as HTMLElement;
      if (!element) return false;
      const style = window.getComputedStyle(element);
      return style.background.includes('rgb(255, 0, 0)') && style.background.includes('rgb(0, 0, 255)');
    });

    // 测试3: 边框宽度
    runTest('边框宽度', () => {
      const element = document.querySelector('[data-test="border-width"]') as HTMLElement;
      if (!element) return false;
      const style = window.getComputedStyle(element);
      return style.padding === '5px';
    });

    // 测试4: 圆角半径
    runTest('圆角半径', () => {
      const element = document.querySelector('[data-test="border-radius"]') as HTMLElement;
      if (!element) return false;
      const style = window.getComputedStyle(element);
      return style.borderRadius === '2rem';
    });

    // 测试5: 内边距
    runTest('内边距', () => {
      const element = document.querySelector('[data-test="padding"] > div') as HTMLElement;
      if (!element) return false;
      const style = window.getComputedStyle(element);
      return style.padding === '2rem';
    });

    // 测试6: 阴影效果
    runTest('阴影效果', () => {
      const element = document.querySelector('[data-test="shadow"]') as HTMLElement;
      if (!element) return false;
      const style = window.getComputedStyle(element);
      return style.boxShadow !== 'none' && style.boxShadow !== '';
    });

    // 测试7: 无阴影
    runTest('无阴影', () => {
      const element = document.querySelector('[data-test="no-shadow"]') as HTMLElement;
      if (!element) return false;
      const style = window.getComputedStyle(element);
      return style.boxShadow === 'none' || style.boxShadow === '';
    });

    // 测试8: 动画效果
    runTest('动画效果', () => {
      const element = document.querySelector('[data-test="animated"]') as HTMLElement;
      if (!element) return false;
      return element.classList.contains('transition-all');
    });

    // 测试9: 自定义类名
    runTest('自定义类名', () => {
      const element = document.querySelector('[data-test="custom-class"]') as HTMLElement;
      if (!element) return false;
      return element.classList.contains('test-custom-class');
    });

    // 测试10: Children渲染
    runTest('Children渲染', () => {
      const element = document.querySelector('[data-test="children"] [data-content="test-content"]');
      return element !== null;
    });
  };

  const allTestsPassed = Object.keys(testResults).length > 0 && 
    Object.values(testResults).every(result => result === true);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">渐变边框卡片组件 - 综合功能测试</h1>
        
        {/* 测试控制面板 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">自动化测试</h2>
            <button
              onClick={runAllTests}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              运行所有测试
            </button>
          </div>
          
          {Object.keys(testResults).length > 0 && (
            <div className="space-y-2">
              <div className={`p-3 rounded ${allTestsPassed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <strong>测试结果: {allTestsPassed ? '✅ 所有测试通过' : '❌ 部分测试失败'}</strong>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {Object.entries(testResults).map(([testName, passed]) => (
                  <div
                    key={testName}
                    className={`p-2 rounded text-sm ${
                      passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {passed ? '✅' : '❌'} {testName}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 功能测试区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 测试1: 基本渲染 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">1. 基本渲染</h3>
            <GradientBorderCard data-test="basic-render">
              <div className="text-center p-2">基本渲染测试</div>
            </GradientBorderCard>
          </div>

          {/* 测试2: 自定义颜色 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">2. 自定义颜色</h3>
            <GradientBorderCard 
              data-test="custom-colors"
              gradientFrom="#ff0000" 
              gradientTo="#0000ff"
            >
              <div className="text-center p-2">红色到蓝色</div>
            </GradientBorderCard>
          </div>

          {/* 测试3: 边框宽度 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">3. 边框宽度 (5px)</h3>
            <GradientBorderCard 
              data-test="border-width"
              borderWidth={5}
            >
              <div className="text-center p-2">厚边框测试</div>
            </GradientBorderCard>
          </div>

          {/* 测试4: 圆角半径 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">4. 圆角半径 (2rem)</h3>
            <GradientBorderCard 
              data-test="border-radius"
              borderRadius="2rem"
            >
              <div className="text-center p-2">大圆角测试</div>
            </GradientBorderCard>
          </div>

          {/* 测试5: 内边距 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">5. 内边距 (2rem)</h3>
            <GradientBorderCard 
              data-test="padding"
              padding="2rem"
            >
              <div className="text-center">大内边距测试</div>
            </GradientBorderCard>
          </div>

          {/* 测试6: 阴影效果 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">6. 阴影效果</h3>
            <GradientBorderCard 
              data-test="shadow"
              shadow="large"
            >
              <div className="text-center p-2">大阴影测试</div>
            </GradientBorderCard>
          </div>

          {/* 测试7: 无阴影 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">7. 无阴影</h3>
            <GradientBorderCard 
              data-test="no-shadow"
              shadow={false}
            >
              <div className="text-center p-2">无阴影测试</div>
            </GradientBorderCard>
          </div>

          {/* 测试8: 动画效果 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">8. 动画效果</h3>
            <GradientBorderCard 
              data-test="animated"
              animated={true}
            >
              <div className="text-center p-2">悬停缩放测试</div>
            </GradientBorderCard>
          </div>

          {/* 测试9: 自定义类名 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">9. 自定义类名</h3>
            <GradientBorderCard 
              data-test="custom-class"
              className="test-custom-class"
            >
              <div className="text-center p-2">自定义类名测试</div>
            </GradientBorderCard>
          </div>

          {/* 测试10: Children渲染 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">10. Children渲染</h3>
            <GradientBorderCard data-test="children">
              <div>
                <h4 className="font-bold">复杂内容</h4>
                <p data-content="test-content">包含多个元素</p>
                <button className="px-2 py-1 bg-blue-500 text-white rounded text-sm">
                  按钮
                </button>
              </div>
            </GradientBorderCard>
          </div>
        </div>

        {/* 预设测试 */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">预设配置测试</h2>
          
          <div className="space-y-6">
            {/* 渐变预设 */}
            <div>
              <h3 className="text-lg font-medium mb-2">渐变预设</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(GRADIENT_PRESETS).map(([name, preset]) => (
                  <GradientBorderCard
                    key={name}
                    gradientFrom={preset.from}
                    gradientTo={preset.to}
                    className="h-20"
                  >
                    <div className="flex items-center justify-center h-full text-sm capitalize">
                      {name}
                    </div>
                  </GradientBorderCard>
                ))}
              </div>
            </div>

            {/* 边框宽度预设 */}
            <div>
              <h3 className="text-lg font-medium mb-2">边框宽度预设</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(BORDER_WIDTH_PRESETS).map(([name, width]) => (
                  <GradientBorderCard
                    key={name}
                    borderWidth={width}
                    className="h-16"
                  >
                    <div className="flex items-center justify-center h-full text-sm">
                      {name.replace('_', ' ')} ({width}px)
                    </div>
                  </GradientBorderCard>
                ))}
              </div>
            </div>

            {/* 圆角预设 */}
            <div>
              <h3 className="text-lg font-medium mb-2">圆角预设</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(BORDER_RADIUS_PRESETS).map(([name, radius]) => (
                  <GradientBorderCard
                    key={name}
                    borderRadius={radius}
                    className="h-16"
                  >
                    <div className="flex items-center justify-center h-full text-sm">
                      {name.replace('_', ' ')}
                    </div>
                  </GradientBorderCard>
                ))}
              </div>
            </div>

            {/* 内边距预设 */}
            <div>
              <h3 className="text-lg font-medium mb-2">内边距预设</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(PADDING_PRESETS).map(([name, padding]) => (
                  <GradientBorderCard
                    key={name}
                    padding={padding}
                    borderWidth={1}
                  >
                    <div className="bg-blue-50 border border-blue-200 rounded text-center text-sm">
                      {name.replace('_', ' ')} ({padding})
                    </div>
                  </GradientBorderCard>
                ))}
              </div>
            </div>

            {/* 阴影预设 */}
            <div>
              <h3 className="text-lg font-medium mb-2">阴影预设</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(SHADOW_PRESETS).map(([name, shadow]) => (
                  <GradientBorderCard
                    key={name}
                    shadow={name as any}
                    className="h-16"
                  >
                    <div className="flex items-center justify-center h-full text-sm">
                      {name.replace('_', ' ')}
                    </div>
                  </GradientBorderCard>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 错误处理测试 */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">错误处理测试</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">无效颜色</h3>
              <GradientBorderCard
                gradientFrom="invalid-color"
                gradientTo="another-invalid"
              >
                <div className="text-center p-2 text-sm">应该显示默认渐变</div>
              </GradientBorderCard>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">负数边框宽度</h3>
              <GradientBorderCard borderWidth={-5}>
                <div className="text-center p-2 text-sm">应该使用最小边框宽度</div>
              </GradientBorderCard>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">无效圆角</h3>
              <GradientBorderCard borderRadius="invalid-radius">
                <div className="text-center p-2 text-sm">应该使用默认圆角</div>
              </GradientBorderCard>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">无效内边距</h3>
              <GradientBorderCard padding="invalid-padding">
                <div className="text-center text-sm">应该使用默认内边距</div>
              </GradientBorderCard>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">空内容</h3>
              <GradientBorderCard>
                {null}
              </GradientBorderCard>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">超大边框宽度</h3>
              <GradientBorderCard borderWidth={100}>
                <div className="text-center p-2 text-sm">应该限制最大边框宽度</div>
              </GradientBorderCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}