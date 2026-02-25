import type { MetadataRoute } from "next";
import { getMembers } from "@/data/get-members";
import { getStatsByOrgao } from "@/lib/aggregations";

const BASE_URL = "https://extrateto.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const orgaoStats = getStatsByOrgao(getMembers());
  const orgaoPages = Array.from(orgaoStats.keys()).map((orgao) => ({
    url: `${BASE_URL}/orgao/${encodeURIComponent(orgao)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/mapa`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/estatisticas`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/orgao`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...orgaoPages,
    {
      url: `${BASE_URL}/api-docs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/metodologia`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/sobre`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
