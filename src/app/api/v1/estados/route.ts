import { NextResponse } from "next/server";
import { getMembers } from "@/data/get-members";
import { getStatsByEstado } from "@/lib/aggregations";

export async function GET() {
  const stats = getStatsByEstado(getMembers());
  const data = Array.from(stats.values()).sort(
    (a, b) => b.totalAcimaTeto - a.totalAcimaTeto
  );

  return NextResponse.json({ data });
}
