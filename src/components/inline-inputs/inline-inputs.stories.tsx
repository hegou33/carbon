import React, { useState } from "react";
import { ArgTypes, Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import InlineInputs, { InlineInputsProps } from ".";
import Textbox from "../textbox";
import Decimal from "../decimal";
import { Select, Option } from "../select";

import Box from "../box";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
}) as Partial<ArgTypes<InlineInputsProps>>;

const meta: Meta<typeof InlineInputs> = {
  title: "Inline Inputs",
  component: InlineInputs,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof InlineInputs>;

export const Default: Story = () => {
  let validationProps = {};
  validationProps = {
    hasWarning: true,
    inputIcon: "warning",
    tooltipMessage: "warning",
  };
  const [decimalValue, setDecimalValue] = useState("0.00");
  const [selectValue, setSelectValue] = useState("");
  const handleDecimalChange = (ev: {
    target: { value: { rawValue: React.SetStateAction<string> } };
  }) => {
    setDecimalValue(ev.target.value.rawValue);
  };
  const handleSelectChange = (ev: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectValue(ev.target.value);
  };
  return (
    <InlineInputs
      label="Inline Inputs"
      labelId="inline-inputs-default"
      gutter="none"
    >
      <Textbox aria-labelledby="inline-inputs-default" {...validationProps} />
      <Decimal
        aria-labelledby="inline-inputs-default"
        value={decimalValue}
        onChange={handleDecimalChange}
      />
      <Select
        value={selectValue}
        onChange={handleSelectChange}
        aria-labelledby="inline-inputs-default"
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </Select>
    </InlineInputs>
  );
};
Default.storyName = "Default";

export const WithAdaptiveLabelBreakpoint: Story = () => {
  return (
    <Box p={4}>
      <InlineInputs
        label="My Inline Inputs"
        labelId="inline-inputs-adaptive"
        adaptiveLabelBreakpoint={768}
        labelWidth={30}
        gutter="none"
      >
        <Textbox aria-labelledby="inline-inputs-adaptive" />
        <Textbox aria-labelledby="inline-inputs-adaptive" />
      </InlineInputs>
      <Textbox label="My Textbox" adaptiveLabelBreakpoint={768} />
    </Box>
  );
};
WithAdaptiveLabelBreakpoint.storyName = "With Adaptive Label Breakpoint";

export const Required: Story = () => {
  return (
    <InlineInputs
      label="Inline Inputs"
      labelId="inline-inputs-required"
      required
    >
      <Textbox aria-labelledby="inline-inputs-required" />
      <Textbox aria-labelledby="inline-inputs-required" />
    </InlineInputs>
  );
};
Required.storyName = "Required";
Required.parameters = { controls: { disable: true } };
