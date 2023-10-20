import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import VerticalMenuTrigger, {
  VerticalMenuTriggerProps,
} from "./vertical-menu-trigger.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps({
  padding: true,
}) as Partial<ArgTypes<VerticalMenuTriggerProps>>;

const meta: Meta<typeof VerticalMenuTrigger> = {
  title: "Vertical Menu Trigger",
  component: VerticalMenuTrigger,
  tags: ["isHidden"],
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof VerticalMenuTrigger>;

export const Default: Story = {
  args: {},
};
