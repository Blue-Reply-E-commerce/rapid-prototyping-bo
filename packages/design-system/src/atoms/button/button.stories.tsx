import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import { buttonExamples } from "./button.examples";

const meta = {
  args: buttonExamples.primary,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"]
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"]
    }
  },
  component: Button,
  title: "Atoms/Button"
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: buttonExamples.secondary
};

export const Ghost: Story = {
  args: buttonExamples.ghost
};

export const Disabled: Story = {
  args: buttonExamples.disabled
};
