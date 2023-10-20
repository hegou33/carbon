import { Meta, StoryObj } from "@storybook/react";
import SimpleColor from "./simple-color.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof SimpleColor> = {
  title: "Simple Color",
  component: SimpleColor,
  tags: ["isHidden"],
};

export default meta;
type Story = StoryObj<typeof SimpleColor>;

export const Default: Story = {
  args: {},
};
