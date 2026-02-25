import { getMembers } from "@/data/get-members";
import { OrgaoDetailClient } from "./orgao-detail-client";

export default function OrgaoPage() {
  const members = getMembers();
  return <OrgaoDetailClient members={members} />;
}
