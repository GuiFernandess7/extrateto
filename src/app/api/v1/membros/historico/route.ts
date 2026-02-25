import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const nome = searchParams.get("nome");
  const orgao = searchParams.get("orgao");

  if (!nome || !orgao) {
    return NextResponse.json(
      { error: "nome and orgao are required" },
      { status: 400 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Database = require("better-sqlite3");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const path = require("path");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs = require("fs");

  const dbPath = path.join(process.cwd(), "data", "extrateto.db");
  if (!fs.existsSync(dbPath)) {
    return NextResponse.json({ data: [] });
  }

  let db;
  try {
    db = new Database(dbPath, { readonly: true });

    const rows = db
      .prepare(
        `SELECT mes_referencia, remuneracao_base, verbas_indenizatorias,
                direitos_eventuais, direitos_pessoais, remuneracao_total
         FROM membros
         WHERE nome = ? AND orgao = ?
         ORDER BY mes_referencia ASC`
      )
      .all(nome, orgao) as {
      mes_referencia: string;
      remuneracao_base: number;
      verbas_indenizatorias: number;
      direitos_eventuais: number;
      direitos_pessoais: number;
      remuneracao_total: number;
    }[];

    const historico = rows.map((r) => ({
      mes: r.mes_referencia,
      remuneracaoBase: r.remuneracao_base,
      verbasIndenizatorias: r.verbas_indenizatorias,
      direitosEventuais: r.direitos_eventuais,
      direitosPessoais: r.direitos_pessoais,
      remuneracaoTotal: r.remuneracao_total,
    }));

    return NextResponse.json({ data: historico });
  } catch {
    return NextResponse.json({ data: [] });
  } finally {
    db?.close();
  }
}
