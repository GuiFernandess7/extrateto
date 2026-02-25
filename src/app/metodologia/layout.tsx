import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metodologia",
  description:
    "Como os dados de supersalários do Judiciário são coletados, processados e apresentados no ExtraTeto.",
  openGraph: {
    title: "Metodologia | ExtraTeto",
    description:
      "Como os dados de supersalários do Judiciário são coletados e processados.",
  },
};

export default function MetodologiaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
