"use client";

import { Shield, AlertCircle, CheckCircle, MinusCircle } from "lucide-react";
import type { OrgaoStats } from "@/lib/aggregations";

interface TransparencyIndexProps {
  orgaos: OrgaoStats[];
}

function getScoreColor(score: number) {
  if (score >= 80) return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", label: "Bom" };
  if (score >= 60) return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", label: "Regular" };
  return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", label: "Insuficiente" };
}

function ScoreIcon({ score }: { score: number }) {
  if (score >= 80) return <CheckCircle className="h-4 w-4 text-green-600" />;
  if (score >= 60) return <MinusCircle className="h-4 w-4 text-amber-600" />;
  return <AlertCircle className="h-4 w-4 text-red-600" />;
}

export function TransparencyIndex({ orgaos }: TransparencyIndexProps) {
  const sorted = [...orgaos].sort((a, b) => b.transparenciaScore - a.transparenciaScore);

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Shield className="h-5 w-5 text-navy" />
        <h2 className="font-serif text-lg font-bold text-navy">
          Índice de Transparência
        </h2>
      </div>
      <p className="mb-4 text-xs text-gray-500">
        Score baseado em: disponibilidade dos dados, formato aberto, atualização
        mensal, individualização por membro, e completude das rubricas.
      </p>

      <div className="space-y-2">
        {sorted.map((orgao, i) => {
          const style = getScoreColor(orgao.transparenciaScore);
          return (
            <div
              key={orgao.orgao}
              className={`flex items-center gap-3 rounded-md border p-3 ${style.border} ${style.bg}`}
            >
              <span className="w-6 text-center text-xs font-semibold text-gray-400">
                {i + 1}
              </span>
              <ScoreIcon score={orgao.transparenciaScore} />
              <div className="min-w-0 flex-1">
                <span className="text-sm font-medium text-navy">
                  {orgao.orgao}
                </span>
                <span className="ml-2 text-xs text-gray-400">{orgao.estado}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white">
                  <div
                    className={`h-full rounded-full ${
                      orgao.transparenciaScore >= 80
                        ? "bg-green-500"
                        : orgao.transparenciaScore >= 60
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${orgao.transparenciaScore}%` }}
                  />
                </div>
                <span className={`text-sm font-bold ${style.text}`}>
                  {orgao.transparenciaScore}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3 text-green-600" /> 80-100: Bom
        </span>
        <span className="flex items-center gap-1">
          <MinusCircle className="h-3 w-3 text-amber-600" /> 60-79: Regular
        </span>
        <span className="flex items-center gap-1">
          <AlertCircle className="h-3 w-3 text-red-600" /> &lt;60: Insuficiente
        </span>
      </div>
    </div>
  );
}
