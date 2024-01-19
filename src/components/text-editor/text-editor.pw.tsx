/* eslint-disable no-await-in-loop */
import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import {
  TextEditorCustom,
  TextEditorCustomValidation,
} from "./components.test-pw";
import { WithNewValidation as TextEditorNewValidation } from "./text-editor.stories";
import {
  textEditorInput,
  textEditorCounter,
  textEditorContainer,
  textEditorToolbar,
  innerText,
  innerTextList,
} from "../../../playwright/components/text-editor";
import {
  getComponent,
  getDataElementByValue,
} from "../../../playwright/components";
import {
  checkGoldenOutline,
  verifyRequiredAsteriskForLabel,
  checkAccessibility,
  getStyle,
} from "../../../playwright/support/helper";
import { VALIDATION, CHARACTERS } from "../../../playwright/support/constants";
import { HooksConfig } from "../../../playwright";

const textForInput = "Testing is awesome";
const linkText = "https://carbon.sage.com";
const longText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const longTextAssert =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ";
const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

test.describe("Functionality tests", () => {
  test(`should check the counter works properly`, async ({ mount, page }) => {
    await mount(<TextEditorCustom />);

    const textInput = textEditorInput(page);
    await textInput.clear();
    await textInput.fill(textForInput);

    await expect(textEditorCounter(page)).toHaveText("2,982 characters left");
  });

  ["bold", "italic"].forEach((buttonType) => {
    test(`should render text using ${buttonType} style`, async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorCustom />);

      const textInput = textEditorInput(page);
      const toolbar = textEditorToolbar(page, buttonType);
      await toolbar.click();
      await textInput.clear();
      await textInput.fill(textForInput);

      if (buttonType === "bold") {
        await expect(innerText(page)).toHaveCSS("font-weight", "700");
      } else {
        await expect(innerText(page)).toHaveCSS("font-style", "italic");
      }
      await expect(toolbar).toHaveCSS("background-color", "rgb(204, 214, 219)");
    });
  });

  ["bullet-list", "number-list"].forEach((buttonType) => {
    test(`should render text in ${buttonType} style`, async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorCustom />);

      const textInput = textEditorInput(page);
      const toolbar = textEditorToolbar(page, buttonType);
      await toolbar.click();
      await textInput.clear();
      await textInput.type("Testing");
      await page.keyboard.press("Enter");
      await textInput.type("is");
      await page.keyboard.press("Enter");
      await textInput.type("awesome");

      if (buttonType === "bullet-list") {
        await expect(innerTextList(page, "ul", 1)).toHaveText("Testing");
        await expect(innerTextList(page, "ul", 2)).toHaveText("is");
        await expect(innerTextList(page, "ul", 3)).toHaveText("awesome");
      }
      if (buttonType === "number-list") {
        await expect(innerTextList(page, "ol", 1)).toHaveText("Testing");
        await expect(innerTextList(page, "ol", 2)).toHaveText("is");
        await expect(innerTextList(page, "ol", 3)).toHaveText("awesome");
      }
      await expect(toolbar).toHaveCSS("background-color", "rgb(204, 214, 219)");
    });
  });

  ([
    ["bold", 0],
    ["italic", 1],
    ["bullet-list", 2],
    ["number-list", 3],
  ] as [string, number][]).forEach(([buttonType, times]) => {
    test(`should focus ${buttonType} button using RightArrow keyboard key`, async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorCustom />);

      const textInput = textEditorInput(page);
      await textInput.focus();
      await page.keyboard.press("Tab");
      for (let i = 0; i < times; i++) {
        await page.keyboard.press("ArrowRight");
      }

      await expect(textEditorToolbar(page, buttonType)).toBeFocused();
    });
  });

  ([
    ["bold", 4],
    ["italic", 3],
    ["bullet-list", 2],
    ["number-list", 1],
  ] as [string, number][]).forEach(([buttonType, times]) => {
    test(`should focus ${buttonType} button using ArrowLeft keyboard key`, async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorCustom />);

      const textInput = textEditorInput(page);
      await textInput.focus();
      await page.keyboard.press("Tab");
      for (let i = 0; i < times; i++) {
        await page.keyboard.press("ArrowLeft");
      }

      await expect(textEditorToolbar(page, buttonType)).toBeFocused();
    });
  });

  ([
    ["bold", 0],
    ["italic", 1],
    ["bullet-list", 2],
    ["number-list", 3],
  ] as [string, number][]).forEach(([buttonType, times]) => {
    test(`should activate ${buttonType} button using Enter keyboard key`, async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorCustom />);

      const textInput = textEditorInput(page);
      await textInput.focus();
      await page.keyboard.press("Tab");
      for (let i = 0; i < times; i++) {
        await page.keyboard.press("ArrowRight");
      }
      await page.keyboard.press("Enter");

      await expect(textEditorToolbar(page, buttonType)).toHaveCSS(
        "background-color",
        "rgb(204, 214, 219)"
      );
    });
  });

  ([
    ["bold", 0],
    ["italic", 1],
    ["bullet-list", 2],
    ["number-list", 3],
  ] as [string, number][]).forEach(([buttonType, times]) => {
    test(`should activate ${buttonType} button using Space keyboard key`, async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorCustom />);

      const textInput = textEditorInput(page);
      await textInput.focus();
      await page.keyboard.press("Tab");
      for (let i = 0; i < times; i++) {
        await page.keyboard.press("ArrowRight");
      }
      await page.keyboard.press("Space");

      await expect(textEditorToolbar(page, buttonType)).toHaveCSS(
        "background-color",
        "rgb(204, 214, 219)"
      );
    });
  });

  test(`should render formatted link`, async ({ mount, page }) => {
    await mount(<TextEditorCustom />);

    const textInput = textEditorInput(page);
    await textInput.clear();
    await textInput.type(linkText);

    await expect(innerText(page)).toHaveText(linkText);
  });

  test(`should not allow user to type more than characterLimit`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom characterLimit={100} />);

    const textInput = textEditorInput(page);
    await textInput.clear();
    await textInput.type(longText);

    await expect(textEditorCounter(page)).toHaveText("0 characters left");
    await expect(innerText(page)).toHaveText(longTextAssert);
  });

  test(`should focus the first button when focus is moved to the input from the toolbar and tab key pressed`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);

    const textInput = textEditorInput(page);
    await textInput.focus();
    await page.keyboard.press("Tab");
    await expect(textEditorToolbar(page, "bold")).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(textEditorToolbar(page, "italic")).toBeFocused();
    await textInput.focus();
    await page.keyboard.press("Tab");
    await expect(textEditorToolbar(page, "bold")).toBeFocused();
  });

  test(`should focus the first button when focus is moved outside of the component from the toolbar and shift-tab key pressed`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);

    const textInput = textEditorInput(page);
    await textInput.focus();
    await page.keyboard.press("Tab");
    await expect(textEditorToolbar(page, "bold")).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(textEditorToolbar(page, "italic")).toBeFocused();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    await expect(textEditorToolbar(page, "bold")).toBeFocused();
  });
});

