import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

type MetricTrend = 'up' | 'down' | 'neutral';
type MetricAccent = 'primary' | 'purple' | 'cyan' | 'success' | 'warning' | 'danger';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: MetricTrend;
  trendValue?: string;
  trendLabel?: string;
  icon?: React.ReactNode;
  accent?: MetricAccent;
  subValue?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const accentColors: Record<MetricAccent, { icon: string; bg: string; border: string; glow: string }> = {
  primary: { icon: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', glow: 'shadow-glow-primary' },
  purple: { icon: 'text-purple', bg: 'bg-purple/10', border: 'border-purple/20', glow: 'shadow-glow-purple' },
  cyan: { icon: 'text-cyan', bg: 'bg-cyan/10', border: 'border-cyan/20', glow: 'shadow-glow-cyan' },
  success: { icon: 'text-success', bg: 'bg-success/10', border: 'border-success/20', glow: 'shadow-glow-success' },
  warning: { icon: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20', glow: 'shadow-glow-warning' },
  danger: { icon: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20', glow: 'shadow-glow-danger' },
};

export default function MetricCard({
  label,
  value,
  unit,
  trend,
  trendValue,
  trendLabel,
  icon,
  accent = 'primary',
  subValue,
  className = '',
  size = 'md',
}: MetricCardProps) {
  const colors = accentColors[accent];

  const trendIcon = trend === 'up'
    ? <TrendingUp size={12} />
    : trend === 'down'
    ? <TrendingDown size={12} />
    : <Minus size={12} />;

  const trendColor = trend === 'up' ?'text-success bg-success/10'
    : trend === 'down' ?'text-danger bg-danger/10' :'text-muted-foreground bg-surface-elevated';

  return (
    <div
      className={`
        bg-surface border rounded-[14px] p-5 card-hover
        ${colors.border} ${colors.glow}
        ${className}
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-[10px] ${colors.bg}`}>
          <span className={colors.icon}>{icon}</span>
        </div>
        {trend && trendValue && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-2xs font-600 ${trendColor}`}>
            {trendIcon}
            {trendValue}
          </div>
        )}
      </div>
      <div className={`font-800 tabular-nums text-foreground leading-none mb-1 ${size === 'lg' ? 'text-4xl' : size === 'sm' ? 'text-2xl' : 'text-3xl'}`}>
        {value}
        {unit && <span className="text-base font-500 text-muted-foreground ml-1">{unit}</span>}
      </div>
      <p className="text-sm text-muted-foreground font-500">{label}</p>
      {subValue && (
        <p className="text-xs text-muted-foreground mt-1">{subValue}</p>
      )}
      {trendLabel && (
        <p className="text-2xs text-muted-foreground mt-1">{trendLabel}</p>
      )}
    </div>
  );
}