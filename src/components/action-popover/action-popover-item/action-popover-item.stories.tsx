import { Meta, StoryObj } from "@storybook/react";
import { ActionPopoverItem } from "./action-popover-item.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof ActionPopoverItem> = {
  title: "ActionPopoverItem",
  component: ActionPopoverItem,
  tags: ["isHidden"],
};

export default meta;
type Story = StoryObj<typeof ActionPopoverItem>;

export const Default: Story = {
  args: {},
};
