import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import Dt, { DtProps } from "./dt.component";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps(
  {
    spacing: true,
  },
  { mb: 2, pr: 3 }
) as Partial<ArgTypes<DtProps>>;

const meta: Meta<typeof Dt> = {
  title: "Dt",
  component: Dt,
  tags: ["isHidden"],
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Dt>;

export const Default: Story = {
  args: {
    children: [],
  },
};
