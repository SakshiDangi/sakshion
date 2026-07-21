'use client';
import React from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'gradient';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  glow?: boolean;
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-primary text-primary-foreground font-600
    hover:bg-primary/90 active:bg-primary/80
    shadow-glow-primary hover:shadow-[0_0_28px_var(--primary-glow)]
  `,
  secondary: `
    bg-surface-elevated text-foreground font-500 border border-border
    hover:bg-surface-elevated/80 hover:border-primary/30 active:bg-surface
  `,
  ghost: `
    bg-transparent text-muted-foreground font-500
    hover:bg-surface-elevated hover:text-foreground active:bg-surface
  `,
  danger: `
    bg-danger/15 text-danger font-600 border border-danger/25
    hover:bg-danger/25 hover:border-danger/40 active:bg-danger/20
    shadow-glow-danger
  `,
  success: `
    bg-success/15 text-success font-600 border border-success/25
    hover:bg-success/25 hover:border-success/40
    shadow-glow-success
  `,
  gradient: `
    bg-gradient-primary text-white font-600
    hover:opacity-90 active:opacity-80
    shadow-[0_4px_24px_rgba(91,140,255,0.3)]
    hover:shadow-[0_6px_32px_rgba(91,140,255,0.45)]
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-xs px-3 py-1.5 gap-1.5 rounded-[8px] h-8',
  md: 'text-sm px-4 py-2 gap-2 rounded-[10px] h-9',
  lg: 'text-sm px-6 py-2.5 gap-2.5 rounded-[12px] h-11',
  icon: 'p-2 rounded-[10px] h-9 w-9',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  glow = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center
        transition-all duration-150 cursor-pointer
        active:scale-[0.97]
        disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${glow && !isDisabled ? 'animate-glow-pulse' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <Loader2 size={size === 'sm' ? 13 : 15} className="animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="flex-shrink-0">{icon}</span>
          )}
          {children && <span>{children}</span>}
          {icon && iconPosition === 'right' && (
            <span className="flex-shrink-0">{icon}</span>
          )}
        </>
      )}
    </button>
  );
}