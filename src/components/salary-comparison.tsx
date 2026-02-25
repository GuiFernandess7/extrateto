"use client";

import { useMemo } from "react";
import { getSalaryComparison } from "@/lib/aggregations";
import { formatCurrency } from "@/lib/utils";
import { Clock, Briefcase } from "lucide-react";

interface SalaryComparisonProps {
  remuneracao: number;
  nome?: string;
}

export function SalaryComparison({ remuneracao, nome }: SalaryComparisonProps) {
  const comparisons = useMemo(() => getSalaryComparison(remuneracao), [remuneracao]);

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
      <h3 className="mb-1 flex items-center gap-2 font-serif text-base font-bold text-navy">
        <Clock className="h-4 w-4 text-amber" />
        Quanto tempo para ganhar isso?
      </h3>
      <p className="mb-4 text-xs text-gray-500">
        A remuneração de {formatCurrency(remuneracao)}
        {nome ? ` de ${nome}` : ""} equivale a:
      </p>

      <div className="space-y-3">
        {comparisons.map((c) => (
          <div key={c.profissao} className="flex items-center gap-3">
            <Briefcase className="h-4 w-4 shrink-0 text-gray-400" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{c.profissao}</span>
                <span className="text-xs text-gray-400">
                  ({formatCurrency(c.salario)}/mês)
                </span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-red-primary transition-all"
                    style={{
                      width: `${Math.min((c.mesesEquivalentes / 200) * 100, 100)}%`,
                    }}
                  />
                </div>
                <span className="shrink-0 text-sm font-bold text-red-primary">
                  {c.mesesEquivalentes} meses
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-gray-400">
                ({c.anosEquivalentes} anos de trabalho)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
