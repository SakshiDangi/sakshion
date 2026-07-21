import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  accent?: 'primary' | 'purple' | 'cyan';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const accentBar: Record<string, string> = {
  primary: 'bg-primary',
  purple: 'bg-purple',
  cyan: 'bg-cyan',
};

const titleSize = {
  sm: 'text-base font-600',
  md: 'text-lg font-700',
  lg: 'text-2xl font-700',
};

export default function SectionHeader({
  title,
  subtitle,
  action,
  accent = 'primary',
  className = '',
  size = 'md',
}: SectionHeaderProps) {
  return (
    <div className={`flex items-start justify-between gap-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className={`w-1 h-full min-h-[20px] rounded-full ${accentBar[accent]} flex-shrink-0 mt-0.5`} />
        <div>
          <h2 className={`${titleSize[size]} text-foreground leading-tight`}>{title}</h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}