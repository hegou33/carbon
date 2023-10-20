import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import VerticalMenuItem, {
  VerticalMenuItemProps,
} from "./vertical-menu-item.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps({
  padding: true,
}) as Partial<ArgTypes<VerticalMenuItemProps>>;

const meta: Meta<typeof VerticalMenuItem> = {
  title: "Vertical Menu Item",
  component: VerticalMenuItem,
  tags: ["isHidden"],
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof VerticalMenuItem>;

export const Default: Story = {
  args: {
    children: [],
  },
};
