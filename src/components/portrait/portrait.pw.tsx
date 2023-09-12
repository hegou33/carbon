import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import { getDataElementByValue } from "../../../playwright/components";
import {
  portraitImage,
  portraitInitials,
  portraitPreview,
} from "../../../playwright/components/portrait/index";
import { icon } from "../../../playwright/components/index";
import {
  CHARACTERS,
  COLOR,
  SIZE,
  VALIDATION,
} from "../../../playwright/support/constants";
import { checkAccessibility } from "../../../playwright/support/helper";
import Box from "../../../src/components/box";
import {
  PORTRAIT_SIZE_PARAMS,
  PORTRAIT_SIZES,
} from "../../../src/components/portrait/portrait.config";
import {
  PortraitComponent,
  PortraitDefaultComponent,
} from "./components.test-pw";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const colors = [
  ["orange", COLOR.ORANGE],
  ["red", COLOR.RED],
  ["black", COLOR.BLACK],
  ["brown", COLOR.BROWN],
];

const testImage =
  "https://www.gravatar.com/avatar/cceff1ad774bf89b1f75cb6e5005333c?s=40&d=404";

const imageURLs = [
  "https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
  "https://www.gravatar.com/avatar/05c1c705ee45d7ae88b80b3a8866ddaa?s=24&d=404",
];

const portraitSizes = PORTRAIT_SIZES.map((size) => [
  size,
  PORTRAIT_SIZE_PARAMS[size].dimensions,
]);

