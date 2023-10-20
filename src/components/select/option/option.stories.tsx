import { Meta, StoryObj } from "@storybook/react";
import Option from "./option.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof Option> = {
  title: "Select/Option",
  component: Option,
  tags: ["isHidden"],
};

export default meta;
type Story = StoryObj<typeof Option>;

export const Default: Story = {
  args: {
    children: [],
  },
};
