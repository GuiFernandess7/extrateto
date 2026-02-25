"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Fuse from "fuse.js";
import { Search, X } from "lucide-react";
import type { Member } from "@/data/mock-data";
import { formatCurrency } from "@/lib/utils";

interface SearchBarProps {
  members: Member[];
  onSearch: (query: string) => void;
  onSelectMember: (id: number) => void;
}

export function SearchBar({ members, onSearch, onSelectMember }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Member[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fuse = useRef(
    new Fuse(members, {
      keys: ["nome", "orgao", "cargo"],
      threshold: 0.4,
      ignoreLocation: true,
      getFn: (obj, path) => {
        const value = Fuse.config.getFn(obj, path);
        if (typeof value === "string") {
          return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }
        if (Array.isArray(value)) {
          return value.map(v => typeof v === "string" ? v.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : v);
        }
        return value;
      },
    })
  );

  useEffect(() => {
    fuse.current = new Fuse(members, {
      keys: ["nome", "orgao", "cargo"],
      threshold: 0.4,
      ignoreLocation: true,
      getFn: (obj, path) => {
        const value = Fuse.config.getFn(obj, path);
        if (typeof value === "string") {
          return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }
        if (Array.isArray(value)) {
          return value.map(v => typeof v === "string" ? v.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : v);
        }
        return value;
      },
    });
  }, [members]);

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);
      setSelectedIndex(-1);

      if (value.length < 2) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      const normalizedQuery = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const results = fuse.current.search(normalizedQuery, { limit: 6 });
      setSuggestions(results.map((r) => r.item));
      setIsOpen(results.length > 0);
    },
    []
  );

  // Debounced search for filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      onSelectMember(suggestions[selectedIndex].id);
      setIsOpen(false);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
          placeholder="Buscar por nome, tribunal ou cargo..."
          className="w-full rounded-lg border border-gray-200 bg-surface py-2.5 pl-10 pr-10 text-sm text-navy placeholder-gray-400 transition-colors focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy/20"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setSuggestions([]);
              setIsOpen(false);
              onSearch("");
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Autocomplete dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          {suggestions.map((member, index) => (
            <button
              key={member.id}
              onClick={() => {
                onSelectMember(member.id);
                setIsOpen(false);
              }}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                index === selectedIndex
                  ? "bg-surface"
                  : "hover:bg-gray-50"
              }`}
            >
              <div>
                <span className="font-medium text-navy">{member.nome}</span>
                <span className="ml-2 text-xs text-gray-500">
                  {member.cargo} &middot; {member.orgao}
                </span>
              </div>
              <span className="text-xs font-medium text-red-primary">
                {formatCurrency(member.remuneracaoTotal)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
