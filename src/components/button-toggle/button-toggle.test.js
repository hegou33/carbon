import * as React from "react";
import ButtonToggle from "./button-toggle.component";
import {
  buttonToggleLabelPreview,
  buttonTogglePreview,
  buttonToggleInput,
} from "../../../cypress/locators/button-toggle";
import { icon } from "../../../cypress/locators";
import { positionOfElement } from "../../../cypress/support/helper";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

const specialCharacters = [
  "label",
  "mp150ú¿¡üßä",
  "!@#$%^*()_+-=~[];:.,?{}&\"'<>",
];
const sizes = [
  ["small", 32],
  ["medium", 40],
  ["large", 48],
];
const testPropValue = "cypress_test";

const ButtonToggleComponent = ({ children, ...props }) => {
  return (
    <div>
      <ButtonToggle
        name="button-toggle-one"
        label="Default example"
        onBlur={function noRefCheck() {}}
        onChange={function noRefCheck() {}}
        onFocus={function noRefCheck() {}}
        {...props}
      >
        First
      </ButtonToggle>
      <ButtonToggle
        name="button-toggle-two"
        onBlur={function noRefCheck() {}}
        onChange={function noRefCheck() {}}
        onFocus={function noRefCheck() {}}
        {...props}
      >
        Second
      </ButtonToggle>
      <ButtonToggle
        name="button-toggle-three"
        onBlur={function noRefCheck() {}}
        onChange={function noRefCheck() {}}
        onFocus={function noRefCheck() {}}
        {...props}
      >
        Third
      </ButtonToggle>
    </div>
  );
};

context("Testing Button-Toggle component", () => {
  describe("should render Button-Toggle component", () => {
    it("should render Button-Toggle with aria-label prop", () => {
      CypressMountWithProviders(
        <ButtonToggleComponent aria-label="cypress-aria" />
      );

      buttonToggleInput().should("have.attr", "aria-label", "cypress-aria");
    });

    it("should render Button-Toggle with aria-labelledby prop", () => {
      CypressMountWithProviders(
        <ButtonToggleComponent aria-labelledby={testPropValue} />
      );

      buttonToggleInput().should("have.attr", "aria-labelledby", testPropValue);
    });

    it.each([
      [true, "have.attr", "checked"],
      [false, "not.have.attr", "unchecked"],
    ])(
      "should check when checked prop is %s that Button-Toggle  is %s",
      (state, attribute, checked) => {
        CypressMountWithProviders(<ButtonToggleComponent checked={state} />);

        buttonToggleInput().should(attribute, checked);
      }
    );

    it("should render Button-Toggle with data-component prop set to Cypress-Test", () => {
      CypressMountWithProviders(
        <ButtonToggleComponent data-component={testPropValue} />
      );

      buttonToggleInput()
        .parent()
        .should("have.attr", "data-component", testPropValue);
    });

    it("should render Button-Toggle with data-element prop set to Cypress-Test", () => {
      CypressMountWithProviders(
        <ButtonToggleComponent data-element={testPropValue} />
      );

      buttonToggleInput()
        .parent()
        .should("have.attr", "data-element", testPropValue);
    });

    it("should render Button-Toggle with data-role prop set to Cypress-Test", () => {
      CypressMountWithProviders(
        <ButtonToggleComponent data-role={testPropValue} />
      );

      buttonToggleInput()
        .parent()
        .should("have.attr", "data-role", testPropValue);
    });

    it("should render Button-Toggle with name prop set to Cypress-Test", () => {
      CypressMountWithProviders(<ButtonToggleComponent name={testPropValue} />);

      buttonToggleInput().should("have.attr", "name", testPropValue);
    });

    it.each(sizes)(
      "should check when prop is %s that Button-Toggle height is %s",
      (size, height) => {
        CypressMountWithProviders(
          <ButtonToggleComponent size={size}> {size}</ButtonToggleComponent>
        );

        buttonTogglePreview().should("have.css", "height", `${height}px`);
      }
    );

    it.each(["add", "share", "tick"])(
      "should check that Button-Toggle has %s icon",
      (type) => {
        CypressMountWithProviders(
          <ButtonToggleComponent buttonIcon={type} buttonIconSize="large">
            {" "}
            {type}
          </ButtonToggleComponent>
        );

        icon().should("have.attr", "type", type);
      }
    );

    it.each(["small", "medium", "large"])(
      "should check that Button-Toggle icon size is %s",
      (iconSize) => {
        CypressMountWithProviders(
          <ButtonToggleComponent buttonIcon="tick" buttonIconSize={iconSize}>
            {" "}
            {iconSize}
          </ButtonToggleComponent>
        );

        icon()
          .should("have.attr", "font-size", iconSize)
          .and("have.attr", "type", "tick");
      }
    );

    it.each([
      [true, "-1px"],
      [false, "8px"],
    ])(
      "should render Button-Toggle when Grouped prop is %s with margin-left value of %s",
      (state, margin) => {
        CypressMountWithProviders(<ButtonToggleComponent grouped={state} />);

        buttonTogglePreview()
          .eq(positionOfElement("second"))
          .should("have.css", "margin-left", margin);
      }
    );

    it.each(specialCharacters)(
      "should check Button-Toggle text is %s when Children prop is set to %s",
      (labelText) => {
        CypressMountWithProviders(<ButtonToggle>{labelText}</ButtonToggle>);

        buttonToggleLabelPreview(positionOfElement("first")).should(
          "have.text",
          labelText
        );
      }
    );

    it("should render Button-Toggle with Value set to Cypress-Test", () => {
      CypressMountWithProviders(
        <ButtonToggleComponent value={testPropValue} />
      );

      buttonToggleInput().should("have.attr", "value", testPropValue);
    });
  });

  describe("should render Button-Toggle component for event tests", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should render Button-Toggle disabled", () => {
      CypressMountWithProviders(<ButtonToggleComponent disabled />);

      buttonToggleInput().should("have.attr", "disabled");
      buttonTogglePreview()
        .eq(positionOfElement("first"))
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).not.to.have.been.called;
        });
    });

    it("should call onChange callback when a click event is triggered", () => {
      CypressMountWithProviders(<ButtonToggleComponent onChange={callback} />);

      buttonTogglePreview()
        .eq(positionOfElement("first"))
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onFocus callback when a focus event is triggered", () => {
      CypressMountWithProviders(<ButtonToggleComponent onFocus={callback} />);

      buttonToggleInput()
        .eq(positionOfElement("first"))
        .focus()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      CypressMountWithProviders(<ButtonToggleComponent onBlur={callback} />);

      buttonToggleInput().eq(positionOfElement("first")).focus();

      buttonToggleInput()
        .eq(positionOfElement("first"))
        .blur()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });
});