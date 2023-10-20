import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import Dd, { DdProps } from "./dd.component";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps(
  {
    spacing: true,
  },
  { mb: 2 }
) as Partial<ArgTypes<DdProps>>;

const meta: Meta<typeof Dd> = {
  title: "Dd",
  component: Dd,
  tags: ["isHidden"],
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Dd>;

export const Default: Story = {
  args: {
    children: [],
  },
};
