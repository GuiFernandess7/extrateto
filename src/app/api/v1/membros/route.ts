import { NextRequest, NextResponse } from "next/server";
import { getMembers } from "@/data/get-members";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  let result = [...getMembers()];

  // Filters
  const estado = searchParams.get("estado");
  if (estado) result = result.filter((m) => m.estado === estado);

  const orgao = searchParams.get("orgao");
  if (orgao) result = result.filter((m) => m.orgao === orgao);

  const cargo = searchParams.get("cargo");
  if (cargo) result = result.filter((m) => m.cargo === cargo);

  const nome = searchParams.get("nome");
  if (nome) {
    const q = nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    result = result.filter((m) =>
      m.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(q)
    );
  }

  const acima_teto = searchParams.get("acima_teto");
  if (acima_teto === "true") result = result.filter((m) => m.acimaTeto > 0);

  // Sort
  const sort = searchParams.get("sort") || "maior_remuneracao";
  switch (sort) {
    case "maior_acima_teto":
      result.sort((a, b) => b.acimaTeto - a.acimaTeto);
      break;
    case "nome":
      result.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
      break;
    default:
      result.sort((a, b) => b.remuneracaoTotal - a.remuneracaoTotal);
  }

  // Pagination
  const rawPage = parseInt(searchParams.get("page") || "1", 10);
  const page = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
  const rawLimit = parseInt(searchParams.get("limit") || "50", 10);
  const limit = isNaN(rawLimit) || rawLimit < 1 ? 50 : Math.min(rawLimit, 200);
  const offset = (page - 1) * limit;
  const total = result.length;
  const paged = result.slice(offset, offset + limit);

  // Strip historico for list endpoint (lighter response)
  const data = paged.map(({ historico, ...rest }) => rest);

  return NextResponse.json({
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}
