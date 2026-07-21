import React from 'react';

interface TimelineItemProps {
  id: string;
  title: string;
  subtitle?: string;
  timestamp: string;
  icon?: React.ReactNode;
  accent?: 'primary' | 'purple' | 'cyan' | 'success' | 'warning' | 'danger';
  isLast?: boolean;
  badge?: string;
}

const accentDot: Record<string, string> = {
  primary: 'bg-primary shadow-glow-primary',
  purple: 'bg-purple shadow-glow-purple',
  cyan: 'bg-cyan shadow-glow-cyan',
  success: 'bg-success shadow-glow-success',
  warning: 'bg-warning shadow-glow-warning',
  danger: 'bg-danger shadow-glow-danger',
};

export default function TimelineItem({
  id,
  title,
  subtitle,
  timestamp,
  icon,
  accent = 'primary',
  isLast = false,
  badge,
}: TimelineItemProps) {
  return (
    <div key={id} className="flex gap-4">
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${accentDot[accent]}`} />
        {!isLast && <div className="w-px flex-1 bg-border mt-1.5 min-h-[20px]" />}
      </div>
      <div className={`pb-4 ${isLast ? '' : ''} flex-1 min-w-0`}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {icon && <span className="text-muted-foreground flex-shrink-0">{icon}</span>}
            <p className="text-sm font-500 text-foreground truncate">{title}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {badge && (
              <span className="text-2xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-600">{badge}</span>
            )}
            <span className="text-2xs text-muted-foreground">{timestamp}</span>
          </div>
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5 ml-0">{subtitle}</p>
        )}
      </div>
    </div>
  );
}