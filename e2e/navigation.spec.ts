import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("homepage loads with KPI cards and leaderboard", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/ExtraTeto/);

    // KPIs visible
    await expect(page.getByText("Total Pago Acima do Teto")).toBeVisible();
    await expect(page.getByText("Membros Acima do Teto")).toBeVisible();

    // Leaderboard visible
    await expect(page.getByText("Ranking de Remunerações")).toBeVisible();

    // First member card visible (exact match to avoid #10, #11, etc.)
    await expect(page.getByText("#1", { exact: true }).first()).toBeVisible();
  });

  test("nav links work", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation");

    // Navigate to Mapa
    await nav.getByRole("link", { name: "Mapa" }).click();
    await expect(page).toHaveTitle(/Mapa/);
    await expect(
      page.getByRole("heading", { name: "Mapa de Calor por Estado" })
    ).toBeVisible();

    // Navigate to Estatísticas
    await nav.getByRole("link", { name: "Estatísticas" }).click();
    await expect(page).toHaveTitle(/Estatísticas/);

    // Navigate to Órgãos
    await nav.getByRole("link", { name: "Órgãos" }).click();
    await expect(page).toHaveTitle(/Órgão/);

    // Navigate to API
    await nav.getByRole("link", { name: "API" }).click();
    await expect(page).toHaveTitle(/API/);
  });

  test("organ detail page loads", async ({ page }) => {
    await page.goto("/orgao");
    // Click the first organ card
    await page.locator("a[href*='/orgao/']").first().click();
    await expect(page.getByText("Total Membros")).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Acima do Teto" })
    ).toBeVisible();
  });
});

test.describe("Search", () => {
  test("search filters results", async ({ page }) => {
    await page.goto("/");
    const searchInput = page
      .getByPlaceholder("Buscar por nome, tribunal ou cargo...")
      .first();
    await searchInput.fill("promotor");

    // Wait for results to update
    await page.waitForTimeout(500);

    // Should show filtered count
    await expect(page.getByText(/resultados/)).toBeVisible();
  });
});

test.describe("Filters", () => {
  test("export CSV button exists", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Exportar CSV")).toBeVisible();
  });
});

test.describe("SEO", () => {
  test("sitemap.xml is accessible", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBe(200);
  });

  test("robots.txt is accessible", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    expect(response?.status()).toBe(200);
    const text = await page.textContent("body");
    expect(text).toContain("User-Agent");
    expect(text).toContain("Sitemap");
  });
});

test.describe("API", () => {
  test("GET /api/v1/membros returns data", async ({ request }) => {
    const response = await request.get("/api/v1/membros?limit=5");
    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(json.data).toBeDefined();
    expect(json.data.length).toBeLessThanOrEqual(5);
    expect(json.meta).toBeDefined();
  });

  test("GET /api/v1/orgaos returns data", async ({ request }) => {
    const response = await request.get("/api/v1/orgaos");
    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(json.data).toBeDefined();
    expect(json.data.length).toBeGreaterThan(0);
  });

  test("GET /api/v1/estados returns data", async ({ request }) => {
    const response = await request.get("/api/v1/estados");
    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(json.data).toBeDefined();
  });
});
