import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estatísticas Agregadas",
  description:
    "Estatísticas consolidadas sobre supersalários no Judiciário brasileiro: composição de remuneração, distribuição por cargo e transparência.",
  openGraph: {
    title: "Estatísticas Agregadas | ExtraTeto",
    description:
      "Estatísticas consolidadas sobre supersalários no Judiciário brasileiro.",
  },
};

export default function EstatisticasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
