import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mapa de Calor por Estado",
  description:
    "Visualize no mapa do Brasil quais estados concentram mais supersalários no Judiciário acima do teto constitucional.",
  openGraph: {
    title: "Mapa de Calor por Estado | ExtraTeto",
    description:
      "Visualize no mapa do Brasil quais estados concentram mais supersalários no Judiciário.",
  },
};

export default function MapaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
