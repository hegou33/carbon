import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import TileSelectGroup, {
  TileSelectGroupProps,
} from "./tile-select-group.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps({
  margin: true,
}) as Partial<ArgTypes<TileSelectGroupProps>>;

const meta: Meta<typeof TileSelectGroup> = {
  title: "Tile Select Group",
  component: TileSelectGroup,
  tags: ["isHidden"],
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof TileSelectGroup>;

export const Default: Story = {
  args: {
    children: [],
  },
};
