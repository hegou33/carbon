import { Meta, StoryObj } from "@storybook/react";
import FlatTableRow from "./flat-table-row.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof FlatTableRow> = {
  title: "Flat Table Row",
  component: FlatTableRow,
  tags: ["isHidden"],
};

export default meta;
type Story = StoryObj<typeof FlatTableRow>;

export const Default: Story = {
  args: {
    children: [],
  },
};
