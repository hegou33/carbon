import { Meta, StoryObj } from "@storybook/react";

import FlatTableHead from "./flat-table-head.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof FlatTableHead> = {
  title: "Flat Table Head",
  component: FlatTableHead,
  tags: ["isHidden"],
};

export default meta;
type Story = StoryObj<typeof FlatTableHead>;

export const Default: Story = {
  args: {
    children: [],
  },
};
