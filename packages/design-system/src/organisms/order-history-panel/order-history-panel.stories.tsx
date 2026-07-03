import type { Meta, StoryObj } from "@storybook/react-vite";
import { OrderHistoryPanel } from "./order-history-panel";
import { orderHistoryPanelExamples } from "./order-history-panel.examples";

const meta = {
  args: orderHistoryPanelExamples.default,
  component: OrderHistoryPanel,
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-canvas p-6">
        <Story />
      </div>
    )
  ],
  parameters: {
    layout: "fullscreen"
  },
  title: "Organisms/OrderHistoryPanel"
} satisfies Meta<typeof OrderHistoryPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Compact: Story = {
  args: orderHistoryPanelExamples.compact
};

export const Empty: Story = {
  args: orderHistoryPanelExamples.empty
};
