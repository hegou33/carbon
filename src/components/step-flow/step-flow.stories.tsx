import React, { useState, useRef } from "react";
import { ComponentStory } from "@storybook/react";
import { StepFlow } from ".";
import Box from "../box";
import Button from "../button";
import I18nProvider from "../i18n-provider/i18n-provider.component";
import { Steps } from "./step-flow.component";

export const DefaultStory: ComponentStory<typeof StepFlow> = () => {
  const titleFocusRef = useRef(null);

  return (
    <StepFlow
      title="Step title"
      currentStep={1}
      totalSteps={6}
      titleRef={titleFocusRef}
    />
  );
};

export const CategoryStory: ComponentStory<typeof StepFlow> = () => {
  const titleFocusRef = useRef(null);

  return (
    <StepFlow
      category="Main goal"
      title="Step title"
      currentStep={1}
      totalSteps={6}
      titleRef={titleFocusRef}
    />
  );
};

export const ShowProgressIndicatorStory: ComponentStory<
  typeof StepFlow
> = () => {
  const titleFocusRef = useRef(null);

  return (
    <StepFlow
      category="Main goal"
      title="Step title"
      currentStep={1}
      totalSteps={6}
      titleRef={titleFocusRef}
      showProgressIndicator
    />
  );
};

export const CurrentStepStory: ComponentStory<typeof StepFlow> = () => {
  const titleFocusRef = useRef(null);

  return (
    <StepFlow
      category="Main goal"
      title="Step title"
      currentStep={5}
      totalSteps={6}
      titleRef={titleFocusRef}
      showProgressIndicator
    />
  );
};

export const TotalStepsStory: ComponentStory<typeof StepFlow> = () => {
  const titleFocusRef = useRef(null);

  return (
    <StepFlow
      category="Main goal"
      title="Step title"
      currentStep={5}
      totalSteps={8}
      titleRef={titleFocusRef}
      showProgressIndicator
    />
  );
};

export const ShowCloseIconStory: ComponentStory<typeof StepFlow> = () => {
  const titleFocusRef = useRef(null);

  return (
    <StepFlow
      category="Main goal"
      title="Step title"
      currentStep={1}
      totalSteps={6}
      titleRef={titleFocusRef}
      showCloseIcon
      onDismiss={() => ""}
    />
  );
};

export const ExampleImplementation: ComponentStory<typeof StepFlow> = () => {
  const lowestStep = 1;
  const highestStep = 3;
  const [step, setStep] = useState(lowestStep);
  const titleFocusRef: React.RefObject<HTMLDivElement> = useRef(null);
  const stepTitles = ["Transaction Type", "Add refund", "Refund details"];

  const focusOnTitle = () => {
    if (titleFocusRef.current) {
      titleFocusRef.current.focus();
    }
  };

  function handleClick(clickType: string) {
    focusOnTitle();

    if (clickType === "back") {
      setStep(step > lowestStep ? step - 1 : step);
    } else {
      setStep(step < highestStep ? step + 1 : step);
    }
  }

  return (
    <Box>
      <StepFlow
        category="Add client"
        title={stepTitles[step - 1]}
        currentStep={step as Steps}
        totalSteps={highestStep}
        titleRef={titleFocusRef}
        showProgressIndicator
      />
      <Box display="flex" justifyContent="right" mt={2}>
        <Button
          buttonType="tertiary"
          onClick={() => handleClick("back")}
          mr={2}
        >
          Back
        </Button>
        <Button buttonType="primary" onClick={() => handleClick("continue")}>
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export const ExampleImplementationWithTranslations: ComponentStory<
  typeof StepFlow
> = () => {
  const lowestStep = 1;
  const highestStep = 3;
  const [step, setStep] = useState(lowestStep);
  const titleFocusRef: React.RefObject<HTMLDivElement> = useRef(null);
  const stepTitles = [
    "Type de transaction",
    "Ajouter un remboursement",
    "Détails du remboursement",
  ];

  const focusOnTitle = () => {
    if (titleFocusRef.current) {
      titleFocusRef.current.focus();
    }
  };

  function handleClick(clickType: string) {
    focusOnTitle();

    if (clickType === "back") {
      setStep(step > lowestStep ? step - 1 : step);
    } else {
      setStep(step < highestStep ? step + 1 : step);
    }
  }

  return (
    <I18nProvider
      locale={{
        locale: () => "fr-FR",
        stepFlow: {
          stepLabel: (currentStep, totalSteps) =>
            `${currentStep} de ${totalSteps}`,
          screenReaderOnlyTitle: (title, currentStep, totalSteps, category) =>
            `${category}. ${title}. Étape ${currentStep} de ${totalSteps}.`,
        },
      }}
    >
      <Box>
        <StepFlow
          category="Ajouter un client"
          title={stepTitles[step - 1]}
          currentStep={step as Steps}
          totalSteps={highestStep}
          titleRef={titleFocusRef}
          showProgressIndicator
        />
        <Box display="flex" justifyContent="right" mt={2}>
          <Button
            buttonType="tertiary"
            onClick={() => handleClick("back")}
            mr={2}
          >
            Retour
          </Button>
          <Button buttonType="primary" onClick={() => handleClick("continue")}>
            Continuer
          </Button>
        </Box>
      </Box>
    </I18nProvider>
  );
};
