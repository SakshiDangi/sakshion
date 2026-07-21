import React from 'react';
import InstructorMetricsGrid from './InstructorMetricsGrid';
import InstructorChartsRow from './InstructorChartsRow';
import StudentRosterTable from './StudentRosterTable';
import SectionHeader from '@/components/design-system/ui/SectionHeader';
import Button from '@/components/design-system/ui/Button';
import Badge from '@/components/design-system/ui/Badge';
import { Plus, Download, RefreshCw, AlertTriangle } from 'lucide-react';

export default function InstructorDashboardContent() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-700 text-foreground">
              Cohort Overview
            </h1>
            <Badge variant="purple" size="sm" dot>Advanced React · Batch 4</Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>38 enrolled learners</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>Started Jun 3, 2026</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Live data · Updated 4m ago
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button variant="ghost" size="sm" icon={<RefreshCw size={14} />}>
            Refresh
          </Button>
          <Button variant="secondary" size="sm" icon={<Download size={14} />}>
            Export CSV
          </Button>
          <Button variant="gradient" size="sm" icon={<Plus size={14} />}>
            New Module
          </Button>
        </div>
      </div>

      {/* At-risk alert banner */}
      <div className="flex items-center gap-4 px-5 py-3.5 rounded-[12px] bg-danger/8 border border-danger/20">
        <div className="p-1.5 rounded-[8px] bg-danger/15 flex-shrink-0">
          <AlertTriangle size={16} className="text-danger" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-600 text-foreground">
            4 students are at risk of falling behind
          </p>
          <p className="text-xs text-muted-foreground">
            Arjun Mehta, Divya Nair, Rahul Gupta, and Sunita Rao have not completed any modules in the last 5+ days.
          </p>
        </div>
        <Button variant="danger" size="sm" className="flex-shrink-0">
          View At-Risk
        </Button>
      </div>

      {/* KPI metrics */}
      <InstructorMetricsGrid />

      {/* Charts */}
      <InstructorChartsRow />

      {/* Student roster */}
      <div>
        <SectionHeader
          title="Student Roster"
          subtitle="All 38 enrolled learners · Click a row to view profile"
          accent="cyan"
          className="mb-5"
          action={
            <div className="flex items-center gap-2">
              <Badge variant="danger" size="sm" dot>4 at risk</Badge>
              <Button variant="ghost" size="sm">Filter</Button>
            </div>
          }
        />
        <StudentRosterTable />
      </div>
    </div>
  );
}