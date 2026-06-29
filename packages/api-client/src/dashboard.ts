import { z } from "zod";

const NonEmptyStringSchema = z.string().min(1);

export const DashboardQueueStatusSchema = z.enum([
  "prototype",
  "review",
  "ready",
  "blocked"
]);

export const DashboardDeliveryImpactSchema = z.enum([
  "ui-only",
  "contract-change",
  "jira-draft",
  "backend-follow-up"
]);

export const DashboardSummaryCardSchema = z
  .object({
    id: NonEmptyStringSchema,
    label: NonEmptyStringSchema,
    value: NonEmptyStringSchema,
    detail: NonEmptyStringSchema
  })
  .strict();

export const DashboardWorkQueueItemSchema = z
  .object({
    id: NonEmptyStringSchema,
    item: NonEmptyStringSchema,
    owner: NonEmptyStringSchema,
    status: DashboardQueueStatusSchema,
    statusLabel: NonEmptyStringSchema,
    impact: DashboardDeliveryImpactSchema,
    impactLabel: NonEmptyStringSchema
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
    summaryCards: z.array(DashboardSummaryCardSchema),
    workQueue: z.array(DashboardWorkQueueItemSchema),
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

export type DashboardQueueStatus = z.infer<typeof DashboardQueueStatusSchema>;
export type DashboardDeliveryImpact = z.infer<typeof DashboardDeliveryImpactSchema>;
export type DashboardSummaryCard = z.infer<typeof DashboardSummaryCardSchema>;
export type DashboardWorkQueueItem = z.infer<typeof DashboardWorkQueueItemSchema>;
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
