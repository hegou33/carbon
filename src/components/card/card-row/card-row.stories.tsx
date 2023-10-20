import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import CardRow, { CardRowProps } from "..";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps({
  padding: true,
}) as Partial<ArgTypes<CardRowProps>>;

const meta: Meta<typeof CardRow> = {
  title: "CardRow",
  component: CardRow,
  tags: ["isHidden"],
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof CardRow>;

export const Default: Story = {
  args: {
    children: [],
  },
};
