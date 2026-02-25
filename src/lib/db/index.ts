import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { sql } from "drizzle-orm";
import path from "path";
import * as schema from "./schema";

const DB_PATH = path.join(process.cwd(), "data", "extrateto.db");

let _db: ReturnType<typeof createDb> | null = null;

function createDb(readonly = true) {
  const sqlite = new Database(DB_PATH, readonly ? { readonly: true } : undefined);
  sqlite.pragma("journal_mode = WAL");
  if (!readonly) sqlite.pragma("foreign_keys = ON");
  return drizzle(sqlite, { schema });
}

export function getDb() {
  if (!_db) {
    _db = createDb(true);
  }
  return _db;
}

export function initDb() {
  const db = createDb(false);

  db.run(sql`CREATE TABLE IF NOT EXISTS membros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cargo TEXT NOT NULL,
    orgao TEXT NOT NULL,
    estado TEXT NOT NULL,
    remuneracao_base REAL NOT NULL,
    verbas_indenizatorias REAL NOT NULL,
    direitos_eventuais REAL NOT NULL,
    direitos_pessoais REAL NOT NULL,
    remuneracao_total REAL NOT NULL,
    acima_teto REAL NOT NULL,
    percentual_acima_teto REAL NOT NULL,
    mes_referencia TEXT NOT NULL,
    ano_referencia INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`);

  db.run(sql`CREATE TABLE IF NOT EXISTS historico_mensal (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    membro_id INTEGER NOT NULL REFERENCES membros(id),
    mes TEXT NOT NULL,
    remuneracao_base REAL NOT NULL,
    remuneracao_total REAL NOT NULL
  )`);

  db.run(sql`CREATE TABLE IF NOT EXISTS sync_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orgao TEXT NOT NULL,
    mes_referencia TEXT NOT NULL,
    total_membros INTEGER NOT NULL,
    status TEXT NOT NULL,
    error_message TEXT,
    synced_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`);

  // Indexes for common queries
  db.run(sql`CREATE INDEX IF NOT EXISTS idx_membros_estado ON membros(estado)`);
  db.run(sql`CREATE INDEX IF NOT EXISTS idx_membros_orgao ON membros(orgao)`);
  db.run(sql`CREATE INDEX IF NOT EXISTS idx_membros_remuneracao ON membros(remuneracao_total DESC)`);
  db.run(sql`CREATE INDEX IF NOT EXISTS idx_membros_acima_teto ON membros(acima_teto DESC)`);
  db.run(sql`CREATE INDEX IF NOT EXISTS idx_membros_mes ON membros(mes_referencia)`);
  db.run(sql`CREATE INDEX IF NOT EXISTS idx_historico_membro ON historico_mensal(membro_id)`);

  return db;
}

export { schema };
