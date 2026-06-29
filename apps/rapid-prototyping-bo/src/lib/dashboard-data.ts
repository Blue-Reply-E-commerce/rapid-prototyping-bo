import {
  dashboardHappyPathFixture,
  parseDashboardSuccessResponse,
  type DashboardSuccessResponse
} from "@rapid-prototyping-bo/api-client";

export async function getDashboardData(): Promise<DashboardSuccessResponse> {
  return getMockDashboardResponse();
}

export function getMockDashboardResponse(): DashboardSuccessResponse {
  return parseDashboardSuccessResponse(dashboardHappyPathFixture);
}