test.describe("Prop checks for Portrait component", () => {
  test("should render with gravatar prop", async ({ mount, page }) => {
    await mount(<PortraitDefaultComponent gravatar="chris.barber@sage.com" />);

    await expect(portraitPreview(page)).toHaveCSS("height", "40px");
    await expect(portraitPreview(page)).toHaveCSS("width", "40px");
    await expect(portraitPreview(page).locator("img")).toHaveAttribute(
      "src",
      testImage
    );
  });

  imageURLs.forEach((url) => {
    test(`should render with src prop passed as ${url}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent src={url} />);

      await expect(portraitPreview(page)).toHaveCSS("height", "40px");
      await expect(portraitPreview(page)).toHaveCSS("width", "40px");
      await expect(portraitImage(page)).toHaveAttribute("src", url);
    });
  });

  portraitSizes.forEach(([size, heightAndWidth]) => {
    test(`should render with size prop passed as ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent size={size} />);

      await expect(portraitPreview(page)).toHaveCSS(
        "height",
        `${heightAndWidth}px`
      );
      await expect(portraitPreview(page)).toHaveCSS(
        "width",
        `${heightAndWidth}px`
      );
    });
  });

  test("should render with alt text", async ({ mount, page }) => {
    await mount(
      <PortraitDefaultComponent src={testImage} alt="playwright-test" />
    );

    await expect(portraitImage(page)).toHaveAttribute("alt", "playwright-test");
  });

  [
    ["square", "0px"],
    ["circle", "50%"],
  ].forEach(([shape, radius]) => {
    test(`should render with shape prop passed as ${shape}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent shape={shape} />);

      await expect(portraitPreview(page).locator("span")).toHaveCSS(
        "border-radius",
        radius
      );
    });
  });

  ["error", "warning", "info"].forEach((iconType) => {
    test(`should render with iconType prop passed as ${iconType}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent iconType={iconType} />);

      await expect(icon(page)).toBeVisible();
      await expect(icon(page)).toHaveAttribute("data-element", iconType);
    });
  });

  ["SPM", "JM", "AR", "MJ"].forEach((passInitials) => {
    test(`should render with correct width and height, when initials prop is passed as ${passInitials}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent initials={passInitials} />);

      await expect(portraitInitials(page)).toHaveCSS("height", "38px");
      await expect(portraitInitials(page)).toHaveCSS("width", "38px");
    });
  });

  ([
    ["without", false, "rgb(242, 245, 246)"],
    ["with", true, "rgb(153, 173, 183)"],
  ] as [string, boolean, string][]).forEach(([renderState, boolVal, color]) => {
    test(`should render ${renderState} dark background variant, when darkBackground prop is ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent darkBackground={boolVal} />);

      await expect(portraitPreview(page).locator("span")).toHaveCSS(
        "background-color",
        color
      );
    });
  });

  testData.forEach((tooltipMessage) => {
    test(`should render with tooltipMessage as ${tooltipMessage}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent tooltipMessage={tooltipMessage} />);

      await portraitPreview(page).hover();

      const tooltip = getDataElementByValue(page, "tooltip");

      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveText(tooltipMessage);
    });
  });

  testData.forEach((tooltipId) => {
    test(`should render with tooltipId as ${tooltipId}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PortraitDefaultComponent tooltipMessage="foo" tooltipId={tooltipId} />
      );

      await portraitPreview(page).hover();

      const tooltip = getDataElementByValue(page, "tooltip");

      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveId(tooltipId);
    });
  });

  [
    [true, "with"],
    [false, "without"],
  ].forEach(([boolVal, renderState]) => {
    test(`should render ${renderState} a tooltip, when visibility prop is ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PortraitComponent tooltipMessage="foo" tooltipIsVisible={boolVal} />
      );

      const tooltip = getDataElementByValue(page, "tooltip");

      if (boolVal) {
        await expect(tooltip).toBeVisible();
        await expect(tooltip).toHaveText("foo");
      } else {
        await expect(tooltip).not.toBeVisible();
      }
    });
  });

  ["top", "bottom", "left", "right"].forEach((tooltipPosition) => {
    test(`should render with tooltip positioned ${tooltipPosition}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Box p={200}>
          <PortraitComponent tooltipPosition={tooltipPosition} />{" "}
        </Box>
      );

      const tooltip = getDataElementByValue(page, "tooltip");

      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveAttribute("data-placement", tooltipPosition);
    });
  });

  test("should render with a tooltip error", async ({ mount, page }) => {
    await mount(<PortraitComponent tooltipType="error" />);

    const tooltip = getDataElementByValue(page, "tooltip");

    await expect(tooltip).toHaveCSS("background-color", VALIDATION.ERROR);
  });

  [
    [SIZE.MEDIUM, "14px"],
    [SIZE.LARGE, "16px"],
  ].forEach(([tooltipSize, fontSize]) => {
    test(`should render with a ${tooltipSize} size tooltip`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitComponent tooltipSize={tooltipSize} />);

      const tooltip = getDataElementByValue(page, "tooltip");

      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveCSS("font-size", fontSize);
    });
  });

  colors.forEach(([names, color]) => {
    test(`should render with a tooltip with a ${names} background color`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitComponent tooltipBgColor={color} />);

      const tooltip = getDataElementByValue(page, "tooltip");

      await expect(tooltip).toHaveCSS("background-color", color);
    });
  });

  colors.forEach(([names, color]) => {
    test(`should render with a tooltip with a ${names} font color`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitComponent tooltipFontColor={color} />);

      const tooltip = getDataElementByValue(page, "tooltip");

      await expect(tooltip).toHaveCSS("color", color);
    });
  });
});

test.describe("Event checks for Portrait component", () => {
  test("should render and call onClick callback when a click event", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(<PortraitDefaultComponent onClick={(callbackCount += 1)} />);

    await portraitPreview(page).click();
    expect(callbackCount).toBe(1);
  });
});

