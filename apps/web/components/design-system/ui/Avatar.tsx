import React from 'react';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

interface AvatarProps {
  name: string;
  src?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: string;
  accent?: 'primary' | 'purple' | 'cyan' | 'success' | 'warning';
}

const sizeStyles: Record<AvatarSize, { outer: string; text: string; status: string }> = {
  xs: { outer: 'w-6 h-6', text: 'text-2xs', status: 'w-1.5 h-1.5 -bottom-0 -right-0' },
  sm: { outer: 'w-8 h-8', text: 'text-xs', status: 'w-2 h-2 bottom-0 right-0' },
  md: { outer: 'w-10 h-10', text: 'text-sm', status: 'w-2.5 h-2.5 bottom-0 right-0' },
  lg: { outer: 'w-12 h-12', text: 'text-base', status: 'w-3 h-3 bottom-0.5 right-0.5' },
  xl: { outer: 'w-16 h-16', text: 'text-xl', status: 'w-3.5 h-3.5 bottom-1 right-1' },
};

const accentGradients = {
  primary: 'from-primary to-primary-dim',
  purple: 'from-purple to-purple-dim',
  cyan: 'from-cyan to-cyan-dim',
  success: 'from-success to-success-dim',
  warning: 'from-warning to-warning-dim',
};

const statusColors: Record<AvatarStatus, string> = {
  online: 'bg-success',
  offline: 'bg-muted-foreground',
  away: 'bg-warning',
  busy: 'bg-danger',
};

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

export default function Avatar({
  name,
  src,
  size = 'md',
  status,
  className = '',
  accent = 'primary',
}: AvatarProps) {
  const { outer, text, status: statusSize } = sizeStyles[size];

  return (
    <div className={`relative inline-flex flex-shrink-0 ${outer} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={`${name} avatar`}
          width={40}
          height={40}
          className={`${outer} rounded-full object-cover`}
        />
      ) : (
        <div
          className={`
            ${outer} rounded-full flex items-center justify-center font-700
            bg-gradient-to-br ${accentGradients[accent]} text-white
          `}
        >
          <span className={text}>{getInitials(name)}</span>
        </div>
      )}
      {status && (
        <span
          className={`absolute ${statusSize} rounded-full ${statusColors[status]} border-2 border-surface`}
        />
      )}
    </div>
  );
}