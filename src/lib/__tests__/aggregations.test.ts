import { describe, it, expect } from "vitest";
import { getStatsByEstado, getStatsByOrgao, getSalaryComparison } from "../aggregations";
import { mockMembers } from "@/data/mock-data";

describe("getStatsByEstado", () => {
  const stats = getStatsByEstado(mockMembers);

  it("returns a Map with state entries", () => {
    expect(stats.size).toBeGreaterThan(0);
  });

  it("contains SP as a key", () => {
    expect(stats.has("SP")).toBe(true);
  });

  it("has correct structure for each state", () => {
    const sp = stats.get("SP");
    expect(sp).toBeDefined();
    expect(sp!.estado).toBe("SP");
    expect(sp!.totalMembros).toBeGreaterThan(0);
    expect(typeof sp!.totalAcimaTeto).toBe("number");
    expect(typeof sp!.membrosAcimaTeto).toBe("number");
    expect(typeof sp!.percentualAcimaTeto).toBe("number");
  });

  it("totalMembros across all states equals total members", () => {
    let total = 0;
    for (const [, s] of stats) {
      total += s.totalMembros;
    }
    expect(total).toBe(mockMembers.length);
  });
});

describe("getStatsByOrgao", () => {
  const stats = getStatsByOrgao(mockMembers);

  it("returns a Map with organ entries", () => {
    expect(stats.size).toBeGreaterThan(0);
  });

  it("has transparency scores between 0-100", () => {
    for (const [, s] of stats) {
      expect(s.transparenciaScore).toBeGreaterThanOrEqual(0);
      expect(s.transparenciaScore).toBeLessThanOrEqual(100);
    }
  });

  it("member counts add up", () => {
    let total = 0;
    for (const [, s] of stats) {
      total += s.totalMembros;
    }
    expect(total).toBe(mockMembers.length);
  });

  it("includes membros array sorted by remuneracaoTotal desc", () => {
    for (const [, s] of stats) {
      if (s.membros.length >= 2) {
        expect(s.membros[0].remuneracaoTotal).toBeGreaterThanOrEqual(
          s.membros[1].remuneracaoTotal
        );
      }
    }
  });
});

describe("getSalaryComparison", () => {
  it("returns comparison entries", () => {
    const comparisons = getSalaryComparison(100000);
    expect(comparisons.length).toBeGreaterThan(0);
  });

  it("calculates months equivalent correctly", () => {
    const comparisons = getSalaryComparison(100000);
    for (const c of comparisons) {
      expect(c.mesesEquivalentes).toBeGreaterThan(0);
      expect(c.mesesEquivalentes).toBe(
        Math.round(100000 / c.salario)
      );
    }
  });
});
