import React from "react";
import { ArgTypes, Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Box from "../box";
import Typography from "../typography";
import VerticalDivider from "../vertical-divider";
import Image from "../image";
import point from "../../../.assets/point.svg";

import DismissibleBox, { DismissibleBoxProps } from ".";

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
}) as Partial<ArgTypes<DismissibleBoxProps>>;

const meta: Meta<typeof DismissibleBox> = {
  title: "Dismissible Box",
  component: DismissibleBox,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof DismissibleBox>;

const children = `Well, that's certainly good to know. Your head is not an artifact!
Maybe if we felt any human loss as keenly as we feel one of those
close to us, human history would be far less bloody. Wouldn't that
bring about chaos? Shields up! Rrrrred alert! Travel time to the
nearest starbase? I'm afraid I still don't understand, sir. You
enjoyed that. The Enterprise computer system is controlled by three
primary main processor cores, cross-linked with a redundant
melacortz ramistat, fourteen kiloquad interface modules. Well,
that's certainly good to know. Your head is not an artifact! Rrrrred
alert! Rrrrred alert! Rrrrred alert!`;

export const DefaultLightVariant: Story = () => {
  return (
    <Box p={2}>
      <DismissibleBox onClose={() => {}}>
        <Box display="flex">
          <Typography mb={0}>{children}</Typography>
          <VerticalDivider p={0} px={2} />
          <Image alt="Example alt text" src={point} width="120px" />
        </Box>
      </DismissibleBox>
    </Box>
  );
};
DefaultLightVariant.storyName = "Default";

export const DefaultDarkVariant: Story = () => {
  return (
    <Box p={2}>
      <DismissibleBox variant="dark" onClose={() => {}}>
        <Box display="flex">
          <Typography mb={0}>{children}</Typography>
          <VerticalDivider p={0} px={2} />
          <Image alt="Example alt text" src={point} width="120px" />
        </Box>
      </DismissibleBox>
    </Box>
  );
};
DefaultDarkVariant.storyName = "Default (Dark)";

export const WithNoLeftBorderHighlight: Story = () => {
  return (
    <Box p={2}>
      <DismissibleBox mb={2} hasBorderLeftHighlight={false} onClose={() => {}}>
        <Box display="flex">
          <Typography mb={0}>{children}</Typography>
          <VerticalDivider p={0} px={2} />
          <Image alt="Example alt text" src={point} width="120px" />
        </Box>
      </DismissibleBox>
    </Box>
  );
};
WithNoLeftBorderHighlight.storyName = "With No Left Border Highlight";

export const WidthOverridden: Story = () => {
  return (
    <Box p={2}>
      <DismissibleBox width="650px" onClose={() => {}}>
        <Box display="flex">
          <Typography mb={0}>{children}</Typography>
          <VerticalDivider p={0} px={2} />
          <Image alt="Example alt text" src={point} width="120px" />
        </Box>
      </DismissibleBox>
    </Box>
  );
};
WidthOverridden.storyName = "Width Overridden";
