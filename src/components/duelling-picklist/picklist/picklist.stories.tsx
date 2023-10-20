import { Meta, StoryObj } from "@storybook/react";

import Picklist from "./picklist.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof Picklist> = {
  title: "Picklist",
  component: Picklist,
  tags: ["isHidden"],
};

export default meta;
type Story = StoryObj<typeof Picklist>;

export const Default: Story = {
  args: {
    children: [],
  },
};
