'use client';
import React from 'react';
import { Lock, CheckCircle2, Play, Clock, Star, ChevronRight, Zap } from 'lucide-react';
import ProgressBar from './ProgressBar';
import Badge from './Badge';

type MissionStatus = 'locked' | 'available' | 'in_progress' | 'completed' | 'mastered';

interface MissionCardProps {
  id: string;
  title: string;
  description: string;
  status: MissionStatus;
  progress?: number;
  xpReward: number;
  estimatedMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  tags?: string[];
  moduleCount?: number;
  onStart?: () => void;
  onContinue?: () => void;
  featured?: boolean;
  className?: string;
}

const statusConfig: Record<MissionStatus, { icon: React.ElementType; label: string; color: string; bg: string }> = {
  locked: { icon: Lock, label: 'Locked', color: 'text-muted-foreground', bg: 'bg-surface-elevated' },
  available: { icon: Play, label: 'Start', color: 'text-primary', bg: 'bg-primary/10' },
  in_progress: { icon: Play, label: 'Continue', color: 'text-cyan', bg: 'bg-cyan/10' },
  completed: { icon: CheckCircle2, label: 'Completed', color: 'text-success', bg: 'bg-success/10' },
  mastered: { icon: Star, label: 'Mastered', color: 'text-warning', bg: 'bg-warning/10' },
};

const difficultyConfig: Record<string, { label: string; variant: 'success' | 'primary' | 'warning' | 'danger' }> = {
  beginner: { label: 'Beginner', variant: 'success' },
  intermediate: { label: 'Intermediate', variant: 'primary' },
  advanced: { label: 'Advanced', variant: 'warning' },
  expert: { label: 'Expert', variant: 'danger' },
};

export default function MissionCard({
  id,
  title,
  description,
  status,
  progress = 0,
  xpReward,
  estimatedMinutes,
  difficulty,
  tags = [],
  moduleCount,
  onStart,
  onContinue,
  featured = false,
  className = '',
}: MissionCardProps) {
  const sc = statusConfig[status];
  const dc = difficultyConfig[difficulty] ?? {
    label: "Unknown",
    variant: "primary",
  };
  const StatusIcon = sc.icon;
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed' || status === 'mastered';

  return (
    <div
      className={`
        relative bg-surface border rounded-[14px] overflow-hidden
        transition-all duration-200 group
        ${isLocked ? 'border-border opacity-60' : 'border-border hover:-translate-y-1 hover:border-primary/30 hover:shadow-glow-primary cursor-pointer'}
        ${featured ? 'border-primary/30' : ''}
        ${className}
      `}
    >
      {/* Featured gradient top bar */}
      {featured && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-primary" />
      )}

      {/* Locked overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-[14px]">
          <Lock size={24} className="text-muted-foreground" />
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <Badge variant={dc.variant} size="sm">{dc.label}</Badge>
              {featured && <Badge variant="purple" size="sm">Featured</Badge>}
              {status === 'in_progress' && <Badge variant="cyan" size="sm" dot>In Progress</Badge>}
              {status === 'mastered' && <Badge variant="warning" size="sm">⭐ Mastered</Badge>}
            </div>
            <h3 className="text-sm font-700 text-foreground leading-snug truncate">{title}</h3>
          </div>
          <div className={`p-2 rounded-[10px] flex-shrink-0 ${sc.bg}`}>
            <StatusIcon size={16} className={sc.color} />
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">{description}</p>

        {/* Progress */}
        {(status === 'in_progress') && (
          <div className="mb-3">
            <ProgressBar
              value={progress}
              variant="cyan"
              size="xs"
              showLabel
              glow
            />
          </div>
        )}

        {isCompleted && (
          <div className="mb-3">
            <ProgressBar value={100} variant="success" size="xs" glow />
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={`tag-${id}-${tag}`}
                className="text-2xs px-2 py-0.5 rounded-full bg-surface-elevated text-muted-foreground border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Zap size={11} className="text-warning" />
              <span className="tabular-nums font-600 text-warning">{xpReward} XP</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {estimatedMinutes}m
            </span>
            {moduleCount && (
              <span>{moduleCount} modules</span>
            )}
          </div>

          {!isLocked && (
            <button
              onClick={status === 'in_progress' ? onContinue : onStart}
              className={`
                flex items-center gap-1 text-xs font-600 transition-all duration-150
                ${isCompleted ? 'text-success' : 'text-primary hover:text-primary/80'}
              `}
            >
              {isCompleted ? 'Review' : sc.label}
              <ChevronRight size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}