// TODO: remove "color-contrast" disabled rules parameter from all relevant accessibility tests upon the completion of FE-6202
test.describe("Accessibility tests for Portrait component", () => {
  test("should pass accessibility checks when gravatar is passed", async ({
    mount,
    page,
  }) => {
    await mount(<PortraitDefaultComponent gravatar="chris.barber@sage.com" />);

    await checkAccessibility(page);
  });

  imageURLs.forEach((url) => {
    test(`should pass accessibility checks when src is ${url}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent src={url} />);

      await checkAccessibility(page);
    });
  });

  portraitSizes.forEach(([size]) => {
    test(`should pass accessibility checks when size is ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent size={size} />);

      await checkAccessibility(page, "color-contrast");
    });
  });

  test("should pass accessibility checks when alt text is passed", async ({
    mount,
    page,
  }) => {
    await mount(<PortraitDefaultComponent alt="playwright-test" />);

    await checkAccessibility(page, "color-contrast");
  });

  ["square", "circle"].forEach((shape) => {
    test(`should pass accessibility checks when shape is ${shape}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent shape={shape} />);

      await checkAccessibility(page, "color-contrast");
    });
  });

  ["error", "warning", "info"].forEach((iconType) => {
    test(`should pass accessibility checks when iconType is ${iconType}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent iconType={iconType} />);

      await checkAccessibility(page, "color-contrast");
    });
  });

  ["SPM", "JM", "AR", "MJ"].forEach((passInitials) => {
    test(`should pass accessibility checks when initials are ${passInitials}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent initials={passInitials} />);

      await checkAccessibility(page, "color-contrast");
    });
  });

  ([
    ["without", false, "rgb(242, 245, 246)"],
    ["with", true, "rgb(153, 173, 183)"],
  ] as [string, boolean, string][]).forEach(([renderState, boolVal]) => {
    test(`should pass accessibility checks ${renderState} dark background variant, when darkBackground prop is ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitDefaultComponent darkBackground={boolVal} />);

      await checkAccessibility(page, "color-contrast");
    });
  });

  testData.forEach((tooltipMessage) => {
    test(`should pass accessibility checks when toolTipMessage is ${tooltipMessage}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PortraitComponent tooltipIsVisible tooltipMessage={tooltipMessage} />
      );

      await checkAccessibility(page, "color-contrast");
    });
  });

  testData.forEach((tooltipId) => {
    test(`should pass accessibility checks when tooltipId is ${tooltipId}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitComponent tooltipId={tooltipId} />);

      await checkAccessibility(page, "color-contrast");
    });
  });

  [
    [true, "with"],
    [false, "without"],
  ].forEach(([boolVal, renderState]) => {
    test(`should pass accessibility checks ${renderState} a tooltip, when visibility prop is ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PortraitComponent tooltipMessage="foo" tooltipIsVisible={boolVal} />
      );

      await checkAccessibility(page, "color-contrast");
    });
  });

  ["top", "bottom", "left", "right"].forEach((tooltipPosition) => {
    test(`should pass accessibility checks with tooltip positioned ${tooltipPosition}`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitComponent tooltipPosition={tooltipPosition} />);

      await checkAccessibility(page, "color-contrast");
    });
  });

  test("should pass accessibility checks with a tooltip error", async ({
    mount,
    page,
  }) => {
    await mount(<PortraitComponent tooltipType="error" />);

    await checkAccessibility(page, "color-contrast");
  });

  [SIZE.MEDIUM, SIZE.LARGE].forEach((tooltipSize) => {
    test(`should pass accessibility checks with a ${tooltipSize} size tooltip`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitComponent size={tooltipSize} />);

      await checkAccessibility(page, "color-contrast");
    });
  });

  colors.forEach(([names]) => {
    test(`should pass accessibility checks with a tooltip, with a ${names} background color`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitComponent tooltipBgColor={names} />);

      await checkAccessibility(page, "color-contrast");
    });
  });

  colors.forEach(([names]) => {
    test(`should pass accessibility checks with a tooltip, with a ${names} font color`, async ({
      mount,
      page,
    }) => {
      await mount(<PortraitComponent tooltipFontColor={names} />);

      await checkAccessibility(page, "color-contrast");
    });
  });

  test("should pass accessibility checks when onClick callback is called during a click event", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(<PortraitDefaultComponent onClick={(callbackCount += 1)} />);

    await checkAccessibility(page, "color-contrast");
  });
});
