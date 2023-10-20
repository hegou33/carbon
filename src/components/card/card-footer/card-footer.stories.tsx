import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import CardFooter, { CardFooterProps } from "..";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
}) as Partial<ArgTypes<CardFooterProps>>;

const meta: Meta<typeof CardFooter> = {
  title: "CardFooter",
  component: CardFooter,
  tags: ["isHidden"],
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof CardFooter>;

export const Default: Story = {
  args: {
    children: [],
  },
};
