'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import SectionHeader from '@/components/design-system/ui/SectionHeader';
import Badge from '@/components/design-system/ui/Badge';

const ModulePerformanceChart = dynamic(() => import('./ModulePerformanceChart'), { ssr: false });
const CohortEngagementChart = dynamic(() => import('./CohortEngagementChart'), { ssr: false });

export default function InstructorChartsRow() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 2xl:grid-cols-5 gap-6">
      {/* Module performance bar chart */}
      <div className="xl:col-span-3 2xl:col-span-3 bg-surface border border-border rounded-[14px] p-6">
        <div className="flex items-start justify-between mb-6">
          <SectionHeader
            title="Module Completion Rates"
            subtitle="% of students who completed each module"
            accent="primary"
          />
          <Badge variant="muted" size="sm">12 modules</Badge>
        </div>
        <ModulePerformanceChart />
        <div className="mt-4 flex items-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-1.5 rounded-full bg-primary" />
            <span>Completion rate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1.5 rounded-full bg-danger/60" />
            <span>Below 50% threshold</span>
          </div>
        </div>
      </div>
      {/* Engagement area chart */}
      <div className="xl:col-span-2 2xl:col-span-2 bg-surface border border-border rounded-[14px] p-6">
        <div className="flex items-start justify-between mb-6">
          <SectionHeader
            title="Daily Active Learners"
            subtitle="Last 30 days"
            accent="cyan"
          />
        </div>
        <CohortEngagementChart />
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[
            { label: 'Peak DAL', value: '28', color: 'text-cyan' },
            { label: 'Avg DAL', value: '22', color: 'text-foreground' },
            { label: 'Drop-off day', value: 'Jul 11', color: 'text-danger' },
            { label: 'Recovery', value: '+6', color: 'text-success' },
          ]?.map((s) => (
            <div key={`eng-stat-${s?.label}`} className="bg-surface-elevated rounded-[8px] px-3 py-2">
              <div className={`text-base font-700 tabular-nums ${s?.color}`}>{s?.value}</div>
              <div className="text-2xs text-muted-foreground">{s?.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}