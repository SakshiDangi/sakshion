'use client';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface AppLayoutProps {
  children: React.ReactNode;
  userRole?: 'learner' | 'instructor';
}

export default function AppLayout({ children, userRole = 'learner' }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        userRole={userRole}
      />
      <div
        className="flex flex-col flex-1 min-w-0 transition-all duration-300 ease-spring"
      >
        <Topbar
          onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          userRole={userRole}
        />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="px-6 lg:px-8 xl:px-10 2xl:px-12 py-8 max-w-screen-2xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}