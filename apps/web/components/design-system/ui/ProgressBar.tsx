'use client';
import { useEffect, useState } from 'react';

type ProgressVariant = 'primary' | 'purple' | 'cyan' | 'success' | 'warning' | 'danger' | 'gradient';

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  className?: string;
  glow?: boolean;
}

const variantFill: Record<ProgressVariant, string> = {
  primary: 'bg-primary',
  purple: 'bg-purple',
  cyan: 'bg-cyan',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  gradient: 'bg-gradient-primary',
};

const variantGlow: Record<ProgressVariant, string> = {
  primary: 'shadow-[0_0_8px_var(--primary-glow)]',
  purple: 'shadow-[0_0_8px_var(--purple-glow)]',
  cyan: 'shadow-[0_0_8px_var(--cyan-glow)]',
  success: 'shadow-[0_0_8px_var(--success-glow)]',
  warning: 'shadow-[0_0_8px_var(--warning-glow)]',
  danger: 'shadow-[0_0_8px_var(--danger-glow)]',
  gradient: 'shadow-[0_0_8px_var(--primary-glow)]',
};

const sizeStyles = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

export default function ProgressBar({
  value,
  max = 100,
  variant = 'primary',
  size = 'sm',
  showLabel = false,
  label,
  animated = true,
  className = '',
  glow = false,
}: ProgressBarProps) {
  const [displayed, setDisplayed] = useState(0);
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  useEffect(() => {
    const timer = setTimeout(() => setDisplayed(pct), 100);
    return () => clearTimeout(timer);
  }, [pct]);

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs text-muted-foreground">{label}</span>}
          {showLabel && (
            <span className="text-xs font-600 text-foreground tabular-nums ml-auto">{Math.round(pct)}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-surface-elevated rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className={`
            h-full rounded-full transition-all duration-700 ease-spring
            ${variantFill[variant]}
            ${glow ? variantGlow[variant] : ''}
          `}
          style={{ width: `${animated ? displayed : pct}%` }}
        />
      </div>
    </div>
  );
}