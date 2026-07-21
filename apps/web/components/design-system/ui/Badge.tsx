import React from 'react';

type BadgeVariant = 'primary' | 'purple' | 'cyan' | 'success' | 'warning' | 'danger' | 'muted' | 'outline';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-primary/15 text-primary border border-primary/25',
  purple: 'bg-purple/15 text-purple border border-purple/25',
  cyan: 'bg-cyan/15 text-cyan border border-cyan/25',
  success: 'bg-success/15 text-success border border-success/25',
  warning: 'bg-warning/15 text-warning border border-warning/25',
  danger: 'bg-danger/15 text-danger border border-danger/25',
  muted: 'bg-surface-elevated text-muted-foreground border border-border',
  outline: 'bg-transparent text-foreground border border-border',
};

const dotColors: Record<BadgeVariant, string> = {
  primary: 'bg-primary',
  purple: 'bg-purple',
  cyan: 'bg-cyan',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  muted: 'bg-muted-foreground',
  outline: 'bg-foreground',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-2xs px-1.5 py-0.5 gap-1',
  md: 'text-xs px-2 py-1 gap-1.5',
  lg: 'text-sm px-3 py-1.5 gap-2',
};

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center font-600 rounded-full
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {dot && (
        <span className={`rounded-full flex-shrink-0 ${dotColors[variant]} ${size === 'sm' ? 'w-1 h-1' : 'w-1.5 h-1.5'}`} />
      )}
      {children}
    </span>
  );
}