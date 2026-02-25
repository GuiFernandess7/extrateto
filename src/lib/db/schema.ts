import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const membros = sqliteTable("membros", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
  cargo: text("cargo").notNull(),
  orgao: text("orgao").notNull(),
  estado: text("estado").notNull(),
  remuneracaoBase: real("remuneracao_base").notNull(),
  verbasIndenizatorias: real("verbas_indenizatorias").notNull(),
  direitosEventuais: real("direitos_eventuais").notNull(),
  direitosPessoais: real("direitos_pessoais").notNull(),
  remuneracaoTotal: real("remuneracao_total").notNull(),
  acimaTeto: real("acima_teto").notNull(),
  percentualAcimaTeto: real("percentual_acima_teto").notNull(),
  mesReferencia: text("mes_referencia").notNull(), // "2025-06"
  anoReferencia: integer("ano_referencia").notNull(),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const historicoMensal = sqliteTable("historico_mensal", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  membroId: integer("membro_id").notNull().references(() => membros.id),
  mes: text("mes").notNull(), // "Jan/24"
  remuneracaoBase: real("remuneracao_base").notNull(),
  remuneracaoTotal: real("remuneracao_total").notNull(),
});

export const syncLog = sqliteTable("sync_log", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orgao: text("orgao").notNull(),
  mesReferencia: text("mes_referencia").notNull(),
  totalMembros: integer("total_membros").notNull(),
  status: text("status").notNull(), // "success" | "error"
  errorMessage: text("error_message"),
  syncedAt: text("synced_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export type Membro = typeof membros.$inferSelect;
export type NovoMembro = typeof membros.$inferInsert;
export type HistoricoMensal = typeof historicoMensal.$inferSelect;
export type SyncLogEntry = typeof syncLog.$inferSelect;
