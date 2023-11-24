import React, { useRef } from "react";
import Button from "../button";
import Box from "../box";
import { StepFlow, StepFlowProps } from ".";

export const StepFlowComponent = (props: Partial<StepFlowProps>) => {
  const titleFocusRef = useRef(null);

  return (
    <StepFlow
      title="foo"
      currentStep={1}
      totalSteps={8}
      titleRef={titleFocusRef}
      {...props}
    />
  );
};

export const StepFlowComponentWithRefAndButtons = (
  props: Partial<StepFlowProps>
) => {
  const titleFocusRef: React.RefObject<HTMLDivElement> = useRef(null);

  const focusOnTitle = () => {
    if (titleFocusRef.current) {
      titleFocusRef.current.focus();
    }
  };

  return (
    <Box>
      <StepFlow
        title="foo"
        currentStep={1}
        totalSteps={8}
        titleRef={titleFocusRef}
        {...props}
      />
      <Button buttonType="tertiary" onClick={() => focusOnTitle()} mr={2}>
        Back
      </Button>
      <Button buttonType="primary" onClick={() => focusOnTitle()}>
        Continue
      </Button>
    </Box>
  );
};
