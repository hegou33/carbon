import React, { useState, useRef } from "react";
import { ComponentStory } from "@storybook/react";
import { StepFlow } from ".";
import Box from "../box";
import Button from "../button";
import I18nProvider from "../i18n-provider/i18n-provider.component";
import { Steps, StepFlowHandle } from "./step-flow.component";

export const DefaultStory: ComponentStory<typeof StepFlow> = () => (
  <StepFlow title="Step title" currentStep={1} totalSteps={6} />
);

export const CategoryStory: ComponentStory<typeof StepFlow> = () => (
  <StepFlow
    category="Main goal"
    title="Step title"
    currentStep={1}
    totalSteps={6}
  />
);

export const ShowProgressIndicatorStory: ComponentStory<
  typeof StepFlow
> = () => (
  <StepFlow
    category="Main goal"
    title="Step title"
    currentStep={1}
    totalSteps={6}
    showProgressIndicator
  />
);

export const CurrentStepStory: ComponentStory<typeof StepFlow> = () => (
  <StepFlow
    category="Main goal"
    title="Step title"
    currentStep={5}
    totalSteps={6}
    showProgressIndicator
  />
);

export const TotalStepsStory: ComponentStory<typeof StepFlow> = () => (
  <StepFlow
    category="Main goal"
    title="Step title"
    currentStep={5}
    totalSteps={8}
    showProgressIndicator
  />
);

export const ShowCloseIconStory: ComponentStory<typeof StepFlow> = () => (
  <StepFlow
    category="Main goal"
    title="Step title"
    currentStep={1}
    totalSteps={6}
    showCloseIcon
    onDismiss={() => ""}
  />
);

export const ExampleImplementation: ComponentStory<typeof StepFlow> = () => {
  const lowestStep = 1;
  const highestStep = 3;

  const [step, setStep] = useState(lowestStep);
  const stepFlowHandle = useRef<StepFlowHandle>(null);

  const stepTitles = ["Transaction Type", "Add refund", "Refund details"];

  function handleClick(clickType: string) {
    stepFlowHandle.current?.focus();

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
        ref={stepFlowHandle}
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
  const stepFlowHandle = useRef<StepFlowHandle>(null);

  const stepTitles = [
    "Type de transaction",
    "Ajouter un remboursement",
    "Détails du remboursement",
  ];

  function handleClick(clickType: string) {
    stepFlowHandle.current?.focus();

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
            `Étape ${currentStep} de ${totalSteps}`,
          screenReaderOnlyTitle: (title, currentStep, totalSteps, category) =>
            `${category}. ${title}. Étape ${currentStep} de ${totalSteps}.`,
          closeIconAriaLabel: () => "Fermer",
        },
      }}
    >
      <Box>
        <StepFlow
          category="Ajouter un client"
          title={stepTitles[step - 1]}
          currentStep={step as Steps}
          totalSteps={highestStep}
          ref={stepFlowHandle}
          showProgressIndicator
          showCloseIcon
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
