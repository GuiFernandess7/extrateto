"use client";

import { useState, useCallback, useRef } from "react";
import { Download } from "lucide-react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { Member } from "@/data/mock-data";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";
import { exportToCSV } from "@/lib/export-csv";
import { MemberCard } from "./member-card";
import { Pagination } from "./pagination";

interface LeaderboardProps {
  members: Member[];
  highlightMemberId?: number | null;
}

const VIRTUALIZATION_THRESHOLD = 100;

export function Leaderboard({ members, highlightMemberId }: LeaderboardProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState<number | null>(highlightMemberId ?? null);
  const parentRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(members.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageMembers = members.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const useVirtual = pageMembers.length > VIRTUALIZATION_THRESHOLD;

  const virtualizer = useVirtualizer({
    count: pageMembers.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
    overscan: 5,
    enabled: useVirtual,
  });

  const handleToggle = useCallback((id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    setExpandedId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Reset page when members change
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }

  return (
    <div>
      {/* Header row */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <h2 className="font-serif text-xl font-bold text-navy sm:text-2xl">
            Ranking de Remunerações
          </h2>
          <span className="text-sm font-medium text-gray-400">
            {formatNumber(members.length)} membros
          </span>
        </div>
        <button
          onClick={() => exportToCSV(members)}
          className="flex items-center gap-1.5 rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-navy/90 hover:shadow-md active:scale-[0.98]"
        >
          <Download className="h-3.5 w-3.5" />
          Exportar CSV
        </button>
      </div>

      {/* Cards */}
      {members.length === 0 ? (
        <div className="rounded-xl border border-gray-100 bg-white p-16 text-center">
          <p className="text-lg font-medium text-gray-400">🔍</p>
          <p className="mt-2 text-sm font-medium text-gray-500">
            Nenhum resultado encontrado
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Tente ajustar os filtros ou limpar a busca.
          </p>
        </div>
      ) : useVirtual ? (
        // Virtualized list for large datasets
        <div
          ref={parentRef}
          className="max-h-[80vh] overflow-auto"
        >
          <div
            className="relative"
            style={{ height: `${virtualizer.getTotalSize()}px` }}
          >
            {virtualizer.getVirtualItems().map((virtualItem) => {
              const member = pageMembers[virtualItem.index];
              return (
                <div
                  key={member.id}
                  className="absolute left-0 w-full"
                  style={{
                    top: `${virtualItem.start}px`,
                    paddingBottom: 12,
                  }}
                  ref={virtualizer.measureElement}
                  data-index={virtualItem.index}
                >
                  <MemberCard
                    member={member}
                    rank={startIndex + virtualItem.index + 1}
                    isExpanded={expandedId === member.id}
                    onToggle={() => handleToggle(member.id)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // Regular list for smaller datasets
        <div className="flex flex-col gap-3">
          {pageMembers.map((member, index) => (
            <MemberCard
              key={member.id}
              member={member}
              rank={startIndex + index + 1}
              isExpanded={expandedId === member.id}
              onToggle={() => handleToggle(member.id)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={members.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
