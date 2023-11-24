import React from "react";
import { render, screen } from "@testing-library/react";
import { StepFlow } from "./index";
import { Steps } from "./step-flow.component";

describe("Step Flow component", () => {
  const mockRef = { current: null };

  function generateLimitedVariations(): [Steps, Steps][] {
    const variations: [Steps, Steps][] = [];

    for (let totalSteps = 1; totalSteps <= 8; totalSteps++) {
      for (let currentStep = 1; currentStep <= totalSteps; currentStep++) {
        variations.push([totalSteps as Steps, currentStep as Steps]);
      }
    }

    return variations;
  }

  function generateCurrentStepOverTotalStepsVariations(): [Steps, Steps][] {
    const variations: [Steps, Steps][] = [];

    for (let totalSteps = 1; totalSteps <= 8; totalSteps++) {
      for (let currentStep = totalSteps + 1; currentStep <= 8; currentStep++) {
        variations.push([totalSteps as Steps, currentStep as Steps]);
      }
    }

    return variations;
  }

  function calculateStepStateIndexes(
    totalSteps: number,
    currentStepParam: number
  ) {
    let currentStep = currentStepParam;

    if (currentStep > totalSteps) {
      currentStep = totalSteps;
    }

    const stepsBefore = currentStep - 1;
    const stepsAfter = totalSteps - currentStep;

    return [stepsBefore, stepsAfter];
  }

  describe("prop checks", () => {
    it("when the 'category' prop is passed, the correct element and text renders", () => {
      render(
        <StepFlow
          title="foo"
          currentStep={5}
          totalSteps={6}
          category="bar"
          titleRef={mockRef}
        />
      );

      expect(screen.getByText("bar")).toBeInTheDocument();
    });

    it("when the 'title' prop is passed, the correct element and text renders", () => {
      render(
        <StepFlow
          title="baz"
          currentStep={5}
          totalSteps={6}
          category="bar"
          titleRef={mockRef}
        />
      );

      expect(screen.getByText("baz")).toBeInTheDocument();
    });

    it("when the 'tabIndex' prop is passed, the tabIndex attribute should be set correctly", () => {
      const { container } = render(
        <StepFlow
          {...{
            title: "baz",
            totalSteps: 6,
            currentStep: 1,
            titleTabIndex: 0,
            titleRef: mockRef,
          }}
        />
      );

      expect(
        container
          .querySelector('[data-element="title-text-container"]')
          ?.getAttribute("tabindex")
      ).toBe("0");
    });

    it("when the 'showProgressIndicator' prop is true, the correct element renders", () => {
      const { container } = render(
        <StepFlow
          title="baz"
          currentStep={5}
          totalSteps={6}
          showProgressIndicator
          titleRef={mockRef}
        />
      );
      expect(
        container.querySelector('[data-element="progress-indicator"]')
      ).toBeInTheDocument();
    });

    it.each(generateLimitedVariations())(
      "when 'totalSteps' is passed as %s and 'currentStep' prop is %s, the step label contains the correct text",
      (totalSteps, currentStep) => {
        const { container } = render(
          <StepFlow
            {...{
              title: "baz",
              totalSteps,
              currentStep,
              titleTabIndex: 0,
              titleRef: mockRef,
            }}
          />
        );

        expect(
          container.querySelector('[data-element="step-label"]')
        ).toHaveTextContent(`${currentStep} of ${totalSteps}`);
      }
    );

    it.each(generateCurrentStepOverTotalStepsVariations())(
      "when 'totalSteps' is passed as %s and is lower than the 'currentStep' prop of %s, the step label contains the correct text",
      (totalSteps, currentStep) => {
        const { container } = render(
          <StepFlow
            {...{
              title: "baz",
              totalSteps,
              currentStep,
              titleTabIndex: 0,
              titleRef: mockRef,
            }}
          />
        );

        expect(
          container.querySelector('[data-element="step-label"]')
        ).toHaveTextContent(`${totalSteps} of ${totalSteps}`);
      }
    );

    it.each(generateLimitedVariations())(
      "when 'totalSteps' is passed as %s and 'currentStep' prop is %s, the visually hidden title text contains the correct text",
      (totalSteps, currentStep) => {
        const category = "foo";
        const title = "bar";

        const { container } = render(
          <StepFlow
            {...{
              category,
              title,
              totalSteps,
              currentStep,
              titleTabIndex: 0,
              titleRef: mockRef,
            }}
          />
        );

        expect(
          container.querySelector('[data-element="visually-hidden-title-text"]')
        ).toHaveTextContent(
          `${category}. ${title}. Step ${currentStep} of ${totalSteps}.`
        );
      }
    );

    it.each(generateCurrentStepOverTotalStepsVariations())(
      "when 'totalSteps' is passed as %s and is lower than the 'currentStep' prop of %s, the visually hidden title text contains the correct text",
      (totalSteps, currentStep) => {
        const category = "foo";
        const title = "bar";

        const { container } = render(
          <StepFlow
            {...{
              category,
              title,
              totalSteps,
              currentStep,
              titleTabIndex: 0,
              titleRef: mockRef,
            }}
          />
        );

        expect(
          container.querySelector('[data-element="visually-hidden-title-text"]')
        ).toHaveTextContent(
          `${category}. ${title}. Step ${totalSteps} of ${totalSteps}.`
        );
      }
    );

    it("when the 'showCloseIcon' prop is true, the correct element renders", () => {
      const { container } = render(
        <StepFlow
          {...{
            title: "baz",
            totalSteps: 6,
            currentStep: 1,
            showCloseIcon: true,
            titleRef: mockRef,
          }}
        />
      );

      expect(
        container.querySelector('[data-element="close"]')
      ).toBeInTheDocument();
    });
  });

  describe.each(generateLimitedVariations())(
    "indicator state checks - component used as intended (currentStep is always lower than totalSteps) - totalSteps is %s, currentStep is %s",
    (totalSteps, currentStep) => {
      it("only one in progress indicators are rendered", () => {
        const { container } = render(
          <StepFlow
            {...{
              title: "baz",
              totalSteps,
              currentStep,
              showProgressIndicator: true,
              titleRef: mockRef,
            }}
          />
        );

        const count = container.querySelectorAll('[data-state="in-progress"]')
          .length;
        expect(count).toBe(1);
      });

      it("correct number of completed indicators are rendered", () => {
        const { container } = render(
          <StepFlow
            {...{
              title: "baz",
              totalSteps,
              currentStep,
              showProgressIndicator: true,
              titleRef: mockRef,
            }}
          />
        );

        const count = container.querySelectorAll('[data-state="is-completed"]')
          .length;
        const currentCount = calculateStepStateIndexes(
          totalSteps,
          currentStep
        )[0];

        expect(count).toBe(currentCount);
      });

      it("correct number of not completed progress indicators are rendered", () => {
        const { container } = render(
          <StepFlow
            {...{
              title: "baz",
              totalSteps,
              currentStep,
              showProgressIndicator: true,
              titleRef: mockRef,
            }}
          />
        );

        const count = container.querySelectorAll('[data-state="not-completed"]')
          .length;
        const currentCount = calculateStepStateIndexes(
          totalSteps,
          currentStep
        )[1];

        expect(count).toBe(currentCount);
      });
    }
  );

  describe.each(generateCurrentStepOverTotalStepsVariations())(
    "indicator state checks - component not used as intended (currentStep is higher than totalSteps)- totalSteps is %s, currentStep is %s",
    (totalSteps, currentStep) => {
      it("only one in progress indicator is rendered", () => {
        const { container } = render(
          <StepFlow
            {...{
              title: "baz",
              totalSteps,
              currentStep,
              showProgressIndicator: true,
              titleRef: mockRef,
            }}
          />
        );

        const count = container.querySelectorAll('[data-state="in-progress"]')
          .length;
        expect(count).toBe(1);
      });

      it("correct number of completed indicators are rendered", () => {
        const { container } = render(
          <StepFlow
            {...{
              title: "baz",
              totalSteps,
              currentStep,
              showProgressIndicator: true,
              titleRef: mockRef,
            }}
          />
        );

        const count = container.querySelectorAll('[data-state="is-completed"]')
          .length;
        const currentCount = calculateStepStateIndexes(
          totalSteps,
          currentStep
        )[0];

        expect(count).toBe(currentCount);
      });

      it("no not completed indicators are rendered", () => {
        const { container } = render(
          <StepFlow
            {...{
              title: "baz",
              totalSteps,
              currentStep,
              showProgressIndicator: true,
              titleRef: mockRef,
            }}
          />
        );

        const count = container.querySelectorAll('[data-state="not-completed"]')
          .length;

        expect(count).toBe(0);
      });
    }
  );
});
