'use client';
import React, { useState } from 'react';
import Badge from '@/components/design-system/ui/Badge';
import Avatar from '@/components/design-system/ui/Avatar';
import ProgressBar from '@/components/design-system/ui/ProgressBar';

import { Search, ChevronUp, ChevronDown, ChevronsUpDown, MessageSquare, Eye, MoreHorizontal, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

type RiskLevel = 'on_track' | 'at_risk' | 'critical' | 'completed';

interface Student {
  id: string;
  name: string;
  email: string;
  masteryScore: number;
  completedModules: number;
  totalModules: number;
  lastActive: string;
  streak: number;
  avgSessionMin: number;
  riskLevel: RiskLevel;
  accent: 'primary' | 'purple' | 'cyan' | 'success' | 'warning';
}

const students: Student[] = [
  { id: 'stu-001', name: 'Kiran Sharma', email: 'kiran@sakshion.dev', masteryScore: 88, completedModules: 10, totalModules: 12, lastActive: '2h ago', streak: 9, avgSessionMin: 48, riskLevel: 'on_track', accent: 'primary' },
  { id: 'stu-002', name: 'Meera Pillai', email: 'meera@sakshion.dev', masteryScore: 82, completedModules: 9, totalModules: 12, lastActive: '5h ago', streak: 12, avgSessionMin: 55, riskLevel: 'on_track', accent: 'cyan' },
  { id: 'stu-003', name: 'Rohan Verma', email: 'rohan@sakshion.dev', masteryScore: 76, completedModules: 8, totalModules: 12, lastActive: '1d ago', streak: 5, avgSessionMin: 32, riskLevel: 'on_track', accent: 'success' },
  { id: 'stu-004', name: 'Ananya Krishnan', email: 'ananya@sakshion.dev', masteryScore: 91, completedModules: 12, totalModules: 12, lastActive: '3h ago', streak: 21, avgSessionMin: 62, riskLevel: 'completed', accent: 'warning' },
  { id: 'stu-005', name: 'Arjun Mehta', email: 'arjun@sakshion.dev', masteryScore: 34, completedModules: 3, totalModules: 12, lastActive: '6d ago', streak: 0, avgSessionMin: 12, riskLevel: 'critical', accent: 'primary' },
  { id: 'stu-006', name: 'Divya Nair', email: 'divya@sakshion.dev', masteryScore: 41, completedModules: 4, totalModules: 12, lastActive: '5d ago', streak: 0, avgSessionMin: 18, riskLevel: 'at_risk', accent: 'purple' },
  { id: 'stu-007', name: 'Siddharth Joshi', email: 'sid@sakshion.dev', masteryScore: 67, completedModules: 7, totalModules: 12, lastActive: '2d ago', streak: 3, avgSessionMin: 40, riskLevel: 'on_track', accent: 'cyan' },
  { id: 'stu-008', name: 'Priyanka Reddy', email: 'priya.r@sakshion.dev', masteryScore: 79, completedModules: 9, totalModules: 12, lastActive: '1d ago', streak: 7, avgSessionMin: 45, riskLevel: 'on_track', accent: 'success' },
  { id: 'stu-009', name: 'Vikram Bose', email: 'vikram@sakshion.dev', masteryScore: 55, completedModules: 6, totalModules: 12, lastActive: '3d ago', streak: 1, avgSessionMin: 25, riskLevel: 'at_risk', accent: 'warning' },
  { id: 'stu-010', name: 'Rahul Gupta', email: 'rahul@sakshion.dev', masteryScore: 28, completedModules: 2, totalModules: 12, lastActive: '7d ago', streak: 0, avgSessionMin: 8, riskLevel: 'critical', accent: 'primary' },
  { id: 'stu-011', name: 'Sunita Rao', email: 'sunita@sakshion.dev', masteryScore: 47, completedModules: 5, totalModules: 12, lastActive: '5d ago', streak: 0, avgSessionMin: 22, riskLevel: 'at_risk', accent: 'cyan' },
  { id: 'stu-012', name: 'Nikhil Desai', email: 'nikhil@sakshion.dev', masteryScore: 84, completedModules: 10, totalModules: 12, lastActive: '4h ago', streak: 14, avgSessionMin: 58, riskLevel: 'on_track', accent: 'purple' },
];

const riskConfig: Record<RiskLevel, { label: string; variant: 'success' | 'warning' | 'danger' | 'primary'; icon: React.ElementType }> = {
  on_track: { label: 'On Track', variant: 'success', icon: CheckCircle2 },
  at_risk: { label: 'At Risk', variant: 'warning', icon: Clock },
  critical: { label: 'Critical', variant: 'danger', icon: AlertTriangle },
  completed: { label: 'Completed', variant: 'primary', icon: CheckCircle2 },
};

type SortKey = 'name' | 'masteryScore' | 'completedModules' | 'lastActive' | 'streak';
type SortDir = 'asc' | 'desc';

export default function StudentRosterTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('masteryScore');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'all'>('all');
  const [page, setPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const perPage = 8;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
    setPage(1);
  };

  const filtered = students
    .filter(s => {
      const q = search.toLowerCase();
      const matchSearch = s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
      const matchRisk = riskFilter === 'all' || s.riskLevel === riskFilter;
      return matchSearch && matchRisk;
    })
    .sort((a, b) => {
      let av: number | string = a[sortKey];
      let bv: number | string = b[sortKey];
      if (typeof av === 'string' && typeof bv === 'string') {
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortDir === 'asc' ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronsUpDown size={12} className="text-muted-foreground opacity-40" />;
    return sortDir === 'asc'
      ? <ChevronUp size={12} className="text-primary" />
      : <ChevronDown size={12} className="text-primary" />;
  };

  const riskFilters: Array<{ key: RiskLevel | 'all'; label: string }> = [
    { key: 'all', label: 'All' },
    { key: 'on_track', label: 'On Track' },
    { key: 'at_risk', label: 'At Risk' },
    { key: 'critical', label: 'Critical' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className="bg-surface border border-border rounded-[14px] overflow-hidden">
      {/* Table toolbar */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border flex-wrap gap-y-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="w-full bg-surface-elevated border border-border rounded-[9px] pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40 focus:shadow-glow-primary transition-all"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {riskFilters.map(f => (
            <button
              key={`risk-filter-${f.key}`}
              onClick={() => { setRiskFilter(f.key); setPage(1); }}
              className={`text-xs px-3 py-1.5 rounded-full font-500 transition-all duration-150 ${
                riskFilter === f.key
                  ? 'bg-primary/15 text-primary border border-primary/30' :'bg-surface-elevated text-muted-foreground border border-border hover:text-foreground'
              }`}
            >
              {f.label}
              {f.key !== 'all' && (
                <span className="ml-1.5 tabular-nums">
                  ({students.filter(s => s.riskLevel === f.key).length})
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="ml-auto text-xs text-muted-foreground">
          {filtered.length} students
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-border">
              {[
                { key: 'name' as SortKey, label: 'Student', sortable: true },
                { key: 'masteryScore' as SortKey, label: 'Mastery', sortable: true },
                { key: 'completedModules' as SortKey, label: 'Progress', sortable: true },
                { key: 'lastActive' as SortKey, label: 'Last Active', sortable: true },
                { key: 'streak' as SortKey, label: 'Streak', sortable: true },
                { key: null, label: 'Risk Level', sortable: false },
                { key: null, label: 'Actions', sortable: false },
              ].map((col, i) => (
                <th
                  key={`th-${i + 1}`}
                  className={`px-4 py-3 text-left text-xs font-600 text-muted-foreground uppercase tracking-wider ${
                    col.sortable ? 'cursor-pointer hover:text-foreground select-none' : ''
                  }`}
                  onClick={col.sortable && col.key ? () => handleSort(col.key as SortKey) : undefined}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && col.key && <SortIcon col={col.key as SortKey} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paged.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Search size={32} className="text-muted-foreground opacity-30" />
                    <p className="text-sm font-500 text-foreground">No students match your search</p>
                    <p className="text-xs text-muted-foreground">Try a different name, email, or risk filter</p>
                  </div>
                </td>
              </tr>
            ) : (
              paged.map((student) => {
                const rc = riskConfig[student.riskLevel];
                const RiskIcon = rc.icon;
                const progressPct = Math.round((student.completedModules / student.totalModules) * 100);
                const progressVariant = progressPct >= 75 ? 'success' : progressPct >= 40 ? 'primary' : 'danger';
                const isHovered = hoveredRow === student.id;

                return (
                  <tr
                    key={student.id}
                    onMouseEnter={() => setHoveredRow(student.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`transition-colors duration-100 ${isHovered ? 'bg-surface-elevated/60' : ''}`}
                  >
                    {/* Student */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={student.name} size="sm" accent={student.accent} />
                        <div className="min-w-0">
                          <p className="text-sm font-600 text-foreground truncate">{student.name}</p>
                          <p className="text-2xs text-muted-foreground truncate">{student.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Mastery */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-700 tabular-nums ${
                          student.masteryScore >= 75 ? 'text-success' :
                          student.masteryScore >= 50 ? 'text-primary' : 'text-danger'
                        }`}>
                          {student.masteryScore}%
                        </span>
                      </div>
                    </td>

                    {/* Progress */}
                    <td className="px-4 py-3.5">
                      <div className="w-32">
                        <div className="flex justify-between text-2xs text-muted-foreground mb-1">
                          <span>{student.completedModules}/{student.totalModules} modules</span>
                          <span className="font-600 text-foreground tabular-nums">{progressPct}%</span>
                        </div>
                        <ProgressBar value={progressPct} variant={progressVariant} size="xs" />
                      </div>
                    </td>

                    {/* Last active */}
                    <td className="px-4 py-3.5">
                      <span className={`text-sm tabular-nums ${
                        student.riskLevel === 'critical' ? 'text-danger font-600' :
                        student.riskLevel === 'at_risk' ? 'text-warning' : 'text-muted-foreground'
                      }`}>
                        {student.lastActive}
                      </span>
                    </td>

                    {/* Streak */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{student.streak > 0 ? '🔥' : '—'}</span>
                        <span className={`text-sm font-600 tabular-nums ${student.streak > 0 ? 'text-warning' : 'text-muted-foreground'}`}>
                          {student.streak > 0 ? `${student.streak}d` : '0'}
                        </span>
                      </div>
                    </td>

                    {/* Risk level */}
                    <td className="px-4 py-3.5">
                      <Badge variant={rc.variant} size="sm" dot>{rc.label}</Badge>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5">
                      <div className={`flex items-center gap-1 transition-opacity duration-150 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        <button
                          className="p-1.5 rounded-[7px] text-muted-foreground hover:text-foreground hover:bg-surface transition-all"
                          title={`View ${student.name}'s profile`}
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          className="p-1.5 rounded-[7px] text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                          title={`Message ${student.name}`}
                        >
                          <MessageSquare size={14} />
                        </button>
                        <button
                          className="p-1.5 rounded-[7px] text-muted-foreground hover:text-foreground hover:bg-surface transition-all"
                          title="More actions"
                        >
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length} students
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-xs rounded-[8px] bg-surface-elevated border border-border text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={`page-${i + 1}`}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 text-xs rounded-[8px] transition-all ${
                  page === i + 1
                    ? 'bg-primary text-primary-foreground font-600 shadow-glow-primary'
                    : 'bg-surface-elevated border border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 text-xs rounded-[8px] bg-surface-elevated border border-border text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}