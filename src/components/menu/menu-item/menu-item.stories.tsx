import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import MenuItem, {
  MenuWithChildren,
  MenuWithIcon,
} from "./menu-item.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps({
  flexBox: true,
  layout: true,
  padding: true,
}) as Partial<ArgTypes<MenuWithChildren | MenuWithIcon>>;

const meta: Meta<typeof MenuItem> = {
  title: "Menu Item",
  component: MenuItem,
  tags: ["isHidden"],
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

export const Default: Story = {
  args: {
    children: [],
  },
};
