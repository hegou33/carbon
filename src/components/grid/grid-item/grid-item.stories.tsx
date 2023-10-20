import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import GridItem, { GridItemProps } from "./grid-item.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps({
  padding: true,
}) as Partial<ArgTypes<GridItemProps>>;

const meta: Meta<typeof GridItem> = {
  title: "Grid Item",
  component: GridItem,
  tags: ["isHidden"],
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof GridItem>;

export const Default: Story = {
  args: {
    children: [],
  },
};
