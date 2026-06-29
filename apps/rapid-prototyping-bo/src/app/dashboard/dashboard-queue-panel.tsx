"use client";

import type { DashboardSuccessResponse } from "@rapid-prototyping-bo/api-client";
import {
  Button,
  Card,
  CardHeader,
  CardTitle
} from "@rapid-prototyping-bo/design-system";
import {
  dashboardDensityOptions,
  useDashboardUiStore,
  type DashboardDensity
} from "@/stores/dashboard-ui-store";

type DashboardWorkQueue = DashboardSuccessResponse["workQueue"];

type DensityPresentation = {
  label: string;
  bodyCellClassName: string;
  emptyCellClassName: string;
};

const densityPresentation: Record<DashboardDensity, DensityPresentation> = {
  comfortable: {
    label: "Comfortable",
    bodyCellClassName: "px-4 py-3",
    emptyCellClassName: "px-4 py-6"
  },
  compact: {
    label: "Compact",
    bodyCellClassName: "px-4 py-2",
    emptyCellClassName: "px-4 py-4"
  }
};

type DashboardQueuePanelProps = {
  workQueue: DashboardWorkQueue;
};

export function DashboardQueuePanel({ workQueue }: DashboardQueuePanelProps) {
  const displayDensity = useDashboardUiStore((state) => state.displayDensity);
  const setDisplayDensity = useDashboardUiStore((state) => state.setDisplayDensity);
  const presentation = densityPresentation[displayDensity];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>Active prototype queue</CardTitle>
        <div
          aria-label="Queue density"
          className="inline-flex w-fit rounded-md border border-line bg-white p-1"
        >
          {dashboardDensityOptions.map((density) => (
            <Button
              aria-pressed={displayDensity === density}
              className="min-w-24"
              key={density}
              onClick={() => setDisplayDensity(density)}
              size="sm"
              variant={displayDensity === density ? "primary" : "ghost"}
            >
              {densityPresentation[density].label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead className="bg-canvas text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Item</th>
              <th className="px-4 py-3 font-semibold">Owner</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Delivery impact</th>
            </tr>
          </thead>
          <tbody>
            {workQueue.length === 0 ? (
              <tr className="border-t border-line">
                <td
                  className={`${presentation.emptyCellClassName} text-center text-muted`}
                  colSpan={4}
                >
                  No prototype work is queued.
                </td>
              </tr>
            ) : (
              workQueue.map((row) => (
                <tr key={row.id} className="border-t border-line">
                  <td className={`${presentation.bodyCellClassName} font-medium`}>
                    {row.item}
                  </td>
                  <td className={`${presentation.bodyCellClassName} text-muted`}>
                    {row.owner}
                  </td>
                  <td className={presentation.bodyCellClassName}>
                    <span className="rounded-full border border-line px-2 py-1 text-xs font-medium">
                      {row.statusLabel}
                    </span>
                  </td>
                  <td className={`${presentation.bodyCellClassName} text-muted`}>
                    {row.impactLabel}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
