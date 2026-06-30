import { z } from "zod";

const NonEmptyStringSchema = z.string().min(1);

export const OrderStatusSchema = z.enum([
  "submitted",
  "processing",
  "completed",
  "cancelled",
  "failed"
]);

export const CurrencyCodeSchema = z.string().regex(/^[A-Z]{3}$/);

export const OrderTotalSchema = z
  .object({
    amountMinor: z.number().int().nonnegative(),
    currency: CurrencyCodeSchema
  })
  .strict();

export const DashboardOrderSchema = z
  .object({
    id: NonEmptyStringSchema,
    title: NonEmptyStringSchema,
    description: NonEmptyStringSchema,
    status: OrderStatusSchema,
    totalAmount: OrderTotalSchema,
    submittedAt: z.string().datetime(),
    updatedAt: z.string().datetime()
  })
  .strict();

export const DashboardOrderSummarySchema = z
  .object({
    totalOrders: z.number().int().nonnegative(),
    processingOrders: z.number().int().nonnegative(),
    exceptionOrders: z.number().int().nonnegative()
  })
  .strict();

export const DashboardOrderFiltersSchema = z
  .object({
    statusOptions: z.array(OrderStatusSchema)
  })
  .strict();

export const DashboardOrderHistoryQuerySchema = z
  .object({
    status: OrderStatusSchema.optional(),
    search: z.string().optional()
  })
  .strict();

export const DashboardPreviewModeSchema = z
  .object({
    label: NonEmptyStringSchema,
    description: NonEmptyStringSchema
  })
  .strict();

export const DashboardPreviewGuaranteeSchema = z
  .object({
    id: NonEmptyStringSchema,
    label: NonEmptyStringSchema
  })
  .strict();

export const DashboardBackendExpectationSchema = z
  .object({
    id: NonEmptyStringSchema,
    fieldPath: NonEmptyStringSchema,
    reason: NonEmptyStringSchema,
    backendTaskRequired: z.boolean()
  })
  .strict();

export const DashboardSuccessResponseSchema = z
  .object({
    kind: z.literal("success"),
    generatedAt: z.string().datetime(),
    preview: DashboardPreviewModeSchema,
    orderSummary: DashboardOrderSummarySchema,
    orderFilters: DashboardOrderFiltersSchema,
    orders: z.array(DashboardOrderSchema),
    previewGuarantees: z.array(DashboardPreviewGuaranteeSchema),
    backendExpectations: z.array(DashboardBackendExpectationSchema)
  })
  .strict();

export const DashboardErrorResponseSchema = z
  .object({
    kind: z.literal("error"),
    generatedAt: z.string().datetime(),
    error: z
      .object({
        code: z.enum(["MOCK_RUNTIME_UNAVAILABLE", "CONTRACT_VALIDATION_FAILED"]),
        message: NonEmptyStringSchema,
        retryable: z.boolean()
      })
      .strict()
  })
  .strict();

export const DashboardResponseSchema = z.discriminatedUnion("kind", [
  DashboardSuccessResponseSchema,
  DashboardErrorResponseSchema
]);

export type OrderStatus = z.infer<typeof OrderStatusSchema>;
export type CurrencyCode = z.infer<typeof CurrencyCodeSchema>;
export type OrderTotal = z.infer<typeof OrderTotalSchema>;
export type DashboardOrder = z.infer<typeof DashboardOrderSchema>;
export type DashboardOrderSummary = z.infer<typeof DashboardOrderSummarySchema>;
export type DashboardOrderFilters = z.infer<typeof DashboardOrderFiltersSchema>;
export type DashboardOrderHistoryQuery = z.infer<
  typeof DashboardOrderHistoryQuerySchema
>;
export type DashboardPreviewMode = z.infer<typeof DashboardPreviewModeSchema>;
export type DashboardPreviewGuarantee = z.infer<typeof DashboardPreviewGuaranteeSchema>;
export type DashboardBackendExpectation = z.infer<
  typeof DashboardBackendExpectationSchema
>;
export type DashboardSuccessResponse = z.infer<typeof DashboardSuccessResponseSchema>;
export type DashboardErrorResponse = z.infer<typeof DashboardErrorResponseSchema>;
export type DashboardResponse = z.infer<typeof DashboardResponseSchema>;

export function parseDashboardSuccessResponse(
  payload: unknown
): DashboardSuccessResponse {
  return DashboardSuccessResponseSchema.parse(payload);
}

export function parseDashboardErrorResponse(payload: unknown): DashboardErrorResponse {
  return DashboardErrorResponseSchema.parse(payload);
}

export function parseDashboardResponse(payload: unknown): DashboardResponse {
  return DashboardResponseSchema.parse(payload);
}
