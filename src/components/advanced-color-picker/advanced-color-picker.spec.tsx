import React, { useState } from "react";
import { config } from "react-transition-group";
import { mount, ReactWrapper } from "enzyme";
import { act } from "react-test-renderer";
import AdvancedColorPicker, {
  AdvancedColorPickerProps,
} from "./advanced-color-picker.component";
import Dialog from "../dialog/dialog.component";
import { SimpleColor } from "../simple-color-picker";
import guid from "../../__internal__/utils/helpers/guid";
import {
  testStyledSystemMargin,
  assertStyleMatch,
} from "../../__spec_helper__/test-utils";
import {
  StyledAdvancedColorPickerPreview,
  HiddenColorPickerList,
} from "./advanced-color-picker.style";

const mockedGuid = "mocked-guid";

config.disabled = true;

jest.mock("../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockReturnValue(mockedGuid);

const element = document.createElement("div");
const defaultColor = "#EBAEDE";
const demoColors = [
  { value: "#FFFFFF", label: "white" },
  { value: "transparent", label: "transparent" },
  { value: "#000000", label: "black" },
  { value: "#A3CAF0", label: "blue" },
  { value: "#FD9BA3", label: "pink" },
  { value: "#B4AEEA", label: "purple" },
  { value: "#ECE6AF", label: "goldenrod" },
  { value: "#EBAEDE", label: "orchid" },
  { value: "#EBC7AE", label: "desert" },
  { value: "#AEECEB", label: "turquoise" },
  { value: "#AEECD6", label: "mint" },
];

const requiredProps = {
  name: "advancedPicker",
  availableColors: demoColors,
  defaultColor,
};

const MockComponent = () => {
  const [color, setColor] = useState<string>();

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setColor(e.target.value);
  }

  return (
    <AdvancedColorPicker
      {...requiredProps}
      selectedColor={color}
      onChange={handleOnChange}
      open
    />
  );
};

document.body.appendChild(element);

function render(props: AdvancedColorPickerProps) {
  return mount(<AdvancedColorPicker {...props} />);
}

function renderInDocument(props: AdvancedColorPickerProps) {
  return mount(<AdvancedColorPicker {...props} />, {
    attachTo: element,
  });
}

function getElements(wrapper: ReactWrapper) {
  const dialogCloseButton: HTMLButtonElement = wrapper
    .find(`button[data-element="close"]`)
    .getDOMNode();
  const defaultSimpleColor = wrapper
    .find(`input[value="${defaultColor}"]`)
    .getDOMNode();
  const simpleColors = wrapper.find(SimpleColor).find("input");

  return { dialogCloseButton, defaultSimpleColor, simpleColors };
}

const tabKey = new KeyboardEvent("keydown", { key: "Tab" });
const shiftTabKey = new KeyboardEvent("keydown", {
  key: "Tab",
  shiftKey: true,
});

