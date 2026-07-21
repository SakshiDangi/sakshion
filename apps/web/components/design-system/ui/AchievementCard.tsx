import React from 'react';
import { Lock } from 'lucide-react';
import Badge from './Badge';

interface AchievementCardProps {
  id: string;
  title: string;
  description: string;
  icon?: string;
  earnedAt?: string;
  locked?: boolean;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  xpValue?: number;
  className?: string;
  compact?: boolean;
}

const rarityConfig = {
  common: { label: 'Common', border: 'border-border', glow: '', badge: 'muted' as const, color: 'text-muted-foreground' },
  rare: { label: 'Rare', border: 'border-primary/30', glow: 'shadow-glow-primary', badge: 'primary' as const, color: 'text-primary' },
  epic: { label: 'Epic', border: 'border-purple/30', glow: 'shadow-glow-purple', badge: 'purple' as const, color: 'text-purple' },
  legendary: { label: 'Legendary', border: 'border-warning/40', glow: 'shadow-glow-warning', badge: 'warning' as const, color: 'text-warning' },
};

export default function AchievementCard({
  id,
  title,
  description,
  icon = '🏆',
  earnedAt,
  locked = false,
  rarity = 'common',
  xpValue,
  className = '',
  compact = false,
}: AchievementCardProps) {
  const rc = rarityConfig[rarity];

  if (compact) {
    return (
      <div
        key={id}
        className={`
          flex items-center gap-3 p-3 rounded-[12px] bg-surface border transition-all duration-150
          ${locked ? 'opacity-40 border-border' : `${rc.border} hover:-translate-y-0.5 ${rc.glow}`}
          ${className}
        `}
      >
        <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 ${locked ? 'bg-surface-elevated' : 'bg-surface-elevated'}`}>
          {locked ? <Lock size={14} className="text-muted-foreground" /> : <span className="text-lg">{icon}</span>}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-600 text-foreground truncate">{title}</p>
          {earnedAt && <p className="text-2xs text-muted-foreground">{earnedAt}</p>}
        </div>
        <Badge variant={rc.badge} size="sm">{rc.label}</Badge>
      </div>
    );
  }

  return (
    <div
      className={`
        relative bg-surface border rounded-[14px] p-5 text-center transition-all duration-200
        ${locked ? 'opacity-40 border-border' : `${rc.border} hover:-translate-y-1 ${rc.glow} cursor-pointer`}
        ${className}
      `}
    >
      {!locked && rarity === 'legendary' && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-warning via-orange-400 to-warning rounded-t-[14px]" />
      )}

      <div className={`w-14 h-14 rounded-[14px] flex items-center justify-center mx-auto mb-3 ${locked ? 'bg-surface-elevated' : 'bg-surface-elevated border border-border'}`}>
        {locked ? <Lock size={20} className="text-muted-foreground" /> : <span className="text-3xl">{icon}</span>}
      </div>

      <Badge variant={rc.badge} size="sm" className="mb-2">{rc.label}</Badge>
      <h3 className="text-sm font-700 text-foreground mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>

      {xpValue && !locked && (
        <div className="mt-3 text-xs font-600 text-warning">+{xpValue} XP</div>
      )}
      {earnedAt && !locked && (
        <p className="text-2xs text-muted-foreground mt-1">{earnedAt}</p>
      )}
    </div>
  );
}