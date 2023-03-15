import React from "react";
import GlobalHeader from "./global-header.component";
import { FullMenuExample } from "./global-header-test.stories";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

import carbonLogo from "../../../logo/carbon-logo.png";
import navigationBar from "../../../cypress/locators/navigation-bar";
import {
  globalHeader,
  globalHeaderLogo,
} from "../../../cypress/locators/global-header";

context("Testing Global Header component", () => {
  it("should check that z-index of component is greater than that of NavigationBar", () => {
    CypressMountWithProviders(<FullMenuExample />);

    globalHeader()
      .invoke("css", "z-index")
      .then(parseInt)
      .then(($globalHeaderZIndex) => {
        navigationBar()
          .invoke("css", "z-index")
          .then(parseInt)
          .should(($navigationBarZIndex) => {
            expect($globalHeaderZIndex).to.be.greaterThan($navigationBarZIndex);
          });
      });
  });

  it("should check when logo prop is passed, the height of the logo element never exceeds the maximum height of the component", () => {
    const logoHeight = 41;
    const expectedHeight = 40;

    const logo = (
      <img
        data-element="logo"
        height={logoHeight}
        src={carbonLogo}
        alt="Carbon logo"
      />
    );
    CypressMountWithProviders(<GlobalHeader logo={logo}>Example</GlobalHeader>);

    globalHeaderLogo().should("have.css", "height", `${expectedHeight}px`);
  });

  describe("Accessibility tests for Global-Header component", () => {
    it("should pass accessibility tests for Global-Header FullMenuExample", () => {
      CypressMountWithProviders(<FullMenuExample />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Global-Header when logo prop is passed", () => {
      const logoHeight = 41;

      const logo = (
        <img
          data-element="logo"
          height={logoHeight}
          src={carbonLogo}
          alt="Carbon logo"
        />
      );
      CypressMountWithProviders(
        <GlobalHeader logo={logo}>Example</GlobalHeader>
      );

      cy.checkAccessibility();
    });
  });
});
