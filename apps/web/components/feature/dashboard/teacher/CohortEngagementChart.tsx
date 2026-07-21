'use client';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const engagementData = [
  { day: 'Jun 22', dal: 18 },
  { day: 'Jun 23', dal: 22 },
  { day: 'Jun 24', dal: 25 },
  { day: 'Jun 25', dal: 20 },
  { day: 'Jun 26', dal: 16 },
  { day: 'Jun 27', dal: 24 },
  { day: 'Jun 28', dal: 28 },
  { day: 'Jun 29', dal: 26 },
  { day: 'Jun 30', dal: 23 },
  { day: 'Jul 1', dal: 27 },
  { day: 'Jul 2', dal: 21 },
  { day: 'Jul 3', dal: 19 },
  { day: 'Jul 4', dal: 14 },
  { day: 'Jul 5', dal: 10 },
  { day: 'Jul 6', dal: 8 },
  { day: 'Jul 7', dal: 16 },
  { day: 'Jul 8', dal: 22 },
  { day: 'Jul 9', dal: 25 },
  { day: 'Jul 10', dal: 24 },
  { day: 'Jul 11', dal: 9 },
  { day: 'Jul 12', dal: 18 },
  { day: 'Jul 13', dal: 23 },
  { day: 'Jul 14', dal: 26 },
  { day: 'Jul 15', dal: 22 },
  { day: 'Jul 16', dal: 28 },
  { day: 'Jul 17', dal: 24 },
  { day: 'Jul 18', dal: 20 },
  { day: 'Jul 19', dal: 17 },
  { day: 'Jul 20', dal: 23 },
  { day: 'Jul 21', dal: 21 },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface-elevated border border-border rounded-[10px] px-3 py-2 shadow-modal text-xs">
      <p className="text-muted-foreground mb-1">{label}</p>
      <p className="font-700 text-cyan">{payload[0]?.value} active learners</p>
    </div>
  );
}

export default function CohortEngagementChart() {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <AreaChart data={engagementData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
        <defs>
          <linearGradient id="dalGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--cyan)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="var(--cyan)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="day"
          tick={{ fill: 'var(--muted-foreground)', fontSize: 9 }}
          axisLine={false}
          tickLine={false}
          interval={4}
        />
        <YAxis
          tick={{ fill: 'var(--muted-foreground)', fontSize: 9 }}
          axisLine={false}
          tickLine={false}
          domain={[0, 35]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="dal"
          stroke="var(--cyan)"
          strokeWidth={2}
          fill="url(#dalGradient)"
          dot={false}
          activeDot={{ r: 4, fill: 'var(--cyan)', stroke: 'var(--surface)', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}