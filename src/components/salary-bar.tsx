"use client";

import { useState } from "react";
import { TETO_CONSTITUCIONAL } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

interface SalaryBarProps {
  remuneracaoBase: number;
  verbasIndenizatorias: number;
  direitosEventuais: number;
  direitosPessoais: number;
  remuneracaoTotal: number;
}

export function SalaryBar({
  remuneracaoBase,
  verbasIndenizatorias,
  direitosEventuais,
  direitosPessoais,
  remuneracaoTotal,
}: SalaryBarProps) {
  const [tooltip, setTooltip] = useState<{
    label: string;
    value: number;
    x: number;
  } | null>(null);

  const maxValue = Math.max(remuneracaoTotal, TETO_CONSTITUCIONAL * 1.1);
  const penduricalhos = verbasIndenizatorias + direitosEventuais + direitosPessoais;

  const baseWidth = (remuneracaoBase / maxValue) * 100;
  const verbasWidth = (verbasIndenizatorias / maxValue) * 100;
  const eventuaisWidth = (direitosEventuais / maxValue) * 100;
  const pessoaisWidth = (direitosPessoais / maxValue) * 100;
  const tetoPosition = (TETO_CONSTITUCIONAL / maxValue) * 100;

  const basePercent = remuneracaoTotal > 0 ? Math.round((remuneracaoBase / remuneracaoTotal) * 100) : 0;
  const extrasPercent = remuneracaoTotal > 0 ? Math.round((penduricalhos / remuneracaoTotal) * 100) : 0;

  const segments = [
    { key: "base", label: "Salário Base", value: remuneracaoBase, width: baseWidth, color: "bg-blue-500" },
    { key: "verbas", label: "Verbas Indenizatórias", value: verbasIndenizatorias, width: verbasWidth, color: "bg-red-400" },
    { key: "eventuais", label: "Direitos Eventuais", value: direitosEventuais, width: eventuaisWidth, color: "bg-red-500" },
    { key: "pessoais", label: "Direitos Pessoais", value: direitosPessoais, width: pessoaisWidth, color: "bg-red-600" },
  ];

  return (
    <div className="relative">
      {/* Teto pill label — positioned on/above the bar */}
      <div
        className="absolute -top-1 z-10"
        style={{ left: `${tetoPosition}%`, transform: "translateX(-50%)" }}
      >
        <span className="whitespace-nowrap rounded bg-red-primary/90 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-sm">
          Teto R$46.366
        </span>
      </div>

      {/* Bar */}
      <div className="relative mt-3 h-5 w-full overflow-hidden rounded-md bg-gray-100">
        <div className="flex h-full">
          {segments.map((seg) => (
            <div
              key={seg.key}
              className={`${seg.color} relative h-full transition-all hover:brightness-110`}
              style={{ width: `${seg.width}%` }}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltip({
                  label: seg.label,
                  value: seg.value,
                  x: rect.left + rect.width / 2,
                });
              }}
              onMouseLeave={() => setTooltip(null)}
            />
          ))}
        </div>

        {/* Teto line */}
        <div
          className="absolute top-0 h-full w-0.5 bg-red-primary shadow-sm"
          style={{ left: `${tetoPosition}%` }}
        />
        <div
          className="absolute top-0 h-full border-r-2 border-dashed border-red-primary/40"
          style={{ left: `${tetoPosition}%` }}
        />
      </div>

      {/* Labels below bar */}
      <div className="mt-1.5 flex items-center justify-between text-[11px]">
        <span className="flex items-center gap-1 font-medium text-gray-500">
          <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
          Base: {formatCurrency(remuneracaoBase)} ({basePercent}%)
        </span>
        <span className="flex items-center gap-1 font-medium text-gray-500">
          <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
          Extras: {formatCurrency(penduricalhos)} ({extrasPercent}%)
        </span>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div className="pointer-events-none fixed z-50 -translate-x-1/2 rounded-md bg-navy px-2.5 py-1.5 text-xs text-white shadow-lg"
          style={{ left: tooltip.x, top: "auto" }}
        >
          <span className="font-medium">{tooltip.label}</span>
          <br />
          {formatCurrency(tooltip.value)}
        </div>
      )}
    </div>
  );
}