test.describe("Prop tests", () => {
  testData.forEach((labelValue) => {
    test(`should render TextEditor with ${labelValue} as a label`, async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorCustom labelText={labelValue} />);

      const label = getDataElementByValue(page, "label");
      await expect(label).toHaveText(labelValue);
    });
  });

  test(`should render TextEditor with required prop`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom required />);

    await verifyRequiredAsteriskForLabel(page);
  });

  ([
    ["error", 0, VALIDATION.ERROR, "There is an error"],
    ["warning", 5, VALIDATION.WARNING, "There is a warning"],
    ["info", 10, VALIDATION.INFO, "There is an info"],
  ] as const).forEach(([state, times, color, message]) => {
    test(`should show ${state} validation state`, async ({ mount, page }) => {
      await mount(<TextEditorCustomValidation />);

      const textInput = textEditorInput(page);
      await textInput.focus();
      for (let i = 0; i < times; i++) {
        await page.keyboard.press("Delete");
      }

      await getComponent(page, "icon").first().hover();
      await expect(getDataElementByValue(page, "tooltip")).toHaveText(message);

      expect(
        await getStyle(getDataElementByValue(page, state), "color", "before")
      ).toBe(color);

      if (state === "error") {
        const iconColor = await page.evaluate(() => {
          const validationIcon = document.querySelector(
            `[data-element="error"]`
          );
          if (!validationIcon) {
            return null;
          }
          const beforePseudoElement = window.getComputedStyle(
            validationIcon,
            "::before"
          );
          return beforePseudoElement ? beforePseudoElement.color : null;
        });
        expect(iconColor).toBe(color);
      }
      if (state === "warning") {
        const iconColor = await page.evaluate(() => {
          const validationIcon = document.querySelector(
            `[data-element="warning"]`
          );
          if (!validationIcon) {
            return null;
          }
          const beforePseudoElement = window.getComputedStyle(
            validationIcon,
            "::before"
          );
          return beforePseudoElement ? beforePseudoElement.color : null;
        });
        expect(iconColor).toBe(color);
      }
      if (state === "info") {
        const iconColor = await page.evaluate(() => {
          const validationIcon = document.querySelector(
            `[data-element="info"]`
          );
          if (!validationIcon) {
            return null;
          }
          const beforePseudoElement = window.getComputedStyle(
            validationIcon,
            "::before"
          );
          return beforePseudoElement ? beforePseudoElement.color : null;
        });
        expect(iconColor).toBe(color);
      }
    });
  });

  [
    [2, 42],
    [4, 84],
  ].forEach(([rows, px]) => {
    test(`should render TextEditor with set rows prop to ${rows}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorCustom rows={rows} />);

      await expect(textEditorContainer(page)).toHaveCSS(
        "min-height",
        `${px}px`
      );
    });
  });
});

test.describe("Events tests", () => {
  // created an issue FE-5139 to fix this
  test.skip(`should call onChange callback when a type event is triggered`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <TextEditorCustom
        onChange={() => {
          callbackCount += 1;
        }}
      />
    );

    await textEditorInput(page).type("t");

    expect(callbackCount).toBe(1);
  });

  test(`should call onLinkAdded callback when a valid url is detected by TextEditor`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <TextEditorCustom
        onLinkAdded={() => {
          callbackCount += 1;
        }}
      />
    );

    await textEditorInput(page).fill("https://carbon.s");

    expect(callbackCount).toBe(1);
  });
});

test.describe("Styling tests", () => {
  test(`should render with the expected border radius on the toolbar buttons`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);

    await expect(textEditorToolbar(page, "bold")).toHaveCSS(
      "border-radius",
      "4px"
    );
    await expect(textEditorToolbar(page, "italic")).toHaveCSS(
      "border-radius",
      "4px"
    );
    await expect(textEditorToolbar(page, "bullet-list")).toHaveCSS(
      "border-radius",
      "4px"
    );
    await expect(textEditorToolbar(page, "number-list")).toHaveCSS(
      "border-radius",
      "4px"
    );
  });

  test(`should render with the expected styling when focusRedesignOptOut is true`, async ({
    mount,
    page,
  }) => {
    await mount<HooksConfig>(<TextEditorCustom />, {
      hooksConfig: { focusRedesignOptOut: true },
    });

    await textEditorInput(page).focus();
    await expect(textEditorContainer(page).locator("..")).toHaveCSS(
      "outline",
      "rgb(255, 188, 25) solid 3px"
    );

    await textEditorToolbar(page, "bold").focus();
    await checkGoldenOutline(textEditorToolbar(page, "bold"), "2px");

    await textEditorToolbar(page, "italic").focus();
    await checkGoldenOutline(textEditorToolbar(page, "italic"), "2px");

    await textEditorToolbar(page, "bullet-list").focus();
    await checkGoldenOutline(textEditorToolbar(page, "bullet-list"), "2px");

    await textEditorToolbar(page, "number-list").focus();
    await checkGoldenOutline(textEditorToolbar(page, "number-list"), "2px");
  });

  test(`should render with the expected styling when focusRedesignOptOut is false`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);

    const editorParent = textEditorContainer(page).locator("..");
    const toolbarBold = textEditorToolbar(page, "bold");
    const toolbarItalic = textEditorToolbar(page, "italic");
    const toolbarBullet = textEditorToolbar(page, "bullet-list");
    const toolbarNumber = textEditorToolbar(page, "number-list");

    await textEditorInput(page).focus();
    await expect(editorParent).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
    );
    await expect(editorParent).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px"
    );

    await toolbarBold.focus();
    await expect(toolbarBold).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
    );
    await expect(toolbarBold).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px"
    );
    await expect(toolbarBold).toHaveCSS("position", "relative");

    await toolbarItalic.focus();
    await expect(toolbarItalic).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
    );
    await expect(toolbarItalic).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px"
    );
    await expect(toolbarItalic).toHaveCSS("position", "relative");

    await toolbarBullet.focus();
    await expect(toolbarBullet).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
    );
    await expect(toolbarBullet).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px"
    );
    await expect(toolbarBullet).toHaveCSS("position", "relative");

    await toolbarNumber.focus();
    await expect(toolbarNumber).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
    );
    await expect(toolbarNumber).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px"
    );
    await expect(toolbarNumber).toHaveCSS("position", "relative");
  });
});

test.describe("Accessibility tests", () => {
  test(`should pass accessibility tests for default component`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom />);

    await checkAccessibility(page);
  });

  testData.forEach((labelValue) => {
    test(`should pass accessibility tests with ${labelValue} as a label`, async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorCustom labelText={labelValue} />);

      await checkAccessibility(page);
    });
  });

  test(`should pass accessibility tests with required prop`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustom required />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests for validation state`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorCustomValidation />);

    await checkAccessibility(page);
  });

  [2, 4].forEach((rows) => {
    test(`should pass accessibility tests with rows prop sets to ${rows}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextEditorCustom rows={rows} />);

      await checkAccessibility(page);
    });
  });

  test(`should pass accessibility tests with validation when opt in flag is set`, async ({
    mount,
    page,
  }) => {
    await mount(<TextEditorNewValidation />);

    await checkAccessibility(page);
  });
});
