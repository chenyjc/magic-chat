import React, { useMemo } from 'react';

/**
 * 渐变边框卡片组件的属性接口
 */
export interface GradientBorderCardProps {
  /** 卡片内容 */
  children: React.ReactNode;
  /** 额外的CSS类名 */
  className?: string;
  /** 内联样式 */
  style?: React.CSSProperties;
  /** 渐变起始颜色 (默认: #ff6ec7) */
  gradientFrom?: string;
  /** 渐变结束颜色 (默认: #4facfe) */
  gradientTo?: string;
  /** 边框宽度 (默认: 2px) */
  borderWidth?: number;
  /** 圆角半径 (默认: 1rem) */
  borderRadius?: string;
  /** 内容区域内边距 (默认: 1.5rem) */
  padding?: string;
  /** 内容区域背景色 (默认: white) */
  background?: string;
  /** 阴影效果配置 (默认: true) */
  shadow?: boolean | 'none' | 'small' | 'medium' | 'large' | 'extra_large' | string;
  /** 动画效果配置 (默认: false) */
  animated?: boolean | 'none' | 'scale' | 'lift' | 'glow' | 'rotate' | 'pulse' | 'focus' | string;
  
  // 可访问性属性
  /** ARIA 标签，描述卡片的用途 */
  'aria-label'?: string;
  /** ARIA 描述，提供更详细的说明 */
  'aria-describedby'?: string;
  /** ARIA 角色，默认为 'region' */
  role?: string;
  /** 是否可聚焦，默认为 false */
  tabIndex?: number;
  /** 键盘事件处理器 */
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** 焦点事件处理器 */
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  /** 失焦事件处理器 */
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  /** 是否为交互式卡片，影响可访问性属性 */
  interactive?: boolean;
}

/**
 * 渐变配置接口
 */
export interface GradientConfig {
  from: string;
  to: string;
  direction?: number; // 渐变角度，默认135度
}

/**
 * 边框配置接口
 */
export interface BorderConfig {
  width: number;
  radius: string;
}

/**
 * 阴影配置接口
 */
export interface ShadowConfig {
  enabled: boolean;
  blur?: number;
  spread?: number;
  color?: string;
}

/**
 * 预设渐变主题
 */
export const GRADIENT_PRESETS = {
  sunset: { from: '#ff6ec7', to: '#4facfe' },
  ocean: { from: '#667eea', to: '#764ba2' },
  forest: { from: '#11998e', to: '#38ef7d' },
  fire: { from: '#ff9a9e', to: '#fecfef' },
  purple: { from: '#a8edea', to: '#fed6e3' }
} as const;

/**
 * 预设边框宽度
 */
export const BORDER_WIDTH_PRESETS = {
  thin: 1,
  normal: 2,
  thick: 4,
  extra_thick: 8
} as const;

/**
 * 预设圆角半径
 */
export const BORDER_RADIUS_PRESETS = {
  none: '0',
  small: '0.25rem',
  normal: '0.5rem',
  medium: '1rem',
  large: '1.5rem',
  extra_large: '2rem',
  full: '50%'
} as const;

/**
 * 预设内边距
 */
export const PADDING_PRESETS = {
  none: '0',
  small: '0.5rem',
  normal: '1rem',
  medium: '1.5rem',
  large: '2rem',
  extra_large: '3rem'
} as const;

/**
 * 预设阴影效果
 */
export const SHADOW_PRESETS = {
  none: '',
  small: '0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
  medium: '0 4px 8px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06)',
  large: '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
  extra_large: '0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1)'
} as const;

/**
 * 预设动画效果
 */
export const ANIMATION_PRESETS = {
  none: '',
  scale: 'transition-all duration-300 hover:scale-105',
  lift: 'transition-all duration-300 hover:-translate-y-2 hover:shadow-lg',
  glow: 'transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/25',
  rotate: 'transition-all duration-300 hover:rotate-1',
  pulse: 'transition-all duration-300 hover:scale-105 animate-pulse',
  focus: 'transition-all duration-500 ease-in-out'
} as const;

/**
 * 验证CSS颜色值是否有效
 */
