'use client';
import React from 'react';

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  variant?: 'primary' | 'purple' | 'cyan' | 'success' | 'gradient';
  showValue?: boolean;
  className?: string;
}

const variantColors: Record<string, string> = {
  primary: 'var(--primary)',
  purple: 'var(--purple)',
  cyan: 'var(--cyan)',
  success: 'var(--success)',
  gradient: 'url(#circularGradient)',
};

export default function CircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  label,
  sublabel,
  variant = 'primary',
  showValue = true,
  className = '',
}: CircularProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (pct / 100) * circumference;
  const center = size / 2;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="circularGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--purple)" />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--surface-elevated)"
          strokeWidth={strokeWidth}
        />
        {/* Fill */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={variantColors[variant]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          className="transition-all duration-700 ease-spring"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showValue && (
          <span className="text-lg font-800 text-foreground tabular-nums leading-none">
            {Math.round(pct)}%
          </span>
        )}
        {label && <span className="text-xs text-muted-foreground mt-0.5 text-center leading-tight">{label}</span>}
        {sublabel && <span className="text-2xs text-muted-foreground text-center">{sublabel}</span>}
      </div>
    </div>
  );
}