describe("AdvancedColorPicker", () => {
  testStyledSystemMargin((props) => (
    <AdvancedColorPicker {...requiredProps} {...props} />
  ));

  describe("when focused on color picker cell button", () => {
    const keyDownEvents = [
      ["Enter", true],
      [" ", true],
      ["a", false],
    ];
    let openColorPickerButton: ReactWrapper;
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = render({ ...requiredProps });
      openColorPickerButton = wrapper
        .find('[data-element="open-color-picker-button"]')
        .first();
      openColorPickerButton.getDOMNode<HTMLButtonElement>().focus();
    });

    afterEach(() => {
      wrapper.unmount();
    });

    describe.each(keyDownEvents)(
      "and the %p key is pressed",
      (key, expectedResult) => {
        it(`then dialog's open prop should be set to: ${expectedResult}`, () => {
          act(() => {
            openColorPickerButton.simulate("keydown", { key });
          });
          wrapper.update();
          expect(wrapper.find(Dialog).prop("open")).toBe(expectedResult);
        });
      }
    );
  });

  describe("color description list", () => {
    let wrapper: ReactWrapper;

    it("description is correct when no color is selected", () => {
      wrapper = render({ ...requiredProps });
      expect(
        wrapper
          .find('[data-element="current-color-description"]')
          .first()
          .text()
      ).toBe(`Current color assigned:none`);
      wrapper.unmount();
    });

    it.each([
      [0, "white"],
      [1, "transparent"],
      [2, "black"],
    ])(
      "description is correct when color is selected",
      (colorIndex, colorName) => {
        wrapper = mount(<MockComponent />);
        jest.runAllTimers();
        const color = wrapper.find(SimpleColor).at(colorIndex);

        color.find("input").first().getDOMNode<HTMLInputElement>().click();
        wrapper.update();

        expect(
          wrapper
            .find('[data-element="current-color-description"]')
            .first()
            .text()
        ).toBe(`Current color assigned:${colorName}`);
        wrapper.unmount();
      }
    );

    it("description list is accessibly hidden", () => {
      wrapper = render({ ...requiredProps });

      assertStyleMatch(
        {
          border: "0",
          height: "1px",
          margin: "-1px",
          overflow: "hidden",
          padding: "0",
          position: "absolute",
          width: "1px",
        },
        wrapper.find(HiddenColorPickerList)
      );
    });
  });

  describe("color picker cell", () => {
    it("should have the color prop set to defaultColor", () => {
      const wrapper = render({ ...requiredProps });
      expect(
        wrapper.find('[data-element="color-picker-cell"]').first().prop("color")
      ).toBe(defaultColor);
      wrapper.unmount();
    });

    describe("when the selectedColor is provided", () => {
      it("should have the value of it's color prop the same as selectedColor", () => {
        const selectedColor = "transparent";
        const wrapper = render({ ...requiredProps, selectedColor });
        expect(
          wrapper
            .find('[data-element="color-picker-cell"]')
            .first()
            .prop("color")
        ).toBe(selectedColor);
        wrapper.unmount();
      });
    });
  });

  describe("when the closeButton is clicked", () => {
    const onClose = jest.fn();
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = render({ onClose, open: true, ...requiredProps });
    });

    it("then the onClose callback function should have been called", () => {
      const closeButton = wrapper.find('[data-element="close"]').first();

      act(() => {
        closeButton.simulate("click");
      });

      wrapper.update();

      expect(onClose).toHaveBeenCalled();
    });
  });

  describe("when dialog is open", () => {
    jest.useFakeTimers();
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = renderInDocument({ ...requiredProps, open: true });
      jest.runAllTimers();
    });

    afterEach(() => {
      if (wrapper) {
        wrapper.unmount();
      }
    });

    describe("and shift tab keys are pressed, with close button being focused", () => {
      it("then the focus should be switched to the selected color input", () => {
        const { dialogCloseButton, defaultSimpleColor } = getElements(wrapper);

        dialogCloseButton?.focus();
        expect(document.activeElement).toBe(dialogCloseButton);
        document.dispatchEvent(shiftTabKey);
        expect(document.activeElement).toBe(defaultSimpleColor);
      });
    });

    describe("and tab key is pressed, with selected color input being focused", () => {
      it("then the focus should be switched to the close button", () => {
        const { dialogCloseButton, defaultSimpleColor } = getElements(wrapper);

        expect(document.activeElement).toBe(defaultSimpleColor);
        document.dispatchEvent(tabKey);
        expect(document.activeElement).toBe(dialogCloseButton);
      });
    });
  });

  describe("when one of the color buttons is clicked", () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const extraProps = {
      ...requiredProps,
      open: true,
      onChange,
      onBlur,
    };
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = renderInDocument(extraProps);
      jest.runAllTimers();

      const color = wrapper.find(SimpleColor).at(8);

      color.find("input").first().getDOMNode<HTMLInputElement>().click();
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("then that button should be changed to be the active element", () => {
      expect(document.activeElement?.getAttribute("value")).toBe(
        wrapper.find(SimpleColor).at(8).prop("value")
      );
    });

    it("then the onChange callback should be triggered", () => {
      expect(onChange).toHaveBeenCalled();
    });

    it("then the onBlur callback should be triggered", () => {
      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe("when the component value is controlled, and a color is selected", () => {
    // eslint-disable-next-line react/prop-types
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = mount(<MockComponent />);
      jest.runAllTimers();
      const color = wrapper.find(SimpleColor).at(1);

      color.find("input").first().getDOMNode<HTMLInputElement>().click();
      wrapper.update();
    });

    it("then the color in the preview should match that color", () => {
      expect(wrapper.find(StyledAdvancedColorPickerPreview).prop("color")).toBe(
        wrapper.find(SimpleColor).at(1).prop("value")
      );
    });
  });

  describe("when closeButton is clicked", () => {
    let wrapper: ReactWrapper;
    const onClose = jest.fn();

    beforeEach(() => {
      wrapper = render({
        ...requiredProps,
        onClose,
        open: true,
      });
      jest.runAllTimers();

      const closeButton = wrapper.find('[data-element="close"]').first();

      act(() => {
        closeButton.simulate("click");
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("then the onClose callback should be called", () => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe("when the opening of the component is uncontrolled", () => {
    const keys = [
      ["Enter", false],
      [" ", false],
      ["a", true],
    ];

    describe.each(keys)(
      "and a %p key is pressed while focused on a color button",
      (key, expectedResult) => {
        let wrapper: ReactWrapper;

        const extraProps = {
          ...requiredProps,
        };

        beforeEach(() => {
          wrapper = render(extraProps);
          const openColorPickerButton = wrapper
            .find('[data-element="open-color-picker-button"]')
            .first();
          openColorPickerButton.simulate("click");
        });

        afterEach(() => {
          wrapper.unmount();
        });

        test(`then the isOpen prop in the Dialog should be set to ${expectedResult}`, () => {
          act(() => {
            wrapper
              .find(SimpleColor)
              .at(8)
              .find("input")
              .first()
              .simulate("keydown", { key });
          });

          expect(wrapper.find(Dialog).prop("open")).toBe(expectedResult);
        });
      }
    );
  });

  describe("when the color picker button is clicked", () => {
    const onOpen = jest.fn();
    let wrapper: ReactWrapper;

    beforeEach(() => {
      onOpen.mockClear();
      wrapper = render({
        ...requiredProps,
        onOpen,
      });
      const openColorPickerButton = wrapper
        .find('[data-element="open-color-picker-button"]')
        .first();

      act(() => {
        openColorPickerButton.simulate("click");
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("then the color picker Dialog should be open", () => {
      const dialog = wrapper.find(Dialog).first();

      expect(dialog.prop("open")).toBe(true);
    });

    it("then the onOpen callback should be called", () => {
      expect(onOpen).toHaveBeenCalled();
    });
  });

  describe("when the 'open' prop is specified", () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = render({
        ...requiredProps,
        open: true,
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("then the color picker Dialog should be open", () => {
      const dialog = wrapper.find(Dialog).first();

      expect(dialog.prop("open")).toBe(true);
    });
  });
});
