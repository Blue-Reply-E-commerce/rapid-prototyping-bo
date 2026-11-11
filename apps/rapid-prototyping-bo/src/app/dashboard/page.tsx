import { getDashboardData } from "@/lib/dashboard-data";
import { DashboardView } from "./dashboard-view";

export default async function DashboardPage() {
  const dashboard = await getDashboardData();
  return <DashboardView dashboard={dashboard} />;
}
