import { Meta, StoryObj } from "@storybook/react";
import { renderClose } from "../popover-container.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof renderClose> = {
  title: "Render Close",
  component: renderClose,
  tags: ["isHidden"],
};

export default meta;
type Story = StoryObj<typeof renderClose>;

export const Default: Story = {
  args: {},
};
