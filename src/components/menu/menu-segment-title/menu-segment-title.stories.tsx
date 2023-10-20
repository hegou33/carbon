import { Meta, StoryObj } from "@storybook/react";
import MenuSegmentTitle from "./menu-segment-title.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof MenuSegmentTitle> = {
  title: "Menu Segment Title",
  component: MenuSegmentTitle,
  tags: ["isHidden"],
};

export default meta;
type Story = StoryObj<typeof MenuSegmentTitle>;

export const Default: Story = {
  args: {},
};
