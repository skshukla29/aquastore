"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";

interface TrendPoint {
  month: string;
  usage: number;
  average: number;
}

interface MonthlyTrendProps {
  points: TrendPoint[];
}

export function MonthlyTrend({ points }: MonthlyTrendProps) {
  return (
    <Card title="Monthly Trend" subtitle="Usage vs city average">
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={points}>
            <defs>
              <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="averageGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#d9e8f3" />
            <XAxis dataKey="month" stroke="#476379" />
            <YAxis stroke="#476379" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="average"
              stroke="#22c55e"
              fill="url(#averageGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="usage"
              stroke="#0ea5e9"
              fill="url(#usageGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
