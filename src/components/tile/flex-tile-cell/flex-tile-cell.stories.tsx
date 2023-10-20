import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import FlexTileCell, { FlexTileCellProps } from "./flex-tile-cell.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps(
  {
    padding: true,
    flexBox: true,
  },
  { flexGrow: 1, flexShrink: 0, flexBasis: "160px" }
) as Partial<ArgTypes<FlexTileCellProps>>;

const meta: Meta<typeof FlexTileCell> = {
  title: "Flex Tile Cell",
  component: FlexTileCell,
  tags: ["isHidden"],
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof FlexTileCell>;

export const Default: Story = {
  args: {
    children: [],
  },
};
