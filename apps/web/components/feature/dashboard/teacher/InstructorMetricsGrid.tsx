import React from 'react';

import ProgressBar from '@/components/design-system/ui/ProgressBar';
import { Users, BookCheck, AlertTriangle, Star } from 'lucide-react';

export default function InstructorMetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {/* Active learners — hero */}
      <div className="md:col-span-2 lg:col-span-1 xl:col-span-1 bg-surface border border-cyan/20 rounded-[14px] p-5 card-hover shadow-glow-cyan relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 rounded-[10px] bg-cyan/10">
              <Users size={18} className="text-cyan" />
            </div>
            <span className="text-2xs font-600 text-success bg-success/10 px-2 py-0.5 rounded-full">+3 this week</span>
          </div>
          <div className="text-3xl font-800 tabular-nums text-foreground leading-none mb-1">31</div>
          <p className="text-sm text-muted-foreground font-500 mb-3">Active Learners</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span>Active rate</span>
            <span className="font-600 text-cyan">82%</span>
          </div>
          <ProgressBar value={82} variant="cyan" size="xs" glow />
          <p className="text-2xs text-muted-foreground mt-2">7 inactive · 4 at risk</p>
        </div>
      </div>
      {/* Avg mastery */}
      <div className="bg-surface border border-primary/20 rounded-[14px] p-5 card-hover shadow-glow-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 rounded-[10px] bg-primary/10">
              <Star size={18} className="text-primary" />
            </div>
            <span className="text-2xs font-600 text-success bg-success/10 px-2 py-0.5 rounded-full">+4.2%</span>
          </div>
          <div className="text-3xl font-800 tabular-nums text-foreground leading-none mb-1">71<span className="text-base font-500 text-muted-foreground">%</span></div>
          <p className="text-sm text-muted-foreground font-500 mb-3">Avg Mastery Score</p>
          <ProgressBar value={71} variant="primary" size="xs" glow />
          <p className="text-2xs text-muted-foreground mt-2">Cohort target: 80%</p>
        </div>
      </div>
      {/* Completion rate */}
      <div className="bg-surface border border-success/20 rounded-[14px] p-5 card-hover shadow-glow-success relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-success/5 rounded-full blur-xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 rounded-[10px] bg-success/10">
              <BookCheck size={18} className="text-success" />
            </div>
            <span className="text-2xs font-600 text-success bg-success/10 px-2 py-0.5 rounded-full">+2.8%</span>
          </div>
          <div className="text-3xl font-800 tabular-nums text-foreground leading-none mb-1">68<span className="text-base font-500 text-muted-foreground">%</span></div>
          <p className="text-sm text-muted-foreground font-500 mb-3">Course Completion</p>
          <ProgressBar value={68} variant="success" size="xs" glow />
          <p className="text-2xs text-muted-foreground mt-2">26 / 38 students on track</p>
        </div>
      </div>
      {/* At-risk count */}
      <div className="bg-surface border border-danger/20 rounded-[14px] p-5 card-hover shadow-glow-danger relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-danger/5 rounded-full blur-xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 rounded-[10px] bg-danger/10">
              <AlertTriangle size={18} className="text-danger" />
            </div>
            <span className="text-2xs font-600 text-danger bg-danger/10 px-2 py-0.5 rounded-full">Needs action</span>
          </div>
          <div className="text-3xl font-800 tabular-nums text-foreground leading-none mb-1">4</div>
          <p className="text-sm text-muted-foreground font-500 mb-3">At-Risk Students</p>
          <div className="space-y-1.5">
            {['Arjun Mehta', 'Divya Nair']?.map((name) => (
              <div key={`risk-${name}`} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-danger flex-shrink-0" />
                <span className="text-2xs text-muted-foreground truncate">{name}</span>
              </div>
            ))}
            <p className="text-2xs text-danger font-500">+2 more</p>
          </div>
        </div>
      </div>
    </div>
  );
}