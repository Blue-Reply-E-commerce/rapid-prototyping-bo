import {
  parseDashboardErrorResponse,
  parseDashboardSuccessResponse,
  type DashboardDeliveryImpact,
  type DashboardQueueStatus,
  type DashboardSuccessResponse
} from "../dashboard";

const generatedAt = "2026-01-15T09:00:00.000Z";

const preview = {
  label: "Mock-only preview",
  description: "No secrets, VPN, production credentials, live backend, or real customer data required."
} as const;

const previewGuarantees: DashboardSuccessResponse["previewGuarantees"] = [
  {
    id: "deterministic-content",
    label: "Deterministic local dashboard content."
  },
  {
    id: "no-production-api",
    label: "No production API calls in the initial route."
  },
  {
    id: "no-env-required",
    label: "No required environment variables for preview builds."
  },
  {
    id: "no-live-data",
    label: "No customer data or live credentials."
  }
];

const currentBackendExpectations: DashboardSuccessResponse["backendExpectations"] = [
  {
    id: "summary-card-shape",
    fieldPath: "summaryCards[].{label,value,detail}",
    reason: "Dashboard cards render operational totals and review hints.",
    backendTaskRequired: false
  },
  {
    id: "work-queue-shape",
    fieldPath: "workQueue[].{item,owner,status,statusLabel,impact,impactLabel}",
    reason: "The dashboard table needs ownership, workflow state, and delivery impact.",
    backendTaskRequired: false
  }
];

export const dashboardHappyPathFixture = parseDashboardSuccessResponse({
  kind: "success",
  generatedAt,
  preview,
  summaryCards: [
    {
      id: "prototype-requests",
      label: "Prototype requests",
      value: "12",
      detail: "4 ready for review"
    },
    {
      id: "open-handoff-prs",
      label: "Open handoff PRs",
      value: "3",
      detail: "2 awaiting FE review"
    },
    {
      id: "contract-changes",
      label: "Contract changes",
      value: "5",
      detail: "1 needs backend task"
    },
    {
      id: "preview-health",
      label: "Preview health",
      value: "100%",
      detail: "Mock runtime available"
    }
  ],
  workQueue: [
    {
      id: "dashboard-filters",
      item: "Dashboard filters",
      owner: "Frontend",
      status: "prototype",
      statusLabel: "Prototype",
      impact: "ui-only",
      impactLabel: "UI only"
    },
    {
      id: "order-detail-summary",
      item: "Order detail summary",
      owner: "Product",
      status: "review",
      statusLabel: "Review",
      impact: "contract-change",
      impactLabel: "Contract change"
    },
    {
      id: "delivery-story-handoff",
      item: "Delivery story handoff",
      owner: "Delivery",
      status: "ready",
      statusLabel: "Ready",
      impact: "jira-draft",
      impactLabel: "Jira draft"
    }
  ],
  previewGuarantees,
  backendExpectations: currentBackendExpectations
} satisfies DashboardSuccessResponse);

export const dashboardEmptyStateFixture = parseDashboardSuccessResponse({
  kind: "success",
  generatedAt,
  preview,
  summaryCards: [
    {
      id: "prototype-requests",
      label: "Prototype requests",
      value: "0",
      detail: "No active prototype requests"
    },
    {
      id: "open-handoff-prs",
      label: "Open handoff PRs",
      value: "0",
      detail: "No handoff PRs waiting"
    },
    {
      id: "contract-changes",
      label: "Contract changes",
      value: "0",
      detail: "No backend impact logged"
    },
    {
      id: "preview-health",
      label: "Preview health",
      value: "100%",
      detail: "Mock runtime available"
    }
  ],
  workQueue: [],
  previewGuarantees,
  backendExpectations: currentBackendExpectations
} satisfies DashboardSuccessResponse);

const statusCycle = [
  {
    status: "prototype",
    statusLabel: "Prototype"
  },
  {
    status: "review",
    statusLabel: "Review"
  },
  {
    status: "ready",
    statusLabel: "Ready"
  },
  {
    status: "blocked",
    statusLabel: "Blocked"
  }
] as const satisfies ReadonlyArray<{
  status: DashboardQueueStatus;
  statusLabel: string;
}>;

const impactCycle = [
  {
    impact: "ui-only",
    impactLabel: "UI only"
  },
  {
    impact: "contract-change",
    impactLabel: "Contract change"
  },
  {
    impact: "jira-draft",
    impactLabel: "Jira draft"
  },
  {
    impact: "backend-follow-up",
    impactLabel: "Backend follow-up"
  }
] as const satisfies ReadonlyArray<{
  impact: DashboardDeliveryImpact;
  impactLabel: string;
}>;

const ownerCycle = ["Frontend", "Product", "Delivery", "Backend"] as const;

function createLargeWorkQueue(): DashboardSuccessResponse["workQueue"] {
  return Array.from({ length: 32 }, (_, index) => {
    const ordinal = index + 1;
    const status = statusCycle[index % statusCycle.length] ?? statusCycle[0];
    const impact = impactCycle[index % impactCycle.length] ?? impactCycle[0];
    const owner = ownerCycle[index % ownerCycle.length] ?? ownerCycle[0];

    return {
      id: `large-prototype-${ordinal}`,
      item: `Generated prototype change ${ordinal}`,
      owner,
      status: status.status,
      statusLabel: status.statusLabel,
      impact: impact.impact,
      impactLabel: impact.impactLabel
    };
  });
}

export const dashboardLargeDataFixture = parseDashboardSuccessResponse({
  kind: "success",
  generatedAt,
  preview,
  summaryCards: [
    {
      id: "prototype-requests",
      label: "Prototype requests",
      value: "128",
      detail: "32 active queue items"
    },
    {
      id: "open-handoff-prs",
      label: "Open handoff PRs",
      value: "24",
      detail: "8 awaiting FE review"
    },
    {
      id: "contract-changes",
      label: "Contract changes",
      value: "19",
      detail: "6 need backend tasks"
    },
    {
      id: "preview-health",
      label: "Preview health",
      value: "100%",
      detail: "Mock runtime available"
    }
  ],
  workQueue: createLargeWorkQueue(),
  previewGuarantees,
  backendExpectations: currentBackendExpectations
} satisfies DashboardSuccessResponse);

export const dashboardErrorFixture = parseDashboardErrorResponse({
  kind: "error",
  generatedAt,
  error: {
    code: "MOCK_RUNTIME_UNAVAILABLE",
    message: "The dashboard mock runtime could not provide a deterministic payload.",
    retryable: false
  }
});

export const dashboardFixtures = {
  happyPath: dashboardHappyPathFixture,
  emptyState: dashboardEmptyStateFixture,
  largeData: dashboardLargeDataFixture,
  error: dashboardErrorFixture
} as const;
