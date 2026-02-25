import type { Member } from "@/data/mock-data";

function sanitizeCSVField(value: string): string {
  const str = String(value).replace(/"/g, '""');
  const dangerous = ["=", "+", "-", "@", "\t", "\r"];
  if (dangerous.some((c) => str.startsWith(c))) {
    return `"'${str}"`;
  }
  return `"${str}"`;
}

export function exportToCSV(members: Member[], filename = "extrateto-dados.csv") {
  const headers = [
    "Posição",
    "Nome",
    "Cargo",
    "Órgão",
    "Estado",
    "Remuneração Base",
    "Verbas Indenizatórias",
    "Direitos Eventuais",
    "Direitos Pessoais",
    "Remuneração Total",
    "Acima do Teto",
    "% Acima do Teto",
  ];

  const rows = members.map((m, i) => [
    i + 1,
    sanitizeCSVField(m.nome),
    sanitizeCSVField(m.cargo),
    sanitizeCSVField(m.orgao),
    sanitizeCSVField(m.estado),
    m.remuneracaoBase.toFixed(2),
    m.verbasIndenizatorias.toFixed(2),
    m.direitosEventuais.toFixed(2),
    m.direitosPessoais.toFixed(2),
    m.remuneracaoTotal.toFixed(2),
    m.acimaTeto.toFixed(2),
    m.percentualAcimaTeto.toFixed(1),
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
