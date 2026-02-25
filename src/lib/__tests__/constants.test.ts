import { describe, it, expect } from "vitest";
import { TETO_CONSTITUCIONAL, ESTADOS, CARGOS, ORGAOS_POR_TIPO, ALL_ORGAOS } from "../constants";

describe("TETO_CONSTITUCIONAL", () => {
  it("is the correct 2025 value", () => {
    expect(TETO_CONSTITUCIONAL).toBe(46366.19);
  });
});

describe("ESTADOS", () => {
  it("has 27 states", () => {
    expect(ESTADOS.length).toBe(27);
  });

  it("includes SP", () => {
    expect(ESTADOS.find((e) => e.sigla === "SP")).toBeDefined();
  });

  it("includes DF", () => {
    expect(ESTADOS.find((e) => e.sigla === "DF")).toBeDefined();
  });

  it("has unique siglas", () => {
    const siglas = ESTADOS.map((e) => e.sigla);
    expect(new Set(siglas).size).toBe(siglas.length);
  });
});

describe("CARGOS", () => {
  it("has 6 cargo types", () => {
    expect(CARGOS.length).toBe(6);
  });
});

describe("ORGAOS_POR_TIPO", () => {
  it("has 5 categories", () => {
    expect(Object.keys(ORGAOS_POR_TIPO).length).toBeGreaterThanOrEqual(5);
  });

  it("has 27 TJs", () => {
    expect(ORGAOS_POR_TIPO["Tribunais de Justiça"].length).toBe(27);
  });
});

describe("ALL_ORGAOS", () => {
  it("flattens all organs into a single array", () => {
    expect(ALL_ORGAOS.length).toBeGreaterThan(50);
  });
});
