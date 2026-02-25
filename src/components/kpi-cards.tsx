"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Users, Trophy, BarChart3 } from "lucide-react";
import { formatCurrency, formatCompactCurrency, formatNumber, formatPercent } from "@/lib/utils";

interface KPIData {
  totalAcimaTeto: number;
  numAcimaTeto: number;
  maiorRemuneracao: number;
  mediaAcimaTeto: number;
  percentualAcimaTeto: number;
}

interface KPICardsProps {
  data: KPIData;
}

function AnimatedValue({
  value,
  format,
}: {
  value: number;
  format: (v: number) => string;
}) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const duration = 800;
    const steps = 30;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplayed(Math.round(value * eased));

      if (current >= steps) {
        setDisplayed(value);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <>{format(displayed)}</>;
}

const SALARIO_MINIMO = 1518;

function formatCompactNumber(n: number): string {
  if (n >= 1_000_000_000) {
    return (n / 1_000_000_000).toFixed(1).replace(".", ",") + " bilhões";
  }
  if (n >= 1_000_000) {
    return (n / 1_000_000).toFixed(1).replace(".", ",") + " milhões";
  }
  if (n >= 1_000) {
    return (n / 1_000).toFixed(1).replace(".", ",") + " mil";
  }
  return n.toLocaleString("pt-BR");
}

export function KPICards({ data }: KPICardsProps) {
  const salariosMinimos = Math.round((data.totalAcimaTeto * 12) / SALARIO_MINIMO);

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {/* Card principal: Total acima do teto */}
      <div className="col-span-2 rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-white p-4 shadow-sm transition-shadow hover:shadow-md lg:col-span-1">
        <div className="mb-2 flex items-center gap-2">
          <div className="rounded-lg bg-red-primary/10 p-2">
            <TrendingUp className="h-5 w-5 text-red-primary" />
          </div>
          <span className="text-xs font-semibold text-gray-600">
            Total Pago Acima do Teto
          </span>
        </div>
        <div className="text-xl font-bold text-red-primary sm:text-2xl">
          <AnimatedValue value={data.totalAcimaTeto} format={formatCompactCurrency} />
        </div>
        <p className="mt-1 text-[11px] text-gray-400">(estimativa anual)</p>
        <p className="mt-2 rounded-md bg-red-primary/5 px-2 py-1 text-[11px] font-medium text-red-700">
          ≈ {formatCompactNumber(salariosMinimos)} de salários mínimos
        </p>
      </div>

      {/* Membros acima do teto */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
        <div className="mb-2 flex items-center gap-2">
          <div className="rounded-lg bg-blue-50 p-2">
            <Users className="h-5 w-5 text-blue-600" />
          </div>
          <span className="text-xs font-semibold text-gray-600">
            Membros Acima do Teto
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-xl font-bold text-navy">
            <AnimatedValue value={data.numAcimaTeto} format={formatNumber} />
          </div>
          <span className="text-base font-bold text-red-primary sm:text-lg">
            (<AnimatedValue value={data.percentualAcimaTeto} format={formatPercent} />)
          </span>
        </div>
        <p className="mt-1 text-[11px] text-gray-400">nesta seleção</p>
      </div>

      {/* Maior remuneração */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
        <div className="mb-2 flex items-center gap-2">
          <div className="rounded-lg bg-amber-50 p-2">
            <Trophy className="h-5 w-5 text-amber-600" />
          </div>
          <span className="text-xs font-semibold text-gray-600">
            Maior Remuneração
          </span>
        </div>
        <div className="text-xl font-bold text-amber-700">
          <AnimatedValue value={data.maiorRemuneracao} format={formatCurrency} />
        </div>
        <p className="mt-1 text-[11px] text-gray-400">individual/mês</p>
      </div>

      {/* Média acima do teto */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
        <div className="mb-2 flex items-center gap-2">
          <div className="rounded-lg bg-red-50 p-2">
            <BarChart3 className="h-5 w-5 text-red-primary" />
          </div>
          <span className="text-xs font-semibold text-gray-600">
            Média Acima do Teto
          </span>
        </div>
        <div className="text-xl font-bold text-red-primary">
          <AnimatedValue value={data.mediaAcimaTeto} format={formatCurrency} />
        </div>
        <p className="mt-1 text-[11px] text-gray-400">por membro/mês</p>
      </div>
    </div>
  );
}
