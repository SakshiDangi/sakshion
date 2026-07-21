'use client';
import React, { useState } from 'react';

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  variant?: 'default' | 'pill' | 'underline';
  className?: string;
}

export default function Tabs({ tabs, defaultTab, variant = 'default', className = '' }: TabsProps) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id);
  const activeTab = tabs.find(t => t.id === active);

  const tabBarStyles: Record<
    'default' | 'pill' | 'underline',
    string
  > = {    
    default: 'bg-surface-elevated border border-border p-1 rounded-[12px]',
    pill: 'gap-1',
    underline: 'border-b border-border gap-6',
  };

  const tabItemBase = 'inline-flex items-center gap-2 text-sm font-500 transition-all duration-150 cursor-pointer';

  const tabItemStyles: Record<
    'default' | 'pill' | 'underline',
    {
      active: string;
      inactive: string;
      wrapper: string;
    }
  > = {
    default: {
      active: 'bg-surface text-foreground rounded-[9px] shadow-card',
      inactive: 'text-muted-foreground hover:text-foreground rounded-[9px]',
      wrapper: 'px-3 py-1.5',
    },
    pill: {
      active: 'bg-primary/15 text-primary border border-primary/25 rounded-full',
      inactive: 'text-muted-foreground hover:text-foreground bg-surface-elevated border border-border rounded-full',
      wrapper: 'px-4 py-1.5',
    },
    underline: {
      active: 'text-foreground border-b-2 border-primary pb-3',
      inactive: 'text-muted-foreground hover:text-foreground pb-3',
      wrapper: '',
    },
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`flex items-center ${tabBarStyles[variant]}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`
              ${tabItemBase}
              ${tabItemStyles[variant].wrapper}
              ${active === tab.id
                ? tabItemStyles[variant].active
                : tabItemStyles[variant].inactive
              }
            `}
          >
            {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
            {tab.label}
            {tab.badge !== undefined && (
              <span className={`text-2xs font-600 px-1.5 py-0.5 rounded-full tabular-nums ${
                active === tab.id ? 'bg-primary/20 text-primary' : 'bg-surface text-muted-foreground'
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="mt-4 fade-in">
        {activeTab?.content}
      </div>
    </div>
  );
}