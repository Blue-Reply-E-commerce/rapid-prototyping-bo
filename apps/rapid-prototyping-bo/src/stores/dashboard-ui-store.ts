"use client";

import { create } from "zustand";

export const dashboardDensityOptions = ["comfortable", "compact"] as const;

export type DashboardDensity = (typeof dashboardDensityOptions)[number];

type DashboardUiStateValues = {
  displayDensity: DashboardDensity;
};

type DashboardUiActions = {
  resetDashboardUiState: () => void;
  setDisplayDensity: (displayDensity: DashboardDensity) => void;
};

export type DashboardUiState = DashboardUiStateValues & DashboardUiActions;

export const dashboardUiInitialState: DashboardUiStateValues = {
  displayDensity: "comfortable"
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
  setDisplayDensity: (displayDensity) => set({ displayDensity })
}));

export function initializeDashboardUiStore(
  overrides: Partial<DashboardUiStateValues> = {}
) {
  useDashboardUiStore.setState(createDashboardUiState(overrides));
}

export function resetDashboardUiStore() {
  initializeDashboardUiStore();
}
