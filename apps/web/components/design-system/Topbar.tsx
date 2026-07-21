'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Bell,
  Menu,
  Command,
  ChevronDown,
  Zap,
  LogOut,
  User,
  Settings,
  HelpCircle,
  X,
} from 'lucide-react';


interface TopbarProps {
  onMenuToggle: () => void;
  userRole: 'learner' | 'instructor';
}

const learnerNotifications = [
  { id: 'notif-001', title: 'Mission Completed!', body: 'You finished "React Hooks Deep Dive"', time: '2m ago', read: false, type: 'success' },
  { id: 'notif-002', title: 'New Achievement', body: 'Earned "7-Day Streak" badge 🔥', time: '1h ago', read: false, type: 'achievement' },
  { id: 'notif-003', title: 'Cohort Update', body: 'Your instructor posted new content', time: '3h ago', read: true, type: 'info' },
];

const instructorNotifications = [
  { id: 'notif-i-001', title: 'Student at Risk', body: 'Arjun Mehta has not logged in for 5 days', time: '30m ago', read: false, type: 'danger' },
  { id: 'notif-i-002', title: 'Cohort Milestone', body: 'Cohort B reached 75% completion', time: '2h ago', read: false, type: 'success' },
  { id: 'notif-i-003', title: 'New Enrollment', body: '3 new students joined "Advanced ML"', time: '5h ago', read: true, type: 'info' },
];

export default function Topbar({ onMenuToggle, userRole }: TopbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const notifications = userRole === 'learner' ? learnerNotifications : instructorNotifications;
  const unreadCount = notifications.filter(n => !n.read).length;

  const notifTypeColor: Record<string, string> = {
    success: 'bg-success',
    achievement: 'bg-warning',
    danger: 'bg-danger',
    info: 'bg-primary',
  };

  return (
    <header className="h-16 flex-shrink-0 flex items-center gap-4 px-6 border-b border-border surface-glass sticky top-0 z-10">
      {/* Mobile menu */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-[8px] text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition-all"
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className={`flex-1 max-w-md relative transition-all duration-200 ${searchFocused ? 'max-w-lg' : ''}`}>
        <div className={`
          flex items-center gap-2 px-3 py-2 rounded-[10px] border transition-all duration-200
          ${searchFocused
            ? 'bg-surface-elevated border-primary/40 shadow-glow-primary'
            : 'bg-surface-elevated border-border hover:border-border/80'
          }
        `}>
          <Search size={15} className="text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder="Search missions, paths, topics..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <div className="flex items-center gap-1 flex-shrink-0">
            <kbd className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-[4px] bg-surface border border-border text-2xs text-muted-foreground font-mono">
              <Command size={9} />K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* XP indicator — learner only */}
        {userRole === 'learner' && (
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-warning/10 border border-warning/20">
            <Zap size={13} className="text-warning" />
            <span className="text-xs font-600 text-warning tabular-nums">4,820 XP</span>
          </div>
        )}

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className="relative p-2 rounded-[10px] text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition-all"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full">
                <span className="absolute inset-0 rounded-full bg-danger animate-pulse-ring" />
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 surface-glass-elevated rounded-[14px] shadow-modal overflow-hidden z-50 scale-in">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <span className="text-sm font-600 text-foreground">Notifications</span>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <span className="text-2xs font-600 px-1.5 py-0.5 rounded-full bg-primary/20 text-primary">{unreadCount} new</span>
                  )}
                  <button onClick={() => setNotifOpen(false)} className="text-muted-foreground hover:text-foreground">
                    <X size={14} />
                  </button>
                </div>
              </div>
              <div className="divide-y divide-border">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 flex gap-3 hover:bg-surface-elevated transition-colors cursor-pointer ${!n.read ? 'bg-primary/5' : ''}`}
                  >
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${notifTypeColor[n.type] || 'bg-primary'} ${!n.read ? '' : 'opacity-30'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-500 text-foreground truncate">{n.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{n.body}</p>
                      <p className="text-2xs text-muted-foreground mt-1">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-border">
                <button className="text-xs text-primary hover:text-primary/80 transition-colors">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-[10px] hover:bg-surface-elevated transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-700 text-white">
                {userRole === 'learner' ? 'KS' : 'PM'}
              </span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-600 text-foreground leading-tight">
                {userRole === 'learner' ? 'Kiran Sharma' : 'Priya Malhotra'}
              </p>
              <p className="text-2xs text-muted-foreground capitalize">{userRole}</p>
            </div>
            <ChevronDown size={14} className="text-muted-foreground hidden md:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 surface-glass-elevated rounded-[14px] shadow-modal overflow-hidden z-50 scale-in">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-600 text-foreground">
                  {userRole === 'learner' ? 'Kiran Sharma' : 'Priya Malhotra'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {userRole === 'learner' ? 'kiran@example.dev' : 'priya@example.dev'}
                </p>
              </div>
              <div className="py-1">
                {[
                  { icon: User, label: 'Profile', id: 'pm-profile' },
                  { icon: Settings, label: 'Settings', id: 'pm-settings' },
                  { icon: HelpCircle, label: 'Help & Support', id: 'pm-help' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition-all"
                    >
                      <Icon size={15} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
              <div className="border-t border-border py-1">
                <Link
                  href="/sign-up-login-screen"
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-danger/10 transition-all"
                >
                  <LogOut size={15} />
                  Sign Out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}