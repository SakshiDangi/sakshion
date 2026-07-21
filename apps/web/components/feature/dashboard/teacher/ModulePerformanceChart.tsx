'use client';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';

const moduleData = [
  { module: 'M1', name: 'Intro to React', completion: 97 },
  { module: 'M2', name: 'JSX & Props', completion: 94 },
  { module: 'M3', name: 'State & Events', completion: 89 },
  { module: 'M4', name: 'useEffect', completion: 82 },
  { module: 'M5', name: 'useCallback', completion: 74 },
  { module: 'M6', name: 'useMemo', completion: 68 },
  { module: 'M7', name: 'Custom Hooks', completion: 61 },
  { module: 'M8', name: 'Context API', completion: 55 },
  { module: 'M9', name: 'Reducers', completion: 44 },
  { module: 'M10', name: 'Suspense', completion: 38 },
  { module: 'M11', name: 'Performance', completion: 27 },
  { module: 'M12', name: 'Testing', completion: 14 },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { name: string; module: string } }>;
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload?.[0];
    if (!d) return null;
  const pct = d.value;
  return (
    <div className="bg-surface-elevated border border-border rounded-[10px] px-3 py-2.5 shadow-modal text-xs">
      <p className="font-600 text-foreground mb-1">{d.payload.name}</p>
      <p className={pct < 50 ? 'text-danger font-700' : 'text-primary font-700'}>{pct}% completion</p>
      <p className="text-muted-foreground">{Math.round((pct / 100) * 38)} / 38 students</p>
    </div>
  );
}

export default function ModulePerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={moduleData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={14}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="module"
          tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          domain={[0, 100]}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={50} stroke="var(--danger)" strokeDasharray="4 4" strokeOpacity={0.4} />
        <Bar dataKey="completion" radius={[4, 4, 0, 0]}>
          {moduleData.map((entry, index) => (
            <Cell
              key={`cell-module-${index + 1}`}
              fill={entry.completion < 50 ? 'var(--danger)' : 'var(--primary)'}
              opacity={entry.completion < 50 ? 0.7 : 0.85}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}