import { Meta, StoryObj } from "@storybook/react";

import MenuFullscreen from "./menu-full-screen.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof MenuFullscreen> = {
  title: "Menu Full Screen",
  component: MenuFullscreen,
  tags: ["isHidden"],
};

export default meta;
type Story = StoryObj<typeof MenuFullscreen>;

export const Default: Story = {
  args: {
    children: [],
  },
};
