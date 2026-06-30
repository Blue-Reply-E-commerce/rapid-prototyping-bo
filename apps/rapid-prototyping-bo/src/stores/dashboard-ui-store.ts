"use client";

import type { OrderStatus } from "@rapid-prototyping-bo/api-client";
import { create } from "zustand";

export const dashboardDensityOptions = ["comfortable", "compact"] as const;
export const dashboardStatusFilterOptions = [
  "all",
  "submitted",
  "processing",
  "completed",
  "cancelled",
  "failed"
] as const satisfies ReadonlyArray<"all" | OrderStatus>;

export type DashboardDensity = (typeof dashboardDensityOptions)[number];
export type DashboardStatusFilter = (typeof dashboardStatusFilterOptions)[number];

type DashboardUiStateValues = {
  displayDensity: DashboardDensity;
  searchQuery: string;
  statusFilter: DashboardStatusFilter;
};

type DashboardUiActions = {
  resetDashboardUiState: () => void;
  setDisplayDensity: (displayDensity: DashboardDensity) => void;
  setSearchQuery: (searchQuery: string) => void;
  setStatusFilter: (statusFilter: DashboardStatusFilter) => void;
};

export type DashboardUiState = DashboardUiStateValues & DashboardUiActions;

export const dashboardUiInitialState: DashboardUiStateValues = {
  displayDensity: "comfortable",
  searchQuery: "",
  statusFilter: "all"
};

export function createDashboardUiState(
  overrides: Partial<DashboardUiStateValues> = {}
): DashboardUiStateValues {
  return {
    ...dashboardUiInitialState,
    ...overrides
  };
}

export const useDashboardUiStore = create<DashboardUiState>()((set) => ({
  ...dashboardUiInitialState,
  resetDashboardUiState: () => set(createDashboardUiState()),
  setDisplayDensity: (displayDensity) => set({ displayDensity }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setStatusFilter: (statusFilter) => set({ statusFilter })
}));

export function initializeDashboardUiStore(
  overrides: Partial<DashboardUiStateValues> = {}
) {
  useDashboardUiStore.setState(createDashboardUiState(overrides));
}

export function resetDashboardUiStore() {
  initializeDashboardUiStore();
}
