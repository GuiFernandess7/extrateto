"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";
import { TETO_CONSTITUCIONAL } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import type { MonthlyRecord } from "@/data/mock-data";

interface TemporalChartProps {
  historico: MonthlyRecord[];
  nome: string;
}

function formatMonth(mes: string) {
  const [year, month] = mes.split("-");
  const months = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez",
  ];
  return `${months[parseInt(month) - 1]}/${year.slice(2)}`;
}

interface TooltipPayloadItem {
  color: string;
  name: string;
  value: number;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 text-xs shadow-lg">
      <p className="mb-1 font-semibold text-navy">{label}</p>
      {payload.map((item: TooltipPayloadItem, i: number) => (
        <p key={i} style={{ color: item.color }}>
          {item.name}: {formatCurrency(item.value)}
        </p>
      ))}
    </div>
  );
}

export function TemporalChart({ historico, nome }: TemporalChartProps) {
  const data = historico.map((h) => ({
    ...h,
    mesLabel: formatMonth(h.mes),
    teto: TETO_CONSTITUCIONAL,
  }));

  return (
    <div className="mt-4">
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
        Evolução mensal — {nome.split(" ").slice(0, 2).join(" ")}
      </h4>
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="mesLabel"
              tick={{ fontSize: 10, fill: "#94A3B8" }}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#94A3B8" }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              width={45}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={TETO_CONSTITUCIONAL}
              stroke="#DC2626"
              strokeDasharray="6 3"
              strokeWidth={1.5}
              label={{
                value: "Teto",
                position: "right",
                fill: "#DC2626",
                fontSize: 10,
              }}
            />
            <Area
              type="monotone"
              dataKey="remuneracaoTotal"
              fill="#DC262620"
              stroke="none"
              baseLine={TETO_CONSTITUCIONAL}
            />
            <Line
              type="monotone"
              dataKey="remuneracaoTotal"
              stroke="#DC2626"
              strokeWidth={2}
              dot={{ r: 3, fill: "#DC2626" }}
              activeDot={{ r: 5, fill: "#DC2626" }}
              name="Remuneração Total"
            />
            <Line
              type="monotone"
              dataKey="remuneracaoBase"
              stroke="#3B82F6"
              strokeWidth={1.5}
              strokeDasharray="4 2"
              dot={false}
              name="Salário Base"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
