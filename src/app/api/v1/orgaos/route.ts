import { NextResponse } from "next/server";
import { getMembers } from "@/data/get-members";
import { getStatsByOrgao } from "@/lib/aggregations";

export async function GET() {
  const stats = getStatsByOrgao(getMembers());
  const data = Array.from(stats.values())
    .map(({ membros, ...rest }) => ({
      ...rest,
      totalMembrosIds: membros.map((m) => m.id),
    }))
    .sort((a, b) => b.totalAcimaTeto - a.totalAcimaTeto);

  return NextResponse.json({ data });
}
