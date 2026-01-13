/**
 * 手动测试文件 - 验证渐变边框卡片组件的核心功能
 * 这个文件用于在没有正式测试环境的情况下验证组件功能
 */

import React from 'react';
import { GradientBorderCard } from './gradient-border-card';

// 测试用例1: 默认属性
export const DefaultPropsTest = () => (
  <GradientBorderCard>
    <div>默认属性测试 - 应该显示粉色到蓝色的渐变边框</div>
  </GradientBorderCard>
);

// 测试用例2: 自定义颜色
export const CustomColorsTest = () => (
  <GradientBorderCard gradientFrom="#ff0000" gradientTo="#0000ff">
    <div>自定义颜色测试 - 应该显示红色到蓝色的渐变边框</div>
  </GradientBorderCard>
);

// 测试用例3: 自定义边框宽度
export const CustomBorderWidthTest = () => (
  <GradientBorderCard borderWidth={5}>
    <div>自定义边框宽度测试 - 应该显示5px宽的边框</div>
  </GradientBorderCard>
);

// 测试用例4: 无效颜色值回退
export const InvalidColorFallbackTest = () => (
  <GradientBorderCard gradientFrom="invalid-color" gradientTo="another-invalid">
    <div>无效颜色回退测试 - 应该回退到默认的粉色到蓝色渐变</div>
  </GradientBorderCard>
);

// 测试用例5: 负数边框宽度回退
export const NegativeBorderWidthTest = () => (
  <GradientBorderCard borderWidth={-5}>
    <div>负数边框宽度测试 - 应该回退到默认的2px边框</div>
  </GradientBorderCard>
);

// 测试用例6: 阴影效果
export const ShadowTest = () => (
  <div className="flex gap-4">
    <GradientBorderCard shadow={true}>
      <div>有阴影效果</div>
    </GradientBorderCard>
    <GradientBorderCard shadow={false}>
      <div>无阴影效果</div>
    </GradientBorderCard>
  </div>
);

// 测试用例7: 动画效果
export const AnimationTest = () => (
  <GradientBorderCard animated={true}>
    <div>动画效果测试 - 鼠标悬停应该有缩放效果</div>
  </GradientBorderCard>
);

// 测试用例8: 自定义类名
export const CustomClassTest = () => (
  <GradientBorderCard className="custom-test-class">
    <div>自定义类名测试</div>
  </GradientBorderCard>
);

// 测试用例9: 圆角计算
export const BorderRadiusTest = () => (
  <div className="flex gap-4 flex-wrap">
    <GradientBorderCard borderRadius="0.5rem" borderWidth={2}>
      <div>小圆角 (0.5rem, 2px边框)</div>
    </GradientBorderCard>
    <GradientBorderCard borderRadius="1rem" borderWidth={4}>
      <div>中等圆角 (1rem, 4px边框)</div>
    </GradientBorderCard>
    <GradientBorderCard borderRadius="2rem" borderWidth={1}>
      <div>大圆角 (2rem, 1px边框)</div>
    </GradientBorderCard>
    <GradientBorderCard borderRadius="1rem" borderWidth={20}>
      <div>极端情况 (1rem, 20px边框)</div>
    </GradientBorderCard>
    <GradientBorderCard borderRadius="50%" borderWidth={5} className="w-32 h-32">
      <div className="flex items-center justify-center h-full text-sm">圆形</div>
    </GradientBorderCard>
  </div>
);

// 测试用例10: 复杂内容
export const ComplexContentTest = () => (
  <GradientBorderCard>
    <div>
      <h3 className="text-lg font-bold mb-2">复杂内容测试</h3>
      <p className="mb-2">这是一个包含多种元素的测试：</p>
      <ul className="list-disc list-inside mb-2">
        <li>列表项 1</li>
        <li>列表项 2</li>
      </ul>
      <button className="px-4 py-2 bg-blue-500 text-white rounded">
        按钮元素
      </button>
    </div>
  </GradientBorderCard>
);

// 所有测试用例的集合
export const AllTests = () => (
  <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
    <h1 className="text-2xl font-bold">渐变边框卡片组件手动测试</h1>
    
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">1. 默认属性测试</h2>
        <DefaultPropsTest />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">2. 自定义颜色测试</h2>
        <CustomColorsTest />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">3. 自定义边框宽度测试</h2>
        <CustomBorderWidthTest />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">4. 无效颜色回退测试</h2>
        <InvalidColorFallbackTest />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">5. 负数边框宽度测试</h2>
        <NegativeBorderWidthTest />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">6. 阴影效果测试</h2>
        <ShadowTest />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">7. 动画效果测试</h2>
        <AnimationTest />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">8. 自定义类名测试</h2>
        <CustomClassTest />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">9. 圆角计算测试</h2>
        <BorderRadiusTest />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">10. 复杂内容测试</h2>
        <ComplexContentTest />
      </div>
    </div>
  </div>
);