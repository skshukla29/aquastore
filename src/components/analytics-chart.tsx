"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Oct 1", usage: 125 },
  { day: "Oct 2", usage: 132 },
  { day: "Oct 3", usage: 128 },
  { day: "Oct 4", usage: 145 },
  { day: "Oct 5", usage: 152 },
  { day: "Oct 6", usage: 148 },
  { day: "Oct 7", usage: 135 },
  { day: "Oct 8", usage: 140 },
  { day: "Oct 9", usage: 138 },
  { day: "Oct 10", usage: 143 },
  { day: "Oct 11", usage: 150 },
  { day: "Oct 12", usage: 148 },
  { day: "Oct 13", usage: 142 },
  { day: "Oct 14", usage: 138 },
  { day: "Oct 15", usage: 185 },
  { day: "Oct 16", usage: 155 },
  { day: "Oct 17", usage: 140 },
  { day: "Oct 18", usage: 135 },
  { day: "Oct 19", usage: 130 },
  { day: "Oct 20", usage: 128 },
  { day: "Oct 21", usage: 145 },
  { day: "Oct 22", usage: 148 },
  { day: "Oct 23", usage: 142 },
  { day: "Oct 24", usage: 140 },
  { day: "Oct 25", usage: 135 },
  { day: "Oct 26", usage: 132 },
  { day: "Oct 27", usage: 130 },
  { day: "Oct 28", usage: 128 },
  { day: "Oct 29", usage: 127 },
  { day: "Oct 30", usage: 125 },
];

export function AnalyticsChart() {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="day" stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              background: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
            }}
            formatter={(value) => `${value}L`}
          />
          <Line
            type="monotone"
            dataKey="usage"
            stroke="#0ea5e9"
            strokeWidth={3}
            dot={{ fill: "#0ea5e9", r: 4 }}
            activeDot={{ r: 6 }}
            name="Daily Usage"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
