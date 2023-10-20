import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import FlatTableRowHeader, {
  FlatTableRowHeaderProps,
} from "./flat-table-row-header.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps(
  {
    spacing: true,
  },
  { py: "10px", px: 3 }
) as Partial<ArgTypes<FlatTableRowHeaderProps>>;

const meta: Meta<typeof FlatTableRowHeader> = {
  title: "Flat Table Row Header",
  component: FlatTableRowHeader,
  tags: ["isHidden"],
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof FlatTableRowHeader>;

export const Default: Story = {
  args: {
    children: [],
  },
};
