import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatCurrencyFull,
  formatPercent,
  formatNumber,
  formatCompactCurrency,
  removeAccents,
} from "../utils";

describe("formatCurrency", () => {
  it("formats positive values with R$ prefix", () => {
    const result = formatCurrency(46366);
    expect(result).toContain("46.366");
  });

  it("formats zero", () => {
    const result = formatCurrency(0);
    expect(result).toContain("0");
  });

  it("rounds to no decimals", () => {
    const result = formatCurrency(100.99);
    expect(result).toContain("101");
  });
});

describe("formatCurrencyFull", () => {
  it("includes two decimal places", () => {
    const result = formatCurrencyFull(46366.19);
    expect(result).toContain("46.366,19");
  });

  it("pads single decimal", () => {
    const result = formatCurrencyFull(100.5);
    expect(result).toContain("100,50");
  });
});

describe("formatPercent", () => {
  it("formats with one decimal place", () => {
    expect(formatPercent(38.0)).toBe("38.0%");
  });

  it("formats zero", () => {
    expect(formatPercent(0)).toBe("0.0%");
  });

  it("formats large percentages", () => {
    expect(formatPercent(372.7)).toBe("372.7%");
  });
});

describe("formatNumber", () => {
  it("formats with thousands separator", () => {
    const result = formatNumber(1000);
    expect(result).toContain("1.000");
  });

  it("formats small numbers unchanged", () => {
    expect(formatNumber(42)).toBe("42");
  });
});

describe("formatCompactCurrency", () => {
  it("formats billions", () => {
    expect(formatCompactCurrency(1_500_000_000)).toBe("R$1.5 bi");
  });

  it("formats millions", () => {
    expect(formatCompactCurrency(39_300_000)).toBe("R$39.3 mi");
  });

  it("formats thousands", () => {
    expect(formatCompactCurrency(46366)).toBe("R$46 mil");
  });

  it("formats small values as currency", () => {
    const result = formatCompactCurrency(500);
    expect(result).toContain("500");
  });
});

describe("removeAccents", () => {
  it("removes accents from Portuguese text", () => {
    expect(removeAccents("São Paulo")).toBe("Sao Paulo");
  });

  it("handles tildes", () => {
    expect(removeAccents("remuneração")).toBe("remuneracao");
  });

  it("handles cedilla", () => {
    expect(removeAccents("Justiça")).toBe("Justica");
  });

  it("returns plain text unchanged", () => {
    expect(removeAccents("hello")).toBe("hello");
  });

  it("handles empty string", () => {
    expect(removeAccents("")).toBe("");
  });
});
