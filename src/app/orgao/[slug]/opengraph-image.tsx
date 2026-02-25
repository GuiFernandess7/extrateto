import { ImageResponse } from "next/og";
import { mockMembers } from "@/data/mock-data";
import { getStatsByOrgao } from "@/lib/aggregations";

export const runtime = "edge";
export const alt = "ExtraTeto — Dashboard do Órgão";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const orgao = decodeURIComponent(slug);
  const stats = getStatsByOrgao(mockMembers);
  const orgaoStats = stats.get(orgao);

  const totalMembros = orgaoStats?.totalMembros ?? 0;
  const membrosAcima = orgaoStats?.membrosAcimaTeto ?? 0;
  const totalAcima = orgaoStats?.totalAcimaTeto ?? 0;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#FAFAFA",
          padding: 60,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 24, color: "#64748B" }}>ExtraTeto</span>
        </div>

        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "#1E293B",
            marginTop: 24,
          }}
        >
          {orgao}
        </div>

        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: 48,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: 16,
              padding: "24px 32px",
              border: "1px solid #E5E7EB",
            }}
          >
            <span style={{ fontSize: 16, color: "#94A3B8" }}>
              Total Membros
            </span>
            <span
              style={{ fontSize: 48, fontWeight: 800, color: "#1E293B" }}
            >
              {totalMembros}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: 16,
              padding: "24px 32px",
              border: "1px solid #E5E7EB",
            }}
          >
            <span style={{ fontSize: 16, color: "#94A3B8" }}>
              Acima do Teto
            </span>
            <span
              style={{ fontSize: 48, fontWeight: 800, color: "#DC2626" }}
            >
              {membrosAcima}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: 16,
              padding: "24px 32px",
              border: "1px solid #E5E7EB",
            }}
          >
            <span style={{ fontSize: 16, color: "#94A3B8" }}>
              Total Acima/mês
            </span>
            <span
              style={{ fontSize: 48, fontWeight: 800, color: "#DC2626" }}
            >
              R${Math.round(totalAcima / 1000)}k
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
          }}
        >
          <span style={{ fontSize: 18, color: "#94A3B8" }}>
            Dados públicos · Fiscalização cidadã
          </span>
          <span style={{ fontSize: 18, color: "#94A3B8" }}>
            extrateto.org
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
