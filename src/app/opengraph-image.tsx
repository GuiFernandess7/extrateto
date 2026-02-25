import { ImageResponse } from "next/og";
import { mockMembers, getKPIs } from "@/data/mock-data";

export const runtime = "edge";
export const alt = "ExtraTeto — Supersalários do Judiciário Brasileiro";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const kpis = getKPIs(mockMembers);

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
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              display: "flex",
            }}
          >
            <span style={{ color: "#DC2626" }}>Extra</span>
            <span style={{ color: "#1E293B" }}>Teto</span>
          </div>
        </div>

        <div
          style={{
            fontSize: 28,
            color: "#64748B",
            marginTop: 8,
          }}
        >
          Supersalários do Judiciário Brasileiro
        </div>

        {/* KPIs */}
        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: 48,
            flexWrap: "wrap",
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
              Membros Acima do Teto
            </span>
            <span
              style={{ fontSize: 48, fontWeight: 800, color: "#DC2626" }}
            >
              {kpis.numAcimaTeto}
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
              Total Acima do Teto/mês
            </span>
            <span
              style={{ fontSize: 48, fontWeight: 800, color: "#DC2626" }}
            >
              R${Math.round(kpis.totalAcimaTeto / 1000000)}mi
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
              Maior Remuneração
            </span>
            <span
              style={{ fontSize: 48, fontWeight: 800, color: "#1E293B" }}
            >
              R${Math.round(kpis.maiorRemuneracao / 1000)}k
            </span>
          </div>
        </div>

        {/* Footer */}
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
