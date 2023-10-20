import React from "react";
import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import LoaderBar, { LoaderBarProps } from ".";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
}) as Partial<ArgTypes<LoaderBarProps>>;

const meta: Meta<typeof LoaderBar> = {
  title: "Loader Bar",
  component: LoaderBar,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof LoaderBar>;

export const DefaultStory: Story = () => {
  return <LoaderBar mt={2} />;
};
DefaultStory.storyName = "Default";

export const SmallStoryLoaderbar: Story = () => {
  return <LoaderBar size="small" mt={2} />;
};
SmallStoryLoaderbar.storyName = "Small";

export const LargeStoryLoaderbar: Story = () => {
  return <LoaderBar size="large" mt={2} />;
};
LargeStoryLoaderbar.storyName = "Large";
