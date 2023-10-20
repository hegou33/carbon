import React from "react";
import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Content, { ContentProps } from ".";
import Typography from "../typography";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
}) as Partial<ArgTypes<ContentProps>>;

const meta: Meta<typeof Content> = {
  title: "Content",
  component: Content,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Content>;

export const DefaultStory: Story = (args: ContentProps) => (
  <Content title="Title" {...args}>
    This is an example of some content
  </Content>
);
DefaultStory.storyName = "Default";

export const InlineContent = {
  ...DefaultStory,
  args: {
    inline: true,
    children: "This is an example of some content",
  },
};
InlineContent.storyName = "Inline Content";

export const CustomTitle = {
  ...DefaultStory,
  args: {
    title: <Typography color="primary">Title</Typography>,
    variant: "primary",
    children: "This is an example of some content",
  },
};
CustomTitle.storyName = "Custom Title";

export const SecondaryStyling = {
  ...DefaultStory,
  args: {
    variant: "secondary",
    children: "This is an example of some content",
  },
};
SecondaryStyling.storyName = "Secondary Styling";
