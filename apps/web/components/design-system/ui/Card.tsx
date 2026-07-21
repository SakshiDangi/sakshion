import React from 'react';

type CardVariant = 'default' | 'glass' | 'elevated' | 'glow' | 'gradient-border';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  hover?: boolean;
  className?: string;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-surface border border-border shadow-card',
  glass: 'surface-glass shadow-card',
  elevated: 'bg-surface-elevated border border-border shadow-card',
  glow: 'bg-surface border border-primary/20 shadow-glow-primary',
  'gradient-border': 'bg-surface relative overflow-hidden',
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

export default function Card({
  children,
  variant = 'default',
  hover = false,
  className = '',
  onClick,
  padding = 'md',
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-[14px]
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${hover ? 'card-hover cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {variant === 'gradient-border' && (
        <div className="absolute inset-0 rounded-[14px] p-px bg-gradient-primary opacity-30 pointer-events-none">
          <div className="w-full h-full rounded-[13px] bg-surface" />
        </div>
      )}
      {children}
    </div>
  );
}