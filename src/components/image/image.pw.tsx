import { expect, test } from "@playwright/experimental-ct-react17";
import React from "react";

import { checkAccessibility } from "../../../playwright/support/helper";
import {
  AsAnImg,
  CarbonLogoImage,
  CustomResponsiveBehaviour,
  DecorativeImage,
  Default,
} from "./components.test-pw";

test("When hidden prop is false, component should be visible to sighted users", async ({
  mount,
  page,
}) => {
  await mount(<CarbonLogoImage />);

  const imageElement = page.locator("img");
  await expect(imageElement).toBeInViewport();
});

test("When hidden prop is true, component should not be visible to sighted users", async ({
  mount,
  page,
}) => {
  await mount(<CarbonLogoImage hidden />);

  const imageElement = page.locator("img");
  await expect(imageElement).not.toBeInViewport();
});

(["absolute", "fixed", "relative", "static", "sticky"] as const).forEach(
  (positionValue) => {
    test(`When position prop is ${positionValue} it should apply the expected CSS`, async ({
      mount,
      page,
    }) => {
      await mount(<CarbonLogoImage position={positionValue} />);

      const imageElement = page.locator("img");
      await expect(imageElement).toHaveCSS("position", positionValue);
    });
  }
);

test.describe("Accessibility tests for Image component", () => {
  test("should pass accessibility tests for default example", async ({
    mount,
    page,
  }) => {
    await mount(<Default />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for AsAnImg example", async ({
    mount,
    page,
  }) => {
    await mount(<AsAnImg />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for CustomResponsiveBehaviour example", async ({
    mount,
    page,
  }) => {
    await mount(<CustomResponsiveBehaviour />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for DecorativeImage example", async ({
    mount,
    page,
  }) => {
    await mount(<DecorativeImage />);

    await checkAccessibility(page);
  });
});
