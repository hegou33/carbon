import React, { useState } from "react";
import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import AdvancedColorPicker, { AdvancedColorPickerProps } from ".";
import isChromatic from "../../../.storybook/isChromatic";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
}) as Partial<ArgTypes<AdvancedColorPickerProps>>;

const meta: Meta<typeof AdvancedColorPicker> = {
  title: "Advanced Color Picker",
  component: AdvancedColorPicker,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof AdvancedColorPicker>;

const defaultOpenState = isChromatic();

export const Default: Story = () => {
  const [open, setOpen] = useState(defaultOpenState);
  const [color, setColor] = useState("orchid");
  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setColor(target.value);
  };
  return (
    <AdvancedColorPicker
      name="advancedPicker"
      availableColors={[
        { value: "#FFFFFF", label: "white" },
        { value: "transparent", label: "transparent" },
        { value: "#000000", label: "black" },
        { value: "#A3CAF0", label: "blue" },
        { value: "#FD9BA3", label: "pink" },
        { value: "#B4AEEA", label: "purple" },
        { value: "#ECE6AF", label: "goldenrod" },
        { value: "#EBAEDE", label: "orchid" },
        { value: "#EBC7AE", label: "desert" },
        { value: "#AEECEB", label: "turquoise" },
        { value: "#AEECD6", label: "mint" },
      ]}
      defaultColor="#EBAEDE"
      selectedColor={color}
      onChange={onChange}
      onOpen={() => {
        setOpen(!open);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onBlur={() => {}}
      open={open}
    />
  );
};
Default.storyName = "Default";
