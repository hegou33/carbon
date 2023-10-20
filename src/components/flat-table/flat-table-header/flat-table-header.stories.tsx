import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import FlatTableHeader, {
  FlatTableHeaderProps,
} from "./flat-table-header.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps(
  {
    spacing: true,
  },
  { py: 1, px: 3 }
) as Partial<ArgTypes<FlatTableHeaderProps>>;

const meta: Meta<typeof FlatTableHeader> = {
  title: "Flat Table Header",
  component: FlatTableHeader,
  tags: ["isHidden"],
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof FlatTableHeader>;

export const Default: Story = {
  args: {
    children: [],
  },
};
