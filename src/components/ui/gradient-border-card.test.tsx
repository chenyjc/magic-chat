import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { 
  GradientBorderCard, 
  BORDER_WIDTH_PRESETS, 
  BORDER_RADIUS_PRESETS,
  PADDING_PRESETS,
  SHADOW_PRESETS
} from './gradient-border-card';

describe('GradientBorderCard', () => {
  it('renders children content correctly', () => {
    render(
      <GradientBorderCard>
        <h1>Test Content</h1>
      </GradientBorderCard>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies default gradient colors when no props provided', () => {
    render(
      <GradientBorderCard>
        <div>Content</div>
      </GradientBorderCard>
    );
    
    const container = screen.getByRole('region');
    expect(container).toHaveStyle({
      background: 'linear-gradient(135deg, #ff6ec7, #4facfe)'
    });
  });

  it('applies custom gradient colors when provided', () => {
    render(
      <GradientBorderCard gradientFrom="#ff0000" gradientTo="#0000ff">
        <div>Content</div>
      </GradientBorderCard>
    );
    
    const container = screen.getByRole('region');
    expect(container).toHaveStyle({
      background: 'linear-gradient(135deg, #ff0000, #0000ff)'
    });
  });

  it('applies custom border width', () => {
    render(
      <GradientBorderCard borderWidth={4}>
        <div>Content</div>
      </GradientBorderCard>
    );
    
    const container = screen.getByRole('region');
    expect(container).toHaveStyle({
      padding: '4px'
    });
  });

  it('applies shadow effect by default', () => {
    render(
      <GradientBorderCard>
        <div>Content</div>
      </GradientBorderCard>
    );
    
    const container = screen.getByRole('region');
    expect(container).toHaveStyle({
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)'
    });
  });

  it('does not apply shadow when shadow prop is false', () => {
    render(
      <GradientBorderCard shadow={false}>
        <div>Content</div>
      </GradientBorderCard>
    );
    
    const container = screen.getByRole('region');
    expect(container).not.toHaveStyle({
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)'
    });
  });

  it('applies animation classes when animated prop is true', () => {
    render(
      <GradientBorderCard animated>
        <div>Content</div>
      </GradientBorderCard>
    );
    
    const container = screen.getByRole('region');
    expect(container).toHaveClass('transition-all', 'duration-300', 'hover:scale-105');
  });

  it('applies custom className', () => {
    render(
      <GradientBorderCard className="custom-class">
        <div>Content</div>
      </GradientBorderCard>
    );
    
    const container = screen.getByRole('region');
    expect(container).toHaveClass('custom-class');
  });

  it('handles invalid color values by falling back to defaults', () => {
    render(
      <GradientBorderCard gradientFrom="invalid-color" gradientTo="another-invalid">
        <div>Content</div>
      </GradientBorderCard>
    );
    
    const container = screen.getByRole('region');
    expect(container).toHaveStyle({
      background: 'linear-gradient(135deg, #ff6ec7, #4facfe)'
    });
  });

  it('handles negative border width by falling back to default', () => {
    render(
      <GradientBorderCard borderWidth={-5}>
        <div>Content</div>
      </GradientBorderCard>
    );
    
    const container = screen.getByRole('region');
    expect(container).toHaveStyle({
      padding: '0.5px' // minimum allowed border width
    });
  });

  it('normalizes border width to reasonable range', () => {
    render(
      <GradientBorderCard borderWidth={100}>
        <div>Content</div>
      </GradientBorderCard>
    );
    
    const container = screen.getByRole('region');
    expect(container).toHaveStyle({
      padding: '50px' // maximum allowed border width
    });
  });

  it('applies preset border widths correctly', () => {
    render(
      <GradientBorderCard borderWidth={BORDER_WIDTH_PRESETS.thick}>
        <div>Content</div>
      </GradientBorderCard>
    );
    
    const container = screen.getByRole('region');
    expect(container).toHaveStyle({
      padding: '4px'
    });
  });

  it('applies preset border radius correctly', () => {
    render(
      <GradientBorderCard borderRadius={BORDER_RADIUS_PRESETS.large}>
        <div>Content</div>
      </GradientBorderCard>
    );
    
    const container = screen.getByRole('region');
    expect(container).toHaveStyle({
      borderRadius: '1.5rem'
    });
  });

  it('handles numeric border radius by adding px unit', () => {
    render(
      <GradientBorderCard borderRadius="20">
        <div>Content</div>
      </GradientBorderCard>
    );
    
    const container = screen.getByRole('region');
    expect(container).toHaveStyle({
      borderRadius: '20px'
    });
  });

  it('handles invalid border radius by falling back to default', () => {
    render(
      <GradientBorderCard borderRadius="invalid-radius">
        <div>Content</div>
      </GradientBorderCard>
    );
    
    const container = screen.getByRole('region');
    expect(container).toHaveStyle({
      borderRadius: '1rem'
    });
  });

  it('maintains inner border radius calculation', () => {
    const { container } = render(
      <GradientBorderCard borderWidth={4} borderRadius="1rem">
        <div>Content</div>
      </GradientBorderCard>
    );
    
    const innerContainer = container.querySelector('div > div');
    expect(innerContainer).toHaveStyle({
      borderRadius: 'calc(1rem - 4px)'
    });
  });

  it('renders children content correctly', () => {
    render(
      <GradientBorderCard>
        <div data-testid="child-content">Child Content</div>
      </GradientBorderCard>
    );
    
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('renders complex children content', () => {
    render(
      <GradientBorderCard>
        <div>
          <h1>Title</h1>
          <p>Paragraph</p>
          <button>Button</button>
        </div>
      </GradientBorderCard>
    );
    
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  it('handles null children gracefully', () => {
    render(
      <GradientBorderCard>
        {null}
      </GradientBorderCard>
    );
    
    expect(screen.getByText('暂无内容')).toBeInTheDocument();
  });

  it('handles undefined children gracefully', () => {
    render(
      <GradientBorderCard>
        {undefined}
      </GradientBorderCard>
    );
    
    expect(screen.getByText('暂无内容')).toBeInTheDocument();
  });

  it('renders numeric children', () => {
    render(
      <GradientBorderCard>
        {42}
      </GradientBorderCard>
    );
    
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders string children', () => {
    render(
      <GradientBorderCard>
        Simple text content
      </GradientBorderCard>
    );
    
    expect(screen.getByText('Simple text content')).toBeInTheDocument();
  });

  it('applies preset padding correctly', () => {
    const { container } = render(
      <GradientBorderCard padding={PADDING_PRESETS.large}>
        <div>Content</div>
      </GradientBorderCard>
    );
    
    const innerContainer = container.querySelector('div > div');
    expect(innerContainer).toHaveStyle({
      padding: '2rem'
    });
  });

  it('handles numeric padding by adding px unit', () => {
    const { container } = render(
      <GradientBorderCard padding="20">
        <div>Content</div>
      </GradientBorderCard>
    );
    
    const innerContainer = container.querySelector('div > div');
    expect(innerContainer).toHaveStyle({
      padding: '20px'
    });
  });

  it('handles invalid padding by falling back to default', () => {
    const { container } = render(
      <GradientBorderCard padding="invalid-padding">
        <div>Content</div>
      </GradientBorderCard>
    );
    
    const innerContainer = container.querySelector('div > div');
    expect(innerContainer).toHaveStyle({
      padding: '1.5rem'
    });
  });

  it('applies preset shadow effects correctly', () => {
    render(
      <GradientBorderCard shadow="small">
        <div>Content</div>
      </GradientBorderCard>
    );
    
    const container = screen.getByRole('region');
    expect(container).toHaveStyle({
      boxShadow: SHADOW_PRESETS.small
    });
  });

  it('applies large shadow when shadow is true', () => {
    render(
      <GradientBorderCard shadow={true}>
        <div>Content</div>
      </GradientBorderCard>
    );
    
    const container = screen.getByRole('region');
    expect(container).toHaveStyle({
      boxShadow: SHADOW_PRESETS.large
    });
  });

  it('removes shadow when shadow is false', () => {
    render(
      <GradientBorderCard shadow={false}>
        <div>Content</div>
      </GradientBorderCard>
    );
    
    const container = screen.getByRole('region');
    expect(container).not.toHaveStyle({
      boxShadow: expect.any(String)
    });
  });

  it('removes shadow when shadow is "none"', () => {
    render(
      <GradientBorderCard shadow="none">
        <div>Content</div>
      </GradientBorderCard>
    );
    
    const container = screen.getByRole('region');
    expect(container).not.toHaveStyle({
      boxShadow: expect.any(String)
    });
  });

  it('applies custom shadow string', () => {
    const customShadow = '0 4px 8px rgba(255, 0, 0, 0.3)';
    render(
      <GradientBorderCard shadow={customShadow}>
        <div>Content</div>
      </GradientBorderCard>
    );
    
    const container = screen.getByRole('region');
    expect(container).toHaveStyle({
      boxShadow: customShadow
    });
  });

  it('applies all preset shadow sizes correctly', () => {
    Object.entries(SHADOW_PRESETS).forEach(([key, value]) => {
      if (key === 'none') return;
      
      const { container } = render(
        <GradientBorderCard shadow={key as any}>
          <div>Content</div>
        </GradientBorderCard>
      );
      
      const element = container.querySelector('[role="region"]');
      expect(element).toHaveStyle({
        boxShadow: value
      });
    });
  });
});