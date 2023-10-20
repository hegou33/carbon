import { Meta, StoryObj } from "@storybook/react";
import Slide from "./slide.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof Slide> = {
  title: "Slide",
  component: Slide,
  tags: ["isHidden"],
};

export default meta;
type Story = StoryObj<typeof Slide>;

export const Default: Story = {
  args: {},
};
