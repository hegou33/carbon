import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import RadioButtonGroup, {
  RadioButtonGroupProps,
} from "./radio-button-group.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps({
  margin: true,
}) as Partial<ArgTypes<RadioButtonGroupProps>>;

const meta: Meta<typeof RadioButtonGroup> = {
  title: "Radio Button Group",
  component: RadioButtonGroup,
  tags: ["isHidden"],
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof RadioButtonGroup>;

export const Default: Story = {
  args: {
    children: [],
  },
};
