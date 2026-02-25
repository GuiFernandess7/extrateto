"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown, Calendar } from "lucide-react";
import { ESTADOS, CARGOS, ORGAOS_POR_TIPO, type SortOption, type Cargo } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

export interface FilterState {
  estado: string;
  orgao: string;
  cargos: Cargo[];
  salarioMin: number;
  salarioMax: number;
  sortBy: SortOption;
}

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  totalResults: number;
  filteredResults: number;
  availableMonths?: { value: string; label: string }[];
  currentMonth?: string;
}

export const defaultFilters: FilterState = {
  estado: "",
  orgao: "",
  cargos: [],
  salarioMin: 0,
  salarioMax: 300000,
  sortBy: "maior_remuneracao",
};

export function FilterBar({ filters, onFiltersChange, totalResults, filteredResults, availableMonths, currentMonth }: FilterBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasActiveFilters =
    filters.estado !== "" ||
    filters.orgao !== "" ||
    filters.cargos.length > 0;

  const activeFilterCount =
    (filters.estado ? 1 : 0) +
    (filters.orgao ? 1 : 0) +
    filters.cargos.length;

  function update(partial: Partial<FilterState>) {
    onFiltersChange({ ...filters, ...partial });
  }

  function clearAll() {
    onFiltersChange({ ...defaultFilters });
  }

  function toggleCargo(cargo: Cargo) {
    const next = filters.cargos.includes(cargo)
      ? filters.cargos.filter((c) => c !== cargo)
      : [...filters.cargos, cargo];
    update({ cargos: next });
  }

  function handleMonthChange(mesRef: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (mesRef) {
      params.set("mes", mesRef);
    } else {
      params.delete("mes");
    }
    router.push(`/?${params.toString()}`);
  }

  const selectClass =
    "w-full appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm text-navy transition-all focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/10 hover:border-gray-300";

  const filterContent = (
    <div className="flex flex-col gap-4">
      {/* Row of selects */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:gap-3">
        {/* Periodo */}
        {availableMonths && availableMonths.length > 0 && (
          <div className="flex flex-col gap-1.5 lg:flex-1">
            <label className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              <Calendar className="h-3 w-3" />
              Período
            </label>
            <div className="relative">
              <select
                value={currentMonth || ""}
                onChange={(e) => handleMonthChange(e.target.value)}
                className={selectClass}
              >
                {availableMonths.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        )}

        {/* Estado */}
        <div className="flex flex-col gap-1.5 lg:flex-1">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Estado
          </label>
          <div className="relative">
            <select
              value={filters.estado}
              onChange={(e) => update({ estado: e.target.value, orgao: "" })}
              className={`${selectClass} ${filters.estado ? "border-navy/30 bg-navy/[0.02]" : ""}`}
            >
              <option value="">Todos</option>
              {ESTADOS.map((e) => (
                <option key={e.sigla} value={e.sigla}>
                  {e.sigla} — {e.nome}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Orgao */}
        <div className="flex flex-col gap-1.5 lg:flex-1">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Tribunal / Órgão
          </label>
          <div className="relative">
            <select
              value={filters.orgao}
              onChange={(e) => update({ orgao: e.target.value })}
              className={`${selectClass} ${filters.orgao ? "border-navy/30 bg-navy/[0.02]" : ""}`}
            >
              <option value="">Todos</option>
              {Object.entries(ORGAOS_POR_TIPO).map(([grupo, orgaos]) => (
                <optgroup key={grupo} label={grupo}>
                  {orgaos.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Cargo chips + results in a row */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 lg:sr-only">
            Cargo
          </label>
          <div className="flex flex-wrap gap-1.5">
            {CARGOS.map((cargo) => {
              const isActive = filters.cargos.includes(cargo);
              return (
                <button
                  key={cargo}
                  onClick={() => toggleCargo(cargo)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-navy text-white shadow-sm ring-1 ring-navy/20"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-navy hover:shadow-sm active:scale-95"
                  }`}
                >
                  {isActive && (
                    <span className="mr-1">✓</span>
                  )}
                  {cargo}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results count + clear */}
        <div className="flex items-center gap-3 border-t border-gray-100 pt-3 lg:border-0 lg:pt-0">
          <p className="text-xs text-gray-500 whitespace-nowrap">
            <span className="font-bold text-navy">{formatNumber(filteredResults)}</span>{" "}
            de {formatNumber(totalResults)} resultados
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-red-primary transition-colors hover:bg-red-50 hover:text-red-700 whitespace-nowrap"
            >
              <X className="h-3.5 w-3.5" />
              Limpar filtros
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: horizontal filter bar */}
      <div className="hidden lg:block">
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          {filterContent}
        </div>
      </div>

      {/* Mobile: collapsible panel */}
      <div className="lg:hidden">
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex w-full items-center justify-between rounded-lg px-1 py-1"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-semibold text-navy">Filtros</span>
              {hasActiveFilters && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-primary px-1.5 text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </div>
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform ${
                mobileOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {mobileOpen && (
            <div className="mt-4">{filterContent}</div>
          )}
          {!mobileOpen && (
            <div className="mt-2 border-t border-gray-100 pt-2">
              <p className="text-xs text-gray-500">
                <span className="font-bold text-navy">{formatNumber(filteredResults)}</span>{" "}
                de {formatNumber(totalResults)} resultados
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
