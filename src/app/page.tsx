import { getMembers, getDataMonth, getAvailableMonths } from "@/data/get-members";
import { HomeClient } from "./home-client";

interface Props {
  searchParams: Promise<{ mes?: string }>;
}

function isValidMesRef(mes: string): boolean {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(mes);
}

export default async function Home({ searchParams }: Props) {
  const { mes } = await searchParams;
  const availableMonths = getAvailableMonths();
  const validMes = mes && isValidMesRef(mes) ? mes : undefined;
  const currentMonth = validMes || (availableMonths.length > 0 ? availableMonths[0].value : undefined);
  const members = getMembers(currentMonth);
  const dataMonth = getDataMonth(currentMonth);
  return (
    <HomeClient
      members={members}
      dataMonth={dataMonth}
      availableMonths={availableMonths}
      currentMonth={currentMonth}
    />
  );
}
