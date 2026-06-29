import { getMockDashboardResponse } from "@/lib/dashboard-data";

export function GET() {
  return Response.json(getMockDashboardResponse());
}
