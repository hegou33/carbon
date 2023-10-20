import { Meta, StoryObj } from "@storybook/react";
import VerticalMenuFullScreen from "./vertical-menu-full-screen.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof VerticalMenuFullScreen> = {
  title: "Vertical Menu Full Screen",
  component: VerticalMenuFullScreen,
  tags: ["isHidden"],
};

export default meta;
type Story = StoryObj<typeof VerticalMenuFullScreen>;

export const Default: Story = {
  args: {
    children: [],
  },
};
