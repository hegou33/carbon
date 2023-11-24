import React, { useRef } from "react";
import { StepFlow, StepFlowProps } from ".";

export default {
  title: "Step Flow/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    category: {
      control: {
        type: "text",
      },
    },
    title: {
      control: {
        type: "text",
      },
    },
    totalSteps: {
      control: {
        min: 1,
        max: 8,
        step: 1,
        type: "range",
      },
    },
    currentStep: {
      control: {
        min: 1,
        max: 8,
        step: 1,
        type: "range",
      },
    },
    showProgressIndicator: {
      control: {
        type: "boolean",
      },
    },
    showCloseIcon: {
      control: {
        type: "boolean",
      },
    },
  },
};

export const Default = (props: Partial<StepFlowProps>) => {
  const titleFocusRef = useRef(null);

  return (
    <StepFlow
      title="default"
      currentStep={1}
      totalSteps={8}
      titleRef={titleFocusRef}
      {...props}
    />
  );
};

Default.storyName = "default";
