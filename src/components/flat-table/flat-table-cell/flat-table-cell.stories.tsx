import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import FlatTableCell, { FlatTableCellProps } from "./flat-table-cell.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
}) as Partial<ArgTypes<FlatTableCellProps>>;

const meta: Meta<typeof FlatTableCell> = {
  title: "Flat Table Cell",
  component: FlatTableCell,
  tags: ["isHidden"],
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof FlatTableCell>;

export const Default: Story = {
  args: {
    children: [],
  },
};
