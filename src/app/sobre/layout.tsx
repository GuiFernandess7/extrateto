import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Sobre o ExtraTeto: ferramenta de fiscalização cidadã que expõe supersalários no Judiciário brasileiro.",
  openGraph: {
    title: "Sobre o ExtraTeto",
    description:
      "Ferramenta de fiscalização cidadã que expõe supersalários no Judiciário brasileiro.",
  },
};

export default function SobreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
