import {
  parseDashboardErrorResponse,
  parseDashboardSuccessResponse,
  type DashboardOrder,
  type DashboardSuccessResponse,
  type OrderStatus
} from "../dashboard";

const generatedAt = "2026-01-15T09:00:00.000Z";

const preview = {
  label: "Mock-only preview",
  description: "No secrets, VPN, production credentials, live backend, or real customer data required."
} as const;

const statusOptions = [
  "submitted",
  "processing",
  "completed",
  "cancelled",
  "failed"
] as const satisfies ReadonlyArray<OrderStatus>;

const previewGuarantees: DashboardSuccessResponse["previewGuarantees"] = [
  {
    id: "deterministic-content",
    label: "Deterministic local order history content."
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
    id: "order-summary-shape",
    fieldPath: "orderSummary.{totalOrders,processingOrders,exceptionOrders}",
    reason: "The dashboard renders a small set of order history KPIs.",
    backendTaskRequired: false
  },
  {
    id: "order-history-shape",
    fieldPath:
      "orders[].{id,title,description,status,totalAmount,submittedAt,updatedAt}",
    reason:
      "The dashboard table needs read-only order history rows with a single monetary total.",
    backendTaskRequired: false
  },
  {
    id: "order-filter-shape",
    fieldPath: "orderFilters.statusOptions",
    reason: "The dashboard supports simple status filtering over order history.",
    backendTaskRequired: false
  }
];

const happyPathOrders = [
  {
    id: "ORD-10042",
    title: "Workspace equipment renewal",
    description: "Replacement order for shared workspace devices.",
    status: "processing",
    totalAmount: {
      amountMinor: 124050,
      currency: "EUR"
    },
    submittedAt: "2026-01-10T08:15:00.000Z",
    updatedAt: "2026-01-15T09:40:00.000Z"
  },
  {
    id: "ORD-10043",
    title: "Content review package",
    description: "Editorial preparation order for a regional launch.",
    status: "completed",
    totalAmount: {
      amountMinor: 84500,
      currency: "EUR"
    },
    submittedAt: "2026-01-09T10:30:00.000Z",
    updatedAt: "2026-01-13T16:20:00.000Z"
  },
  {
    id: "ORD-10044",
    title: "Regional launch checklist",
    description: "Operational readiness order for launch activities.",
    status: "submitted",
    totalAmount: {
      amountMinor: 230000,
      currency: "EUR"
    },
    submittedAt: "2026-01-14T14:05:00.000Z",
    updatedAt: "2026-01-14T14:05:00.000Z"
  },
  {
    id: "ORD-10045",
    title: "Access recovery request",
    description: "Support order blocked by a downstream validation error.",
    status: "failed",
    totalAmount: {
      amountMinor: 12000,
      currency: "EUR"
    },
    submittedAt: "2026-01-08T09:45:00.000Z",
    updatedAt: "2026-01-12T11:10:00.000Z"
  },
  {
    id: "ORD-10046",
    title: "Training material refresh",
    description: "Cancelled order for updating internal training assets.",
    status: "cancelled",
    totalAmount: {
      amountMinor: 64000,
      currency: "EUR"
    },
    submittedAt: "2026-01-07T12:00:00.000Z",
    updatedAt: "2026-01-11T15:25:00.000Z"
  },
  {
    id: "ORD-10047",
    title: "Integration readiness audit",
    description: "Review order for operational integration readiness.",
    status: "completed",
    totalAmount: {
      amountMinor: 310500,
      currency: "EUR"
    },
    submittedAt: "2026-01-06T07:50:00.000Z",
    updatedAt: "2026-01-10T13:35:00.000Z"
  }
] as const satisfies ReadonlyArray<DashboardOrder>;

function createOrderSummary(
  orders: ReadonlyArray<DashboardOrder>
): DashboardSuccessResponse["orderSummary"] {
  return {
    totalOrders: orders.length,
    processingOrders: orders.filter((order) => order.status === "processing").length,
    exceptionOrders: orders.filter((order) =>
      order.status === "cancelled" || order.status === "failed"
    ).length
  };
}

function createDashboardSuccessResponse(
  orders: ReadonlyArray<DashboardOrder>
): DashboardSuccessResponse {
  return parseDashboardSuccessResponse({
    kind: "success",
    generatedAt,
    preview,
    orderSummary: createOrderSummary(orders),
    orderFilters: {
      statusOptions: [...statusOptions]
    },
    orders: [...orders],
    previewGuarantees,
    backendExpectations: currentBackendExpectations
  } satisfies DashboardSuccessResponse);
}

export const dashboardHappyPathFixture =
  createDashboardSuccessResponse(happyPathOrders);

export const dashboardEmptyStateFixture = createDashboardSuccessResponse([]);

const generatedOrderTitles = [
  "Operational readiness review",
  "Workspace access package",
  "Policy acknowledgement batch",
  "Regional enablement order",
  "Service validation request",
  "Internal asset renewal"
] as const;

function createLargeOrderHistory(): DashboardSuccessResponse["orders"] {
  return Array.from({ length: 32 }, (_, index) => {
    const ordinal = index + 1;
    const status = statusOptions[index % statusOptions.length] ?? "submitted";
    const title =
      generatedOrderTitles[index % generatedOrderTitles.length] ??
      generatedOrderTitles[0];
    const submittedDay = String((index % 20) + 1).padStart(2, "0");
    const updatedDay = String((index % 20) + 2).padStart(2, "0");

    return {
      id: `ORD-${String(20000 + ordinal)}`,
      title: `${title} ${ordinal}`,
      description: `Generated read-only order history row ${ordinal}.`,
      status,
      totalAmount: {
        amountMinor: 50000 + ordinal * 7250,
        currency: "EUR"
      },
      submittedAt: `2026-01-${submittedDay}T09:00:00.000Z`,
      updatedAt: `2026-01-${updatedDay}T10:30:00.000Z`
    };
  });
}

export const dashboardLargeDataFixture = createDashboardSuccessResponse(
  createLargeOrderHistory()
);

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