const isValidColor = (color: string): boolean => {
  if (!color || typeof color !== 'string') {
    return false;
  }
  
  // 在服务器端渲染环境中，我们使用简单的正则表达式验证
  if (typeof window === 'undefined') {
    // 简单的颜色格式验证：hex, rgb, rgba, hsl, hsla, 命名颜色
    const colorRegex = /^(#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})|rgb\(|rgba\(|hsl\(|hsla\(|[a-zA-Z]+).*$/;
    return colorRegex.test(color.trim());
  }
  
  // 在客户端使用DOM API验证
  try {
    const style = document.createElement('div').style;
    style.color = color;
    return style.color !== '';
  } catch {
    return false;
  }
};

/**
 * 验证CSS长度值是否有效
 */
const isValidCSSLength = (value: string): boolean => {
  if (!value || typeof value !== 'string') {
    return false;
  }
  
  const validUnits = ['px', 'rem', 'em', '%', 'vh', 'vw', 'vmin', 'vmax'];
  return validUnits.some(unit => value.endsWith(unit)) || /^\d+$/.test(value);
};

/**
 * 将颜色转换为RGB值
 */
const colorToRgb = (color: string): { r: number; g: number; b: number } | null => {
  if (typeof window === 'undefined') {
    // 服务器端简单的hex颜色解析
    const hexMatch = color.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
    if (hexMatch) {
      const hex = hexMatch[1];
      if (hex.length === 3) {
        return {
          r: parseInt(hex[0] + hex[0], 16),
          g: parseInt(hex[1] + hex[1], 16),
          b: parseInt(hex[2] + hex[2], 16)
        };
      } else {
        return {
          r: parseInt(hex.substr(0, 2), 16),
          g: parseInt(hex.substr(2, 2), 16),
          b: parseInt(hex.substr(4, 2), 16)
        };
      }
    }
    return null;
  }

  // 客户端使用Canvas API解析颜色
  try {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return { r, g, b };
  } catch {
    return null;
  }
};

/**
 * 计算相对亮度
 */
const getRelativeLuminance = (rgb: { r: number; g: number; b: number }): number => {
  const { r, g, b } = rgb;
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

/**
 * 计算颜色对比度
 */
const getContrastRatio = (color1: string, color2: string): number | null => {
  const rgb1 = colorToRgb(color1);
  const rgb2 = colorToRgb(color2);
  
  if (!rgb1 || !rgb2) return null;
  
  const l1 = getRelativeLuminance(rgb1);
  const l2 = getRelativeLuminance(rgb2);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * 验证颜色对比度是否符合WCAG标准
 */
const validateColorContrast = (foreground: string, background: string): {
  ratio: number | null;
  isValid: boolean;
  level: 'AA' | 'AAA' | 'fail';
} => {
  const ratio = getContrastRatio(foreground, background);
  
  if (ratio === null) {
    return { ratio: null, isValid: false, level: 'fail' };
  }
  
  // WCAG 2.1 标准：AA级别需要4.5:1，AAA级别需要7:1
  const isAAA = ratio >= 7;
  const isAA = ratio >= 4.5;
  
  return {
    ratio,
    isValid: isAA,
    level: isAAA ? 'AAA' : isAA ? 'AA' : 'fail'
  };
};

/**
 * 验证边框宽度是否有效
 */
const isValidBorderWidth = (width: number): boolean => {
  return typeof width === 'number' && !isNaN(width) && isFinite(width);
};

/**
 * 标准化边框宽度值
 */
const normalizeBorderWidth = (width: number): number => {
  if (!isValidBorderWidth(width)) {
    console.warn(`Invalid border width: ${width}, using default value 2`);
    return 2;
  }
  
  // 确保边框宽度在合理范围内 (0.5px - 50px)
  const normalized = Math.max(0.5, Math.min(50, width));
  
  if (normalized !== width) {
    console.warn(`Border width ${width} was clamped to ${normalized}`);
  }
  
  return normalized;
};

/**
 * 标准化圆角半径值
 */
const normalizeBorderRadius = (radius: string): string => {
  if (!radius || typeof radius !== 'string') {
    console.warn(`Invalid border radius: ${radius}, using default value 1rem`);
    return '1rem';
  }
  
  if (!isValidCSSLength(radius)) {
    console.warn(`Invalid border radius format: ${radius}, using default value 1rem`);
    return '1rem';
  }
  
  // 处理纯数字情况，添加px单位
  if (/^\d+$/.test(radius)) {
    return `${radius}px`;
  }
  
  return radius;
};

/**
 * 标准化内边距值
 */
const normalizePadding = (padding: string): string => {
  if (!padding || typeof padding !== 'string') {
    console.warn(`Invalid padding: ${padding}, using default value 1.5rem`);
    return '1.5rem';
  }
  
  if (!isValidCSSLength(padding)) {
    console.warn(`Invalid padding format: ${padding}, using default value 1.5rem`);
    return '1.5rem';
  }
  
  // 处理纯数字情况，添加px单位
  if (/^\d+$/.test(padding)) {
    return `${padding}px`;
  }
  
  return padding;
};

/**
 * 验证children内容是否有效
 */
const isValidChildren = (children: React.ReactNode): boolean => {
  return children !== null && children !== undefined;
};

/**
 * 验证和标准化颜色值
 */
const normalizeColor = (color: string, defaultColor: string, colorName: string): string => {
  if (!color || typeof color !== 'string') {
    console.warn(`Invalid ${colorName}: ${color}, using default value ${defaultColor}`);
    return defaultColor;
  }
  
  if (!isValidColor(color)) {
    console.warn(`Invalid ${colorName} format: ${color}, using default value ${defaultColor}`);
    return defaultColor;
  }
  
  return color;
};

/**
 * 获取阴影样式
 */
const getShadowStyle = (shadow: boolean | string): string => {
  if (shadow === false || shadow === 'none') {
    return '';
  }
  
  if (shadow === true) {
    return SHADOW_PRESETS.large;
  }
  
  if (typeof shadow === 'string' && shadow in SHADOW_PRESETS) {
    return SHADOW_PRESETS[shadow as keyof typeof SHADOW_PRESETS];
  }
  
  // 如果是自定义字符串，直接返回
  if (typeof shadow === 'string') {
    return shadow;
  }
  
  return SHADOW_PRESETS.large;
};

/**
 * 获取动画样式类名
 */
const getAnimationClasses = (animated: boolean | string): string => {
  if (animated === false || animated === 'none') {
    return '';
  }
  
  if (animated === true) {
    return ANIMATION_PRESETS.scale;
  }
  
  if (typeof animated === 'string' && animated in ANIMATION_PRESETS) {
    return ANIMATION_PRESETS[animated as keyof typeof ANIMATION_PRESETS];
  }
  
  // 如果是自定义字符串，直接返回
  if (typeof animated === 'string') {
    return animated;
  }
  
  return '';
};

/**
 * 渐变边框卡片组件
 * 
 * 提供现代化的渐变边框效果，支持自定义颜色、样式和交互动画。
 * 使用双层容器实现，外层应用渐变背景，内层提供内容区域。
 * 完全符合WCAG 2.1可访问性标准。
 */
export const GradientBorderCard: React.FC<GradientBorderCardProps> = ({
  children,
  className = '',
  style,
  gradientFrom = '#ff6ec7',
  gradientTo = '#4facfe',
  borderWidth = 2,
  borderRadius = '1rem',
  padding = '1.5rem',
  background = 'white',
  shadow = true,
  animated = false,
  
  // 可访问性属性
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  role = 'region',
  tabIndex,
  onKeyDown,
  onClick,
  onFocus,
  onBlur,
  interactive = false
}) => {
  // 输入验证和默认值处理
  const validatedProps = useMemo(() => {
    try {
      return {
        gradientFrom: normalizeColor(gradientFrom, '#ff6ec7', 'gradientFrom'),
        gradientTo: normalizeColor(gradientTo, '#4facfe', 'gradientTo'),
        borderWidth: normalizeBorderWidth(borderWidth),
        borderRadius: normalizeBorderRadius(borderRadius),
        padding: normalizePadding(padding),
        background: normalizeColor(background, 'white', 'background')
      };
    } catch (error) {
      console.error('Error validating GradientBorderCard props:', error);
      // 返回所有默认值
      return {
        gradientFrom: '#ff6ec7',
        gradientTo: '#4facfe',
        borderWidth: 2,
        borderRadius: '1rem',
        padding: '1.5rem',
        background: 'white'
      };
    }
  }, [gradientFrom, gradientTo, borderWidth, borderRadius, padding, background]);

  // 颜色对比度验证
  const contrastValidation = useMemo(() => {
    // 假设文本颜色为黑色，验证与背景的对比度
    const textColor = '#000000';
    const contrast = validateColorContrast(textColor, validatedProps.background);
    
    if (!contrast.isValid && contrast.ratio !== null) {
      console.warn(
        `Color contrast ratio ${contrast.ratio.toFixed(2)}:1 between text and background may not meet WCAG standards. ` +
        `Consider using a background color with better contrast.`
      );
    }
    
    return contrast;
  }, [validatedProps.background]);

  // 可访问性属性计算
  const accessibilityProps = useMemo(() => {
    const props: React.HTMLAttributes<HTMLDivElement> = {
      role: interactive ? 'button' : role,
      'aria-label': ariaLabel || (interactive ? '可交互的渐变边框卡片' : '渐变边框卡片'),
      'aria-describedby': ariaDescribedBy
    };

    // 如果是交互式卡片，添加键盘导航支持
    if (interactive || onClick || onKeyDown) {
      props.tabIndex = tabIndex !== undefined ? tabIndex : 0;
      props.onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        // 支持Enter和Space键激活
        if ((event.key === 'Enter' || event.key === ' ') && onClick) {
          event.preventDefault();
          onClick(event as any);
        }
        onKeyDown?.(event);
      };
      props.onClick = onClick;
      props.onFocus = onFocus;
      props.onBlur = onBlur;
    }

    return props;
  }, [interactive, role, ariaLabel, ariaDescribedBy, tabIndex, onClick, onKeyDown, onFocus, onBlur]);

  // 外层容器样式（渐变边框层）- 使用useMemo优化性能
  const gradientStyle: React.CSSProperties = useMemo(() => {
    const shadowStyle = getShadowStyle(shadow);
    
    return {
      background: `linear-gradient(135deg, ${validatedProps.gradientFrom}, ${validatedProps.gradientTo})`,
      padding: `${validatedProps.borderWidth}px`,
      borderRadius: validatedProps.borderRadius,
      ...(shadowStyle && {
        boxShadow: shadowStyle
      }),
      // 为交互式卡片添加焦点样式
      ...(interactive && {
        cursor: 'pointer',
        outline: 'none'
      }),
      // 合并用户提供的样式
      ...style
    };
  }, [validatedProps, shadow, interactive, style]);

  // 内层容器样式（内容背景层）- 使用useMemo优化性能
  const contentStyle: React.CSSProperties = useMemo(() => ({
    background: validatedProps.background,
    borderRadius: `calc(${validatedProps.borderRadius} - ${validatedProps.borderWidth}px)`,
    padding: validatedProps.padding,
    width: '100%',
    height: '100%'
  }), [validatedProps]);

  // 动画类名处理
  const animationClasses = useMemo(() => {
    return getAnimationClasses(animated);
  }, [animated]);

  // 焦点样式类名
  const focusClasses = interactive ? 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' : '';

  return (
    <div 
      className={`${animationClasses} ${focusClasses} ${className}`.trim()}
      style={gradientStyle}
      {...accessibilityProps}
    >
      <div style={contentStyle}>
        {isValidChildren(children) ? children : (
          <div className="text-gray-400 text-center" role="status" aria-live="polite">
            暂无内容
          </div>
        )}
      </div>
    </div>
  );
};

export default GradientBorderCard;

/**
 * 错误边界组件
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class GradientBorderCardErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error('GradientBorderCard Error Boundary caught an error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('GradientBorderCard Error Boundary details:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="border-2 border-red-300 rounded-lg p-4 bg-red-50">
          <div className="flex items-center mb-2">
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-2">
              <span className="text-white text-xs">!</span>
            </div>
            <p className="text-red-600 font-medium">渐变边框卡片渲染失败</p>
          </div>
          <p className="text-red-500 text-sm">
            {this.state.error?.message || '未知错误'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
          >
            重试
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}