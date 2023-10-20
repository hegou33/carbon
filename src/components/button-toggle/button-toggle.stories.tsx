import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { ButtonToggle, ButtonToggleGroup } from ".";
import Box from "../box";

const meta: Meta<typeof ButtonToggle> = {
  title: "Button Toggle",
  component: ButtonToggle,
};

export default meta;
type Story = StoryObj<typeof ButtonToggle>;

export const Default: Story = () => {
  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup id="button-toggle-group-id" label="Default example">
        <ButtonToggle value="foo">Foo</ButtonToggle>
        <ButtonToggle value="bar">Bar</ButtonToggle>
        <ButtonToggle value="baz">Baz</ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
Default.storyName = "Default";

export const DefaultWrappedText: Story = () => {
  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Wrapped text example"
      >
        <ButtonToggle value="wraps" grouped>
          Some text that wraps
        </ButtonToggle>
        <ButtonToggle value="foobar" grouped>
          FooBar
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
DefaultWrappedText.storyName = "Default Wrapped Text";

export const DefaultSmallIcon: Story = () => {
  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup id="button-toggle-group-id" label="Small icon example">
        <ButtonToggle value="foo" buttonIcon="add">
          Add
        </ButtonToggle>
        <ButtonToggle value="bar" buttonIcon="share">
          Share
        </ButtonToggle>
        <ButtonToggle value="baz" buttonIcon="tick">
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
DefaultSmallIcon.storyName = "Default Small Icon";

export const DefaultLargeIcon: Story = () => {
  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup id="button-toggle-group-id" label="Large icon example">
        <ButtonToggle value="foo" buttonIcon="add" buttonIconSize="large">
          Add
        </ButtonToggle>
        <ButtonToggle value="bar" buttonIcon="share" buttonIconSize="large">
          Share
        </ButtonToggle>
        <ButtonToggle value="baz" buttonIcon="tick" buttonIconSize="large">
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
DefaultLargeIcon.storyName = "Default Large Icon";

export const IconOnly: Story = () => {
  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup id="button-toggle-group-id" label="Icon only example">
        <ButtonToggle value="foo" buttonIcon="add" aria-label="add" />
        <ButtonToggle value="bar" buttonIcon="share" aria-label="share" />
        <ButtonToggle value="baz" buttonIcon="tick" aria-label="tick" />
      </ButtonToggleGroup>
    </Box>
  );
};
IconOnly.storyName = "Icon Only";

export const Small: Story = () => {
  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup id="button-toggle-group-id" label="Small example">
        <ButtonToggle size="small" value="foo">
          Add
        </ButtonToggle>
        <ButtonToggle size="small" value="bar">
          Share
        </ButtonToggle>
        <ButtonToggle size="small" value="baz">
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
Small.storyName = "Small";

export const SmallSmallIcon: Story = () => {
  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Small with small icon example"
      >
        <ButtonToggle size="small" value="foo" buttonIcon="add">
          Add
        </ButtonToggle>
        <ButtonToggle size="small" value="bar" buttonIcon="share">
          Share
        </ButtonToggle>
        <ButtonToggle size="small" value="baz" buttonIcon="tick">
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
SmallSmallIcon.storyName = "Small Small Icon";

export const SmallLargeIcon: Story = () => {
  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Small with large icon example"
      >
        <ButtonToggle
          size="small"
          value="foo"
          buttonIcon="add"
          buttonIconSize="large"
        >
          Add
        </ButtonToggle>
        <ButtonToggle
          size="small"
          value="bar"
          buttonIcon="share"
          buttonIconSize="large"
        >
          Share
        </ButtonToggle>
        <ButtonToggle
          size="small"
          value="baz"
          buttonIcon="tick"
          buttonIconSize="large"
        >
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
SmallLargeIcon.storyName = "Small Large Icon";

export const Large: Story = () => {
  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup id="button-toggle-group-id" label="Large example">
        <ButtonToggle size="large" value="foo">
          Add
        </ButtonToggle>
        <ButtonToggle size="large" value="bar">
          Share
        </ButtonToggle>
        <ButtonToggle size="large" value="baz">
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
Large.storyName = "Large";

export const LargeSmallIcon: Story = () => {
  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Large with small icon example"
      >
        <ButtonToggle size="large" value="foo" buttonIcon="add">
          Add
        </ButtonToggle>
        <ButtonToggle size="large" value="bar" buttonIcon="share">
          Share
        </ButtonToggle>
        <ButtonToggle size="large" value="baz" buttonIcon="tick">
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
LargeSmallIcon.storyName = "Large Small Icon";

export const LargeLargeIcon: Story = () => {
  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Large with large icon example"
      >
        <ButtonToggle
          size="large"
          value="foo"
          buttonIcon="add"
          buttonIconSize="large"
        >
          Add
        </ButtonToggle>
        <ButtonToggle
          size="large"
          value="bar"
          buttonIcon="share"
          buttonIconSize="large"
        >
          Share
        </ButtonToggle>
        <ButtonToggle
          size="large"
          value="baz"
          buttonIcon="tick"
          buttonIconSize="large"
        >
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
LargeLargeIcon.storyName = "Large Large Icon";

export const Disabled: Story = () => {
  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup id="button-toggle-group-id" label="Disabled example">
        <ButtonToggle value="foo" disabled>
          Foo
        </ButtonToggle>
        <ButtonToggle value="bar" disabled>
          Bar
        </ButtonToggle>
        <ButtonToggle value="baz" disabled>
          Baz
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
Disabled.storyName = "Disabled";

export const Grouped: Story = () => {
  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup id="button-toggle-group-id" label="Grouped example">
        <ButtonToggle value="foo" grouped>
          Foo
        </ButtonToggle>
        <ButtonToggle value="bar" grouped>
          Bar
        </ButtonToggle>
        <ButtonToggle value="baz" grouped>
          Baz
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
Grouped.storyName = "Grouped";
