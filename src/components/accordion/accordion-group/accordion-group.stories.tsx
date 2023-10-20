import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import AccordionGroup, {
  AccordionGroupProps,
} from "./accordion-group.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps({
  margin: true,
}) as Partial<ArgTypes<AccordionGroupProps>>;

const meta: Meta<typeof AccordionGroup> = {
  title: "AccordionGroup",
  component: AccordionGroup,
  tags: ["isHidden"],
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof AccordionGroup>;

export const Default: Story = {
  args: {
    children: [],
  },
};
