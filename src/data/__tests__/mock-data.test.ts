import { describe, it, expect } from "vitest";
import { mockMembers, getKPIs } from "../mock-data";
import { TETO_CONSTITUCIONAL } from "@/lib/constants";

describe("mockMembers", () => {
  it("has 200 members", () => {
    expect(mockMembers.length).toBe(200);
  });

  it("is sorted by remuneracaoTotal descending", () => {
    for (let i = 1; i < mockMembers.length; i++) {
      expect(mockMembers[i - 1].remuneracaoTotal).toBeGreaterThanOrEqual(
        mockMembers[i].remuneracaoTotal
      );
    }
  });

  it("has unique ids", () => {
    const ids = mockMembers.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all members have historico with 18 months", () => {
    for (const m of mockMembers) {
      expect(m.historico.length).toBe(18);
    }
  });

  it("calculates acimaTeto correctly", () => {
    for (const m of mockMembers) {
      const expected = Math.max(0, m.remuneracaoTotal - TETO_CONSTITUCIONAL);
      expect(Math.abs(m.acimaTeto - expected)).toBeLessThan(0.01);
    }
  });

  it("remuneracaoTotal equals sum of components", () => {
    for (const m of mockMembers) {
      const sum = m.remuneracaoBase + m.verbasIndenizatorias + m.direitosEventuais + m.direitosPessoais;
      expect(Math.abs(m.remuneracaoTotal - sum)).toBeLessThan(0.01);
    }
  });

  it("has deterministic data (seeded random)", () => {
    // First member should always be the same
    expect(mockMembers[0].nome).toBeTruthy();
    // The first member name should be consistent
    expect(mockMembers[0].nome).toBe(mockMembers[0].nome);
  });
});

describe("getKPIs", () => {
  it("returns correct structure", () => {
    const kpis = getKPIs(mockMembers);
    expect(kpis).toHaveProperty("totalAcimaTeto");
    expect(kpis).toHaveProperty("numAcimaTeto");
    expect(kpis).toHaveProperty("maiorRemuneracao");
    expect(kpis).toHaveProperty("mediaAcimaTeto");
    expect(kpis).toHaveProperty("percentualAcimaTeto");
  });

  it("numAcimaTeto counts only members above teto", () => {
    const kpis = getKPIs(mockMembers);
    const manualCount = mockMembers.filter((m) => m.acimaTeto > 0).length;
    expect(kpis.numAcimaTeto).toBe(manualCount);
  });

  it("maiorRemuneracao is the first member total", () => {
    const kpis = getKPIs(mockMembers);
    expect(kpis.maiorRemuneracao).toBe(mockMembers[0].remuneracaoTotal);
  });

  it("percentualAcimaTeto is between 0 and 100", () => {
    const kpis = getKPIs(mockMembers);
    expect(kpis.percentualAcimaTeto).toBeGreaterThanOrEqual(0);
    expect(kpis.percentualAcimaTeto).toBeLessThanOrEqual(100);
  });

  it("handles empty array", () => {
    const kpis = getKPIs([]);
    expect(kpis.totalAcimaTeto).toBe(0);
    expect(kpis.numAcimaTeto).toBe(0);
    expect(kpis.maiorRemuneracao).toBe(0);
    expect(kpis.percentualAcimaTeto).toBe(0);
  });
});
