"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Recharts = ({ data }) => {
  return (
    <div className="w-full h-80 bg-base-100 p-4 rounded-2xl border border-base-200 shadow-xl transition-colors duration-200">
      <h3 className="text-sm font-black text-base-content/60 uppercase mb-4 tracking-wider">
        Revenue & Sales Trends
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              {/* primary থিম কালার অনুযায়ী গ্রাডিয়েন্ট */}
              <stop offset="5%" stopColor="oklch(var(--p))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="oklch(var(--p))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            // থিম অনুযায়ী গ্রিড কালার
            stroke="oklch(var(--bc)/0.1)"
          />
          <XAxis
            dataKey="date"
            stroke="oklch(var(--bc)/0.5)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis
            stroke="oklch(var(--bc)/0.5)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `৳${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "oklch(var(--b2))", // ব্যাকগ্রাউন্ড হিসেবে base-200 ব্যবহার
              color: "oklch(var(--bc))", // টেক্সট হিসেবে base-content ব্যবহার
              borderRadius: "12px",
              border: "1px solid oklch(var(--bc)/0.1)",
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="oklch(var(--p))" // primary কালার স্ট্রোক
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Recharts;
