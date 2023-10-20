import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Alert from ".";
import Button from "../button";

import isChromatic from "../../../.storybook/isChromatic";

const meta: Meta<typeof Alert> = {
  title: "Alert",
  component: Alert,
};

export default meta;
type Story = StoryObj<typeof Alert>;

const defaultOpenState = isChromatic();

export const Default: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Alert</Button>
      <Alert
        onCancel={() => setIsOpen(false)}
        title="Title"
        disableEscKey={false}
        height=""
        subtitle="Subtitle"
        showCloseIcon
        size="extra-small"
        open={isOpen}
      >
        This is an example of an alert
      </Alert>
    </>
  );
};
Default.storyName = "Default";
