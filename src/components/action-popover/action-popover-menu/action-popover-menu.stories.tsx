import { Meta, StoryObj } from "@storybook/react";
import ActionPopoverMenu from "./action-popover-menu.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof ActionPopoverMenu> = {
  title: "ActionPopoverMenu",
  component: ActionPopoverMenu,
  tags: ["isHidden"],
};

export default meta;
type Story = StoryObj<typeof ActionPopoverMenu>;

export const Default: Story = {
  args: {
    children: [],
  },
};
