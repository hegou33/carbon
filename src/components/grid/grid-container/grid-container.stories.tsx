import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import GridContainer, { GridContainerProps } from "./grid-container.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
}) as Partial<ArgTypes<GridContainerProps>>;

const meta: Meta<typeof GridContainer> = {
  title: "Grid Container",
  component: GridContainer,
  tags: ["isHidden"],
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof GridContainer>;

export const Default: Story = {
  args: {
    children: [],
  },
};
