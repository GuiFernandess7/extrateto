import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Pública",
  description:
    "Documentação da API pública do ExtraTeto. Acesse dados de remuneração do Judiciário brasileiro programaticamente.",
  openGraph: {
    title: "API Pública | ExtraTeto",
    description:
      "Acesse dados de remuneração do Judiciário brasileiro programaticamente via API REST.",
  },
};

export default function ApiDocsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
