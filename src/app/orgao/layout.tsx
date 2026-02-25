import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard por Órgão",
  description:
    "Explore dados de supersalários por tribunal e órgão do Judiciário e Ministério Público brasileiro.",
  openGraph: {
    title: "Dashboard por Órgão | ExtraTeto",
    description:
      "Explore dados de supersalários por tribunal e órgão do Judiciário brasileiro.",
  },
};

export default function OrgaoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
