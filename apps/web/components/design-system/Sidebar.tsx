'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from './ui/AppLogo';
import { LayoutDashboard, Compass, Trophy, BookOpen, Users, BarChart3, Settings, ChevronLeft, ChevronRight, MessageSquare, GraduationCap, Target, Layers,  } from 'lucide-react';


interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  userRole: 'learner' | 'instructor';
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  group?: string;
}

const learnerNav: NavItem[] = [
  { id: 'nav-learner-dashboard', label: 'Dashboard', href: '/', icon: LayoutDashboard, group: 'main' },
  { id: 'nav-learner-missions', label: 'Missions', href: '/missions', icon: Target, badge: 3, group: 'main' },
  { id: 'nav-learner-paths', label: 'Learning Paths', href: '/paths', icon: Compass, group: 'main' },
  { id: 'nav-learner-library', label: 'Library', href: '/library', icon: BookOpen, group: 'main' },
  { id: 'nav-learner-achievements', label: 'Achievements', href: '/achievements', icon: Trophy, group: 'progress' },
  { id: 'nav-learner-leaderboard', label: 'Leaderboard', href: '/leaderboard', icon: BarChart3, group: 'progress' },
  { id: 'nav-learner-community', label: 'Community', href: '/community', icon: MessageSquare, badge: 5, group: 'social' },
  { id: 'nav-learner-settings', label: 'Settings', href: '/settings', icon: Settings, group: 'bottom' },
];

const instructorNav: NavItem[] = [
  { id: 'nav-inst-dashboard', label: 'Dashboard', href: '/instructor-dashboard', icon: LayoutDashboard, group: 'main' },
  { id: 'nav-inst-cohorts', label: 'Cohorts', href: '/cohorts', icon: Users, group: 'main' },
  { id: 'nav-inst-courses', label: 'Courses', href: '/courses', icon: GraduationCap, group: 'main' },
  { id: 'nav-inst-modules', label: 'Modules', href: '/modules', icon: Layers, group: 'main' },
  { id: 'nav-inst-analytics', label: 'Analytics', href: '/analytics', icon: BarChart3, group: 'insights' },
  { id: 'nav-inst-students', label: 'Students', href: '/students', icon: Users, badge: 2, group: 'insights' },
  { id: 'nav-inst-messages', label: 'Messages', href: '/messages', icon: MessageSquare, badge: 8, group: 'social' },
  { id: 'nav-inst-settings', label: 'Settings', href: '/settings', icon: Settings, group: 'bottom' },
];

const groupLabels: Record<string, string> = {
  main: 'Main',
  progress: 'Progress',
  insights: 'Insights',
  social: 'Social',
  bottom: '',
};

export default function Sidebar({ collapsed, onToggle, userRole }: SidebarProps) {
  const pathname = usePathname();
  const navItems = userRole === 'learner' ? learnerNav : instructorNav;
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const groups = navItems.reduce<Record<string, NavItem[]>>((acc, item) => {
    const g = item.group || 'main';
    if (!acc[g]) acc[g] = [];
    acc[g].push(item);
    return acc;
  }, {});

  const mainGroups = Object.entries(groups).filter(([g]) => g !== 'bottom');
  const bottomItems = groups['bottom'] || [];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`
        relative flex flex-col h-full bg-surface border-r border-border
        sidebar-transition flex-shrink-0 z-20
        ${collapsed ? 'w-16' : 'w-60'}
      `}
    >
      {/* Subtle top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-primary opacity-60" />

      {/* Logo */}
      <div className={`flex items-center h-16 px-3 border-b border-border flex-shrink-0 ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <div className="flex items-center gap-2 flex-shrink-0">
          <AppLogo size={32} />
          {!collapsed && (
            <span className="font-bold text-base tracking-tight text-foreground">
              Sakshion
            </span>
          )}
        </div>
      </div>

      {/* Nav Groups */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 space-y-1">
        {mainGroups.map(([group, items]) => (
          <div key={`group-${group}`} className="mb-4">
            {!collapsed && groupLabels[group] && (
              <p className="text-2xs font-600 uppercase tracking-widest text-muted-foreground px-3 mb-2 opacity-60">
                {groupLabels[group]}
              </p>
            )}
            <div className="space-y-0.5">
              {items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <div key={item.id} className="relative">
                    <Link
                      href={item.href}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`
                        relative flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium
                        transition-all duration-150 group
                        ${collapsed ? 'justify-center' : ''}
                        ${active
                          ? 'bg-primary/10 text-primary shadow-glow-primary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-surface-elevated'
                        }
                      `}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-full" />
                      )}
                      <Icon
                        size={18}
                        className={`flex-shrink-0 transition-colors ${active ? 'text-primary' : ''}`}
                      />
                      {!collapsed && (
                        <span className="flex-1 truncate">{item.label}</span>
                      )}
                      {!collapsed && item.badge && (
                        <span className="ml-auto bg-primary/20 text-primary text-2xs font-600 px-1.5 py-0.5 rounded-full tabular-nums">
                          {item.badge}
                        </span>
                      )}
                      {collapsed && item.badge && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                      )}
                    </Link>

                    {/* Tooltip for collapsed state */}
                    {collapsed && hoveredItem === item.id && (
                      <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
                        <div className="surface-glass px-3 py-1.5 rounded-[8px] text-sm font-medium text-foreground whitespace-nowrap shadow-modal">
                          {item.label}
                          {item.badge && (
                            <span className="ml-2 text-primary text-2xs">({item.badge})</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom items */}
      <div className="px-2 pb-4 border-t border-border pt-3 space-y-0.5">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium
                transition-all duration-150
                ${collapsed ? 'justify-center' : ''}
                ${active
                  ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-surface-elevated'
                }
              `}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
            </Link>
          );
        })}

        {/* Role indicator */}
        {!collapsed && (
          <div className="mt-3 mx-1 px-3 py-2 rounded-[10px] bg-surface-elevated border border-border">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${userRole === 'learner' ? 'bg-success animate-pulse' : 'bg-purple animate-pulse'}`} />
              <span className="text-xs text-muted-foreground capitalize">{userRole} mode</span>
            </div>
          </div>
        )}
      </div>

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 bg-surface border border-border rounded-full flex items-center justify-center
          text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-150 z-30"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}