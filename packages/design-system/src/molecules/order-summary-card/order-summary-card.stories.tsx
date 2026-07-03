import type { Meta, StoryObj } from "@storybook/react-vite";
import { OrderSummaryCard } from "./order-summary-card";
import { orderSummaryCardExamples } from "./order-summary-card.examples";

const meta = {
  args: orderSummaryCardExamples.totalOrders,
  component: OrderSummaryCard,
  title: "Molecules/OrderSummaryCard"
} satisfies Meta<typeof OrderSummaryCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TotalOrders: Story = {};

export const Exceptions: Story = {
  args: orderSummaryCardExamples.exceptions
};

export const WithoutDetail: Story = {
  args: orderSummaryCardExamples.noDetail
};
