import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import { CheckboxGroup, CheckboxGroupProps } from "..";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps({
  margin: true,
}) as Partial<ArgTypes<CheckboxGroupProps>>;

const meta: Meta<typeof CheckboxGroup> = {
  title: "CheckboxGroup",
  component: CheckboxGroup,
  tags: ["isHidden"],
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {
  args: {
    children: [],
  },
